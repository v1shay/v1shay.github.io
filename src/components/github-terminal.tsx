"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Github, ExternalLink, GitCommit, Book, Zap, Terminal, RefreshCw, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface GitHubData {
  username: string
  name: string
  avatarUrl: string
  bio: string
  followers: number
  repoCount: number
  totalContributions: number
  currentStreak: number
  recentRepos: {
    name: string
    description: string
    stars: number
    forks: number
    language: string
    updatedAt: string
    url: string
  }[]
  contributionCalendar: { count: number; date: string }[][]
}

export function GitHubTerminal() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true)
    else setLoading(true)

    try {
      // Force bypass cache if manual refresh
      const url = isManual ? `/api/github?refresh=true&t=${Date.now()}` : "/api/github"
      const res = await fetch(url)
      
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to fetch")
      }
      
      const json = await res.json()
      setData(json)
      
      // Update cache
      localStorage.setItem("github_data_cache", JSON.stringify({
        data: json,
        timestamp: Date.now()
      }))
      
      setError(null)
    } catch (err) {
      console.error("Fetch error:", err)
      if (!data) setError((err as Error).message)
    } finally {
      setLoading(false)
      // Small delay for smooth transition
      setTimeout(() => setIsRefreshing(false), 600)
    }
  }

  useEffect(() => {
    // 1. Try to load from cache immediately
    const cached = localStorage.getItem("github_data_cache")
    if (cached) {
      try {
        const { data: cachedData, timestamp } = JSON.parse(cached)
        // Only use cache if it's less than 1 hour old
        if (Date.now() - timestamp < 3600000) {
          setData(cachedData)
          setLoading(false)
          // Still fetch in background to keep it fresh
          fetchData(false)
          return
        }
      } catch (e) {
        console.error("Cache parse error", e)
      }
    }

    fetchData()
  }, [])

  const handleSoftReload = () => {
    if (isRefreshing) return
    fetchData(true)
  }

  if (error) {
    return (
      <div className="github-terminal-error liquid-panel p-8 flex flex-col items-center justify-center gap-4 text-center">
        <AlertCircle className="h-10 w-10 text-red-400/80" />
        <div className="space-y-1">
          <h3 className="font-mono text-lg text-white">System Error</h3>
          <p className="text-xs font-mono text-white/50">{error}</p>
        </div>
        <button 
          onClick={() => fetchData(true)}
          className="mt-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-widest text-white/70 hover:bg-white/10 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    )
  }

  return (
    <div className="github-terminal-root group h-full">
      <div className="github-terminal-glass liquid-panel relative overflow-hidden h-full flex flex-col">
        {/* Terminal Header */}
        <div className="terminal-header flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80 shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80 shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80 shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <Terminal className="h-3 w-3" />
            <span>bash — v1shay@github</span>
          </div>
          <button 
            onClick={handleSoftReload}
            disabled={isRefreshing || loading}
            className={cn(
              "p-1.5 rounded-md hover:bg-white/5 transition-all text-white/30 hover:text-white/70",
              isRefreshing && "animate-spin text-emerald-400"
            )}
            title="Soft Reload Dashboard"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>

        <div className="terminal-body p-6 font-mono flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Refreshing Overlay */}
          <AnimatePresence>
            {isRefreshing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 border border-white/10 shadow-2xl">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-bold">Updating System...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="typing-animation">whoami</span>
                  </div>
                  <div className="h-4 w-32 bg-white/5 animate-pulse rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-16 bg-white/5 animate-pulse rounded-lg border border-white/5" />
                  ))}
                </div>
                <div className="h-24 bg-white/5 animate-pulse rounded-lg border border-white/5" />
              </motion.div>
            ) : data && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Intro Line */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white/90">whoami</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur opacity-20" />
                      <img src={data.avatarUrl} alt="Avatar" className="relative h-11 w-11 rounded-full border border-white/10" />
                    </div>
                    <div>
                      <div className="text-xl text-white font-bold tracking-tight">{data.username}</div>
                    </div>
                    <a 
                      href={`https://github.com/${data.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto p-1.5 rounded-full border border-white/5 bg-white/5 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <StatItem label="Repos" value={data.repoCount} color="text-blue-400" />
                  <StatItem label="Commits" value={data.totalContributions} color="text-emerald-400" />
                  <StatItem label="Streak" value={`${data.currentStreak}d`} color="text-amber-400" />
                  <StatItem label="Sync" value={isRefreshing ? "..." : "Live"} color="text-purple-400" />
                </div>

                {/* Contribution Graph */}
                <div className="space-y-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/5" />
                    <span>Contribution Graph</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="bg-white/[0.04] rounded-xl p-4 border border-white/5 shadow-inner overflow-hidden">
                    <motion.div 
                      layout
                      className="contribution-grid flex gap-[3px] justify-center"
                    >
                      {data.contributionCalendar.slice(-25).map((week, wi) => (
                        <motion.div 
                          key={week[0]?.date || `week-${wi}`} 
                          layout
                          className="flex flex-col gap-[3px]"
                        >
                          {week.map((day) => (
                            <motion.div 
                              key={day.date}
                              layout
                              className={cn(
                                "h-[9px] w-[9px] rounded-[1px] transition-all glass-square",
                                day.count === 0 ? "bg-white/[0.05]" :
                                day.count < 3 ? "bg-blue-900/40" :
                                day.count < 7 ? "bg-blue-700/70" :
                                day.count < 12 ? "bg-blue-500" : "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                              )}
                              initial={false}
                              animate={{
                                scale: isRefreshing ? [1, 0.9, 1] : 1
                              }}
                              transition={{
                                duration: 0.3,
                                layout: { duration: 0.5, ease: "easeInOut" }
                              }}
                            />
                          ))}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* Recent Repos */}
                <div className="space-y-2">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 flex items-center gap-2">
                    <div className="h-px flex-1 bg-white/5" />
                    <span>Recent Repositories</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>
                  <div className="space-y-1.5">
                    <AnimatePresence mode="popLayout">
                      {data.recentRepos.map((repo) => (
                        <motion.a 
                          key={repo.name}
                          layout
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-md border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group/repo"
                        >
                          <div className="min-width-0 flex-1">
                            <div className="text-xs text-white/80 font-bold flex items-center gap-2">
                              {repo.name}
                              <span className="text-[9px] font-normal text-white/30 px-1.5 py-0.5 rounded-full border border-white/5">{repo.language}</span>
                            </div>
                            <div className="text-[10px] text-white/60 truncate max-w-[200px] mt-0.5">{repo.description || "No description"}</div>
                          </div>
                          <ExternalLink className="h-3 w-3 text-white/20 group-hover/repo:text-white/60 transition-colors" />
                        </motion.a>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scanning Effect Overlay - CSS-only for better performance */}
        <div className="terminal-scanlines" aria-hidden="true" />
      </div>

      <style jsx>{`
        .typing-animation {
          display: inline-block;
          overflow: hidden;
          border-right: 0.15em solid #10b981;
          white-space: nowrap;
          animation: 
            typing 0.4s steps(6, end),
            blink-caret 0.5s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: #10b981 }
        }

        .github-terminal-root {
          width: 100%;
          max-width: 100%;
          height: 100%;
          will-change: transform;
          transform: translateZ(0);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .glass-square {
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-sizing: border-box;
        }

        .terminal-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.02;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 1px,
            rgba(0, 0, 0, 0.15) 1px,
            rgba(0, 0, 0, 0.15) 2px
          );
        }
      `}</style>
    </div>
  )
}

function StatItem({ label, value, color }: { label: string, value: string | number, color: string }) {
  return (
    <div className="p-3 rounded-lg border border-white/5 bg-white/[0.03] flex flex-col items-center justify-center text-center group/stat hover:bg-white/[0.06] transition-all relative overflow-hidden">
      <div className={cn("absolute top-0 left-0 w-full h-[2px] opacity-20", color.replace("text-", "bg-"))} />
      <AnimatePresence mode="wait">
        <motion.div 
          key={String(value)}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-[13px] font-bold text-white"
        >
          {value}
        </motion.div>
      </AnimatePresence>
      <div className="text-[8px] text-white/50 uppercase tracking-widest mt-1">{label}</div>
    </div>
  )
}
