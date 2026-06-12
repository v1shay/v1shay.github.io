import { NextResponse } from 'next/server';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'v1shay';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type ContributionWeek = {
  contributionDays: ContributionDay[];
};

type RepositoryNode = {
  name: string;
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  languages: {
    nodes: { name: string }[];
  };
  updatedAt: string;
  url: string;
};

async function fetchGitHubData() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        name
        login
        avatarUrl
        bio
        followers {
          totalCount
        }
        repositories(first: 20, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            description
            stargazerCount
            forkCount
            languages(first: 3, orderBy: {field: SIZE, direction: DESC}) {
              nodes {
                name
              }
            }
            updatedAt
            url
          }
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    next: { revalidate: 3600 } // Cache for 1 hour
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch GitHub data: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }
  return data.data.user;
}

async function fetchReadme(repoName: string) {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.raw',
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch README for ${repoName}: ${response.status}`);
  }

  return await response.text();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo');

  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is not configured' }, { status: 500 });
    }

    if (repo) {
      const readme = await fetchReadme(repo);
      return NextResponse.json({ readme });
    }

    const user = await fetchGitHubData();
    
    // Calculate streak
    const calendar = user.contributionsCollection.contributionCalendar;
    const allDays = calendar.weeks
      .flatMap((week: ContributionWeek) => week.contributionDays)
      .sort((a: ContributionDay, b: ContributionDay) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        currentStreak++;
      } else {
        if (day.date === today) continue;
        break;
      }
    }

    return NextResponse.json({
      username: user.login,
      name: user.name,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      followers: user.followers.totalCount,
      repoCount: user.repositories.totalCount,
      totalContributions: calendar.totalContributions,
      currentStreak,
      recentRepos: user.repositories.nodes.slice(0, 6).map((repo: RepositoryNode) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.languages.nodes[0]?.name || 'N/A',
        updatedAt: repo.updatedAt,
        url: repo.url
      })),
      contributionCalendar: calendar.weeks.map((week: ContributionWeek) => week.contributionDays.map((day: ContributionDay) => ({
        count: day.contributionCount,
        date: day.date
      })))
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
