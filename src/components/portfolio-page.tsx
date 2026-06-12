"use client"

import Image, { type StaticImageData } from "next/image"

// ── Hero ──────────────────────────────────────────────────────────────────────
import heroImage from "../../images/hero.jpeg"
import githubProgramLogo from "../../images/GitHub_Invertocat_Black_Clearspace.png"

// ── Research / ML projects ────────────────────────────────────────────────────
import neurosense from "../../images/neuro.png"                          // NeuroSense confusion-matrix paper figure
import phytovisionImage from "../../images/tomato.png"                   // Phyto-Vision tomato leaf CNN
import sentinelImage from "../../images/image copy 33.png"   // Sentinel-LLM hallucination leaderboard chart
import softwareintern from "../../images/substack.png"                   // Substack graph crawler / Chapman internship
// ── Institution backgrounds ──────────────────────────────────────────────────
import chapmanBg from "../../images/chapman.jpg"                         // Chapman University campus background
import berkeleyBg from "../../images/berkeley.jpg"                       // UC Berkeley / LBNL campus background
import ucscBg from "../../images/ucsc.jpg"                               // UCSC campus background
import berkeleyPanel from "../../images/berkeley-a.png"                  // Berkeley watershed map (inner panel)
import ucscPanel from "../../images/ucsc-a.png"                          // UCSC AIEA Lab screenshot (inner panel)
// ── Basketball ────────────────────────────────────────────────────────────────
import vishayDribbling from "../../images/athletes.jpeg"                 // Vishay dribbling in Lynbrook jersey mid-game
import lynbrookTeamPhoto from "../../images/basketballteam.jpeg"         // Lynbrook freshman basketball team group photo
import sportsPhoto from "../../images/IMG_6976.jpeg"
import athletes from "../../images/image copy 15.png"
import cs from "../../images/image copy 14.png"
import nova from "../../images/image copy 16.png"
import githubLogo from "../../images/image copy 30.png"
import gmailLogo from "../../images/image copy 31.png"
import resumeLogo from "../../images/image copy 24.png"
import basketballLogo from "../../images/image copy 22.png"
import hackathonLogo from "../../images/image copy 28.png"
import projectLogo from "../../images/image copy 20.png"
import contactImage from "../../images/contact.jpeg"
import spotify from "../../images/other_projects/spotify.png"
import obsidian from "../../images/other_projects/obsidian.png"
import githubDevProgramImage from "../../images/other_projects/image copy 2.png"
import fblaImage from "../../images/other_projects/IMG_8059.jpeg"
import fblaScreenshot from "../../images/other_projects/fbla_new.png"
import trilingualImage from "../../images/other_projects/image copy 3.png"

// ── TaeKwonDo ─────────────────────────────────────────────────────────────────
import tkdBlockBreaking from "../../images/tkd.png"                      // Vishay breaking concrete blocks at belt test
import tkdDojanGroupPhoto from "../../images/tkd2.jpeg"                  // Full TKD dojang black-belt ceremony group photo
import tkdKickIcon from "../../images/image copy 10.png"                 // Taekwondo kick silhouette icon
import worldTaekwondoLogo from "../../images/image copy 11.png"          // World Taekwondo federation logo

// ── NovaSTEM ──────────────────────────────────────────────────────────────────
import novaStemOutdoorDemo from "../../images/novastem1.jpeg"            // Vishay doing STEM experiment demo for kids outdoors
import novaStemBalloonScience from "../../images/novastem2.jpeg"         // Vishay teaching balloon science at Good Samaritan

// ── Uplift Art Foundation ─────────────────────────────────────────────────────
import upliftCardsSpread from "../../images/art.jpeg"                    // Spread of get-well cards made for pediatric patients
import upliftCardsDisplay from "../../images/art2.jpeg"                  // Cards displayed upright on a table before delivery

// ── School / partner logos (CS4All outreach schools) ─────────────────────────
import sundayFriendsLogo from "../../images/image copy.png"              // Sunday Friends nonprofit logo
import harkerLogo from "../../images/image copy 2.png"                   // The Harker School eagle logo
import monteVistaLogo from "../../images/image copy 3.png"               // Monte Vista bear mascot logo
import vikingMascotLogo from "../../images/image copy 4.png"             // Viking mascot logo (school outreach)
import dilworthDragonsLogo from "../../images/image copy 5.png"          // Dilworth Dragons elementary logo
import millerMustangsLogo from "../../images/image copy 6.png"           // Miller Middle School Mustangs logo
import upliftHawkLogo from "../../images/image copy 7.png"               // Uplift Art Foundation hawk logo
import deVargasStemLogo from "../../images/image copy 8.png"             // De Vargas STEM school logo
import goodSamaritanPenguinLogo from "../../images/image copy 9.png"     // Good Samaritan Preschool penguin logo
import goodSamaritanLogo from "../../images/image.png"                   // Good Samaritan Preschool text logo

// ── Other Projects visuals ───────────────────────────────────────────────────
import mlLabsIcon from "../../images/other_projects/ml-labs-icon.png"
import archLlmScreenshot from "../../images/other_projects/image.png"
import sentinelLlmChart from "../../images/other_projects/image copy.png"
import voxAgentScreenshot from "../../images/other_projects/PNG image.png"
import { useEffect, useRef, useState, type CSSProperties } from "react"
import {
  motion,
  useInView,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react"
import {
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Menu,
  Sparkles,
  X,
  Loader2,
} from "lucide-react"


import { cn } from "@/lib/utils"
import { GitHubTerminal } from "./github-terminal"
import { useShaderPalette } from "./shader-background"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "research", label: "Research & Projects" },
  { id: "experience", label: "Clubs & Non-profit Work" },
  { id: "projects-grid", label: "Other Projects" },
  { id: "for-fun", label: "For Fun" },
  { id: "contact", label: "Contact" },
] as const

type ProjectAction = {
  label: string
  href?: string
  kind?: "github" | "publication" | "website"
  disabled?: boolean
}

type ResearchProject = {
  id: string
  title: string
  subtitle: string
  hook: string
  metrics: { stat: string; label: string }[]
  image: StaticImageData
  logoLabel: string
  accent: string
  actions: ProjectAction[]
}

type InstitutionCard = {
  id: string
  institution: string
  title: string
  description: string
  bgImage: StaticImageData
  panelImage: StaticImageData
  actions: ProjectAction[]
}

type GridProject = {
  title: string
  badge?: string
  hook: React.ReactNode
  metrics: { stat: string; label: string }[]
  href: string
  linkLabel: string
  image?: StaticImageData | null
  gif?: string | null
}

type PillarSlide = {
  title: string
  copy: string
  images: StaticImageData[]
  logos?: { src: StaticImageData; alt: string }[]
  titleMedia?: { src: StaticImageData; alt: string }
  imageClassName?: string
  actions?: ProjectAction[]
}

const institutionCards: readonly InstitutionCard[] = [
  {
    id: "chapman-research",
    institution: "",
    title: "Research Intern",
    description: "Mathematical Foundations of Computer Science Lab at Chapman University",
    bgImage: chapmanBg,
    panelImage: softwareintern,
    actions: [{ label: "GitHub", href: "https://github.com/v1shay/substack", kind: "github" }],
  },
  {
    id: "ucsc-research",
    institution: " ",
    title: "Engineering Intern",
    description: "AIEA Lab at UC Santa Cruz",
    bgImage: ucscBg,
    panelImage: ucscPanel,
    actions: [{ label: "GitHub", href: "https://github.com/v1shay/phyto-vision", kind: "github" }],
  },
  {
    id: "berkeley-research",
    institution: "",
    title: "Machine Learning Intern",
    description: "Lawrence Berkeley National Laboratory at UC Berkeley",
    bgImage: berkeleyBg,
    panelImage: berkeleyPanel,
    actions: [{ label: "GitHub", href: "https://github.com/v1shay", kind: "github" }],
  },

] as const


const portfolioProjects = [
  {
    title: "Echo-OS",
    badge: "1st @ ElevenLabs 2026",
    hook: (
      <>
        Voice-first accessibility agent built with <strong>STT/TTS pipelines</strong>,
        <strong> RAG memory</strong>, and <strong>computer-control tooling</strong> for
        blind users
      </>
    ),
    href: "https://github.com/v1shay/echo-OS",
    linkLabel: "GitHub",
    image: sentinelImage,
    gif: null as string | null,
  },
  {
    title: "Neuro-Sense",
    badge: "Published & Indexed",
    hook: (
      <>
        Parkinson&apos;s <strong>speech-screening model</strong> achieving <strong>91% accuracy</strong>, with publication indexing across <strong>Google Scholar</strong>, <strong>OIPub</strong>, and <strong>ResearchGate</strong>
      </>
    ),
    href: "https://github.com/v1shay/neuro-sense",
    linkLabel: "GitHub",
    image: neurosense,
    gif: null as string | null,
  },
  {
    title: "Phyto-Vision",
    badge: "Presented @ UCSC",
    hook: (
      <>
        Neural network for plant disease trained on <strong>395K+ images</strong> with
        <strong> 95%+ accuracy</strong>, presented to the Loik Labaratory for greenhouse use
      </>
    ),
    href: "https://github.com/v1shay/phyto-vision",
    linkLabel: "GitHub",
    image: phytovisionImage,
    gif: null as string | null,
  },
  {
    title: "ML-Labs",
    badge: "Finalist @ LUMA Hacks",
    hook: (
      <>
        Autonomous research lab powered by <strong>19 specialized agents</strong>, working across
        <strong> 8 lifecycle stages</strong>; Top 1% / 400 teams 
      </>
    ),
    href: "https://github.com/v1shay/ml-labs",
    linkLabel: "GitHub",
    image: null as StaticImageData | null,
    gif: "/images/other_projects/mllabs.gif",
  },
  {
    title: "ArchLLM",
    badge: "GPU Architectures",
    hook: (
      <>
        <strong>C++</strong> memory simulator for long-context AI systems, modeling
        <strong>GPU memory pressure</strong> with <strong>+95% adherence</strong>, and <strong>-30% HBM pressure</strong>
      </>
    ),
    href: "https://github.com/v1shay/archLLM-sim",
    linkLabel: "GitHub",
    image: archLlmScreenshot,
    gif: null as string | null,
  },
  {
    title: "Vox",
    badge: "Turn any microphone into an Agent",
    hook: (
      <>
        Bluetooth-integrated AI note-taking stack using <strong>real-time audio</strong>,
        <strong> Whisper transcription</strong>, and <strong>&lt;50ms latency </strong>
         for ambient capture.
      </>
    ),
    href: "https://github.com/v1shay/vox-agent",
    linkLabel: "GitHub",
    image: voxAgentScreenshot,
    gif: null as string | null,
  },
  {
    title: "Sift",
    badge: "GitHub vectorized into a 3D Universe",
    hook: (
      <>
        GitHub intelligence engine leveraging <strong>linear algebra</strong> and <strong>Three.js </strong>
         to map repositories into a spatial interface
      </>
    ),
    href: "https://sift-opensource.vercel.app",
    linkLabel: "GitHub",
    image: null as StaticImageData | null,
    gif: "/images/sift-demo.gif",
  },
  {
    title: "Sentinel-LLM",
    badge: "Model Eval",
    hook: (
      <>
        Hallucination-detection benchmark pipeline with <strong>TF-IDF features</strong>,
        <strong> logistic regression</strong>, and evaluations against
        <strong> top AI models</strong>
      </>
    ),
    href: "https://github.com/v1shay/sentinel-LLM",
    linkLabel: "GitHub",
    image: sentinelLlmChart,
    gif: null as string | null,
  },
  {
    title: "Neural-Lens",
    badge: "Chrome extension",
    hook: (
      <>
        Chrome MV3 analysis layer using <strong>edge execution</strong>,
        <strong> JavaScript</strong>, and <strong>&lt;500ms latency</strong> for in-browser
        data reasoning
      </>
    ),
    href: "https://github.com/v1shay/neural-lens",
    linkLabel: "GitHub",
    image: null as StaticImageData | null,
    gif: "/images/other_projects/Adobe Express - neurallens (1).gif",
  },
  {
    title: "AlgoType",
    badge: "USACO/LeetCode Practice",
    hook: (
      <>
        Competitive-programming trainer with <strong>USACO/LeetCode prompts</strong>,
        <strong> custom syntax</strong>, and <strong>global leaderboards</strong>
      </>
    ),
    href: "https://algo-type.vercel.app",
    linkLabel: "GitHub",
    image: null as string | null,
    gif: "/images/other_projects/algotype.gif",
  },
  {
    title: "Freelance Development",
    badge: "Production Work",
    hook: (
      <>
        Local-business storefront work across <strong>Next.js</strong>,
        driving
        <strong> 100%+ increased traffic</strong>
      </>
    ),
    href: "https://taquizas-chapala.vercel.app",
    linkLabel: "Website",
    image: null as StaticImageData | null,
    gif: "/images/other_projects/Convert to GIF project.gif",
  },
] as const



const forFunProjects = [
  {
    title: "fbla",
    hook: "competed in Network Design events at the Future Business Leaders of America State Conference in Anaheim",
    metrics: [],
    href: "",
    linkLabel: "Fun",
    image: fblaScreenshot,
    isFeatured: true,
  },
  {
    title: "github dev program",
    hook: "accepted into the GitHub Developer Program for building GitHub Apps and integrations (like this one!) with early access to new features/betas",
    metrics: [],
    href: "",
    linkLabel: "Fun",
    image: githubDevProgramImage,
    isFeatured: true,
  },
  {
    title: "mentor - TKD",
    hook: "earned 1st-degree black belt under World TKD Federation; mentored junior students in technique and sparring",
    metrics: [],
    href: "",
    linkLabel: "Martial Arts",
    image: tkdDojanGroupPhoto,
    isFeatured: true,
  },
  {
    title: "coach - Athletes4Others",
    hook: "basketball coach to students at local elementary schools in the Bay",
    metrics: [],
    href: "",
    linkLabel: "Outreach",
    image: lynbrookTeamPhoto,
    isFeatured: true,
  },
  {
    title: "second brain",
    hook: "lately, i've been really interested in using vault systems like Obsidian to create persistent context layers for my AI agents!",
    metrics: [],
    href: "",
    linkLabel: "Fun",
    image: obsidian,
    isFeatured: false,
  },
  {
    title: "sports",
    hook: "played for the LHS Boys Basketball Team, .750 win percentage across 24 games",
    metrics: [],
    href: "https://www.lynbrookvikings.com/player/vishay-agarwal/",
    linkLabel: "Athletics",
    image: sportsPhoto,
    isFeatured: false,
  },
  {
    title: "music",
    hook: "i love listening to music and making playlists on Spotify, i currently have 4 playlists up with 90+ likes!",
    metrics: [],
    href: "https://open.spotify.com/user/31rmdnittbsvohipqn7zdcjbj6ri",
    linkLabel: "Fun",
    image: spotify,
    isFeatured: false,
  },
  {
    title: "trilingual",
    hook: "fluent in English and Hindi, conversational in Spanish!",
    metrics: [],
    href: "",
    linkLabel: "Fun",
    isFeatured: true,
    languages: ["English", "Hindi", "Spanish"],
  },
] as const

const contactButtons = [
  {
    label: "NOVASTEM",
    image: nova,
    href: "https://novastem.vercel.app",
  },
  {
    label: "UPLIFT ART FOUNDATION",
    image: projectLogo,
    href: "https://uplift-art.vercel.app",
  },
  {
    label: "BASKETBALL",
    image: basketballLogo,
    href: "https://www.lynbrookvikings.com/player/vishay-agarwal/",
  },
  {
    label: "RESUME",
    image: resumeLogo,
    href: "https://docs.google.com/document/d/17_go6arOIviQ2X_M8XTwY88k7OC9EA-g/edit",
  },
  {
    label: "GITHUB",
    image: githubLogo,
    href: "https://github.com/v1shay",
  },
  {
    label: "HACKATHON PORTFOLIO",
    image: hackathonLogo,
    href: "https://devpost.com/v1shay/challenges",
  },
  {
    label: "EMAIL",
    image: gmailLogo,
    href: "mailto:v.agrwl17@gmail.com",
  },
] as const

function toExternalHref(href: string) {
  return /^https?:\/\//i.test(href) ? href : `https://${href.replace(/^\/+/, "")}`
}

const heroPortraitShellMobileStyle: CSSProperties = {
  width: "min(68vw, 20rem)",
  minWidth: "unset",
  maxWidth: "20rem",
  marginInline: "auto",
}

const heroPortraitMaskMobileStyle: CSSProperties = {
  height: "min(40vh, 22rem)",
  maxHeight: "22rem",
}

const heroTitleLines = ["Vishay", "Agarwal"] as const

function useActiveSection(sectionIds: readonly string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.55, 0.75],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-12% 0px -10% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionShell({
  id,
  eyebrow,
  title,
  copy,
  noSnap,
  children,
}: {
  id: string
  eyebrow?: string
  title?: string
  copy?: string
  noSnap?: boolean
  children: React.ReactNode
}) {
  const hasHeading = Boolean(eyebrow || title || copy)

  return (
    <section id={id} className={cn("section-anchor w-full", !noSnap && "snap-section", (id === "projects-grid" || id === "for-fun") ? "px-0" : "px-6 sm:px-10 lg:px-16")}>
      <Reveal className={cn("section-shell", (id === "projects-grid" || id === "for-fun") && "w-full")}>
        {hasHeading ? (
          <div className={cn("section-heading", id === "projects-grid" ? "max-w-none w-full" : "max-w-3xl")}>
            {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="font-display-serif section-title">{title}</h2> : null}
            {copy ? <p className="section-copy">{copy}</p> : null}
          </div>
        ) : null}
        {children}
      </Reveal>
    </section>
  )
}

function GitHubBanner({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) {
  const bannerVariants: Variants = {
    initial: { opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1],
        delay: 0
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bannerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="github-banner-wrap"
        >
          <motion.div
            drag="y"
            dragConstraints={{ top: -100, bottom: 0 }}
            dragElastic={{ top: 0.4, bottom: 0.1 }}
            onDragEnd={(event, info) => {
              if (info.offset.y < -10 || info.velocity.y < -40) {
                onClose();
              }
            }}
            whileDrag={{ scale: 0.98, cursor: "grabbing" }}
            className="liquid-panel github-banner github-banner-notification pointer-events-auto"
          >
            <div className="github-banner-content">
              <div className="github-banner-left">
                <div className="github-banner-icon github-banner-icon-glow">
                  <Image
                    src={githubProgramLogo}
                    alt="GitHub"
                    width={14}
                    height={14}
                    className="github-banner-logo invert brightness-200"
                  />
                </div>
                <p className="github-banner-text">
                  This website has integration with GitHub as part of the GitHub Developer Program
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors pointer-events-auto flex items-center justify-center"
                  aria-label="Dismiss banner"
                >
                  <X className="h-3.5 w-3.5 text-white/50 hover:text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StickyNavbar() {
  const activeSection = useActiveSection(navItems.map((item) => item.id))
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24)
  })

  useEffect(() => {
    const close = () => setMobileOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -28, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="nav-root"
    >
      <div className={cn("nav-shell", scrolled && "nav-shell-scrolled")}>
        <a href="#hero" className="nav-brand">
          <span className="nav-brand-dot" />
          Vishay Agarwal
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <GitHubBanner
        isVisible={activeSection === "hero" && !scrolled && !bannerDismissed}
        onClose={() => setBannerDismissed(true)}
      />

      <motion.div
        initial={false}
        animate={mobileOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1, marginTop: 12 },
          closed: { height: 0, opacity: 0, marginTop: 0 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="nav-mobile-wrap"
      >
        <div className="liquid-panel nav-mobile-panel">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.header>
  )
}

function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const portraitY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 62]), {
    stiffness: 120,
    damping: 24,
    mass: 0.55,
  })
  const portraitRotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  const copyY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -18]), {
    stiffness: 140,
    damping: 28,
    mass: 0.5,
  })
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.96, 0.84])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section snap-section"
    >
      <div className="hero-ambient-stage" aria-hidden="true">
        <motion.div
          className="hero-ambient-ribbon hero-ambient-ribbon-one"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 26, -20, 0], y: [0, -22, 12, 0], rotate: [0, 4, -3, 0] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-ambient-ribbon hero-ambient-ribbon-two"
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -20, 18, 0], y: [0, 16, -12, 0], rotate: [0, -5, 3, 0] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="hero-inner">
        <div className="hero-grid">
          <motion.div
            className="hero-copy-column"
            style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <h1 className="hero-title mt-6" aria-label="Vishay Agarwal">
              {heroTitleLines.map((line, index) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 54, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.82, delay: 0.12 + index * 0.11, ease: [0.18, 1, 0.3, 1] }}
                  className={cn("hero-title-line", index === 1 && "hero-title-line-accent")}
                >
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.76, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hero-subtext"
            >


              Hi, I&apos;m Vishay, freshman at Lynbrook High whos obsessed with all things systems. Whether it&apos;s ML pipelines, LEGOs, basketball, or just NBA2K, I see a system in everything. I&apos;m passionate about turning research ideas into real-world solutions!
            </motion.p>
            <div className="hero-actions">
              <motion.a
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.62, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                href="#research"
                className="hero-cta-primary"
              >
                Explore research
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 22, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.62, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                href="#research"
                className="hero-cta-secondary"
              >
                View projects
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -90, scale: 0.93, rotateX: 14 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.92, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            style={reduceMotion ? undefined : { y: portraitY, rotateZ: portraitRotate }}
            className="hero-portrait-wrap"
          >
            <motion.div
              className="hero-portrait-orb hero-portrait-orb-one"
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 1.08, 0.98, 1], x: [0, 10, -6, 0], y: [0, -12, 8, 0] }
              }
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="hero-portrait-orb hero-portrait-orb-two"
              aria-hidden="true"
              animate={
                reduceMotion
                  ? undefined
                  : { scale: [1, 0.94, 1.05, 1], x: [0, -8, 4, 0], y: [0, 10, -8, 0] }
              }
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="hero-portrait-shell">
              <motion.div
                className="hero-portrait-mask"
                animate={reduceMotion ? undefined : { y: [0, -8, 0, 6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={heroImage}
                  alt="Portrait placeholder for Vishay Agarwal"
                  priority
                  className="hero-image"
                />
                <div className="hero-image-wash" aria-hidden="true" />
                <div className="hero-image-sheen" aria-hidden="true" />
              </motion.div>
            </div>
            <style jsx>{`
              @media (max-width: 767px) {
                .hero-portrait-shell {
                  width: ${heroPortraitShellMobileStyle.width};
                  min-width: ${heroPortraitShellMobileStyle.minWidth};
                  max-width: ${heroPortraitShellMobileStyle.maxWidth};
                  margin-inline: ${heroPortraitShellMobileStyle.marginInline};
                }

                .hero-portrait-mask {
                  height: ${heroPortraitMaskMobileStyle.height};
                  max-height: ${heroPortraitMaskMobileStyle.maxHeight};
                }
              }
            `}</style>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ReadmeViewer({ repoUrl }: { repoUrl: string }) {
  const [readme, setReadme] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const repoName = repoUrl.split("/").pop()
        if (!repoName) throw new Error("Invalid repo URL")

        const res = await fetch(`/api/github?repo=${repoName}`)
        if (!res.ok) throw new Error("Failed to fetch")

        const data = await res.json()
        setReadme(data.readme)
      } catch (err) {
        setError("Could not load README")
      } finally {
        setLoading(false)
      }
    }
    fetchReadme()
  }, [repoUrl])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-white/40">Fetching Source...</p>
      </div>
    )
  }

  if (error || !readme) {
    return (
      <div className="py-20 text-center opacity-40">
        <p className="text-sm font-mono">{error || "No README found"}</p>
      </div>
    )
  }

  const renderContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];

    const repoName = repoUrl.split("/").pop() || "";

    const getAbsoluteImageUrl = (url: string) => {
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
      }
      const cleanPath = url.replace(/^\.?\//, '');
      try {
        const parts = repoUrl.replace('https://github.com/', '').split('/');
        const owner = parts[0] || 'v1shay';
        const repo = parts[1] || repoName;
        return `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/${cleanPath}`;
      } catch (e) {
        return `https://raw.githubusercontent.com/v1shay/${repoName}/HEAD/${cleanPath}`;
      }
    };

    const formatText = (t: string) => {
      // Strip common HTML tags
      const clean = t.replace(/<[^>]*>?/gm, '');

      // Basic formatting: **bold**, *italic*, [link](url), `code`
      const parts = clean.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\)|`.*?`)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
          return <em key={index} className="text-white/90 italic">{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index} className="bg-white/10 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs shadow-sm">{part.slice(1, -1)}</code>;
        }
        if (part.startsWith('[') && part.includes('](')) {
          const match = part.match(/\[(.*?)\]\((.*?)\)/);
          if (match) {
            return <a key={index} href={match[2]} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline decoration-emerald-400/30 underline-offset-4 font-semibold">{match[1]}</a>;
          }
        }
        return part;
      });
    };

    lines.forEach((line, i) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="bg-black/35 p-5 rounded-xl my-6 overflow-x-auto border border-white/10 font-mono text-xs leading-relaxed text-emerald-400/90 shadow-2xl">
              <code>{codeContent.join('\n')}</code>
            </pre>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      // Check for Markdown Images
      const mdImageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (mdImageMatch) {
        const alt = mdImageMatch[1];
        const src = getAbsoluteImageUrl(mdImageMatch[2]);
        elements.push(
          <div key={`img-${i}`} className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 max-w-full relative flex items-center justify-center shadow-lg p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || "Repository visual"}
              className="rounded-xl max-h-[350px] w-auto h-auto object-contain"
            />
          </div>
        );
        return;
      }

      // Check for HTML Images
      const htmlImageMatch = line.match(/<img\s+[^>]*src=["'](.*?)["']/i);
      if (htmlImageMatch) {
        const src = getAbsoluteImageUrl(htmlImageMatch[1]);
        const altMatch = line.match(/alt=["'](.*?)["']/i);
        const alt = altMatch ? altMatch[1] : "Repository visual";
        elements.push(
          <div key={`img-${i}`} className="my-6 rounded-2xl overflow-hidden border border-white/10 bg-white/5 max-w-full relative flex items-center justify-center shadow-lg p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="rounded-xl max-h-[350px] w-auto h-auto object-contain"
            />
          </div>
        );
        return;
      }

      const trimLine = line.trim();

      // Check for Horizontal Rules
      if (trimLine === '---' || trimLine === '***') {
        elements.push(<hr key={i} className="my-8 border-t border-white/10" />);
        return;
      }

      // Check for Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="pl-4 border-l-4 border-emerald-500/50 my-6 italic text-white/60 bg-emerald-500/5 py-3 px-5 rounded-r-2xl text-[0.95rem]">
            {formatText(line.slice(2))}
          </blockquote>
        );
        return;
      }

      // Check for Task Lists
      if (line.startsWith('- [ ] ') || line.startsWith('- [x] ') || line.startsWith('* [ ] ') || line.startsWith('* [x] ')) {
        const checked = line.includes('[x]');
        const content = line.slice(6);
        elements.push(
          <div key={i} className="flex items-center gap-3 my-2 ml-6">
            <span className={cn(
              "w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-all",
              checked ? "bg-emerald-500 border-emerald-400 text-black font-extrabold" : "border-white/20 bg-white/5"
            )}>
              {checked ? "✓" : ""}
            </span>
            <span className={cn("text-sm font-medium", checked ? "text-white/40 line-through" : "text-white/80")}>
              {formatText(content)}
            </span>
          </div>
        );
        return;
      }

      // Check for Table Rows
      if (line.startsWith('|')) {
        if (line.includes('---')) return;
        const cells = line.split('|').slice(1, -1).map(c => c.trim());
        elements.push(
          <div key={i} className="flex gap-4 border-b border-white/10 py-3.5 px-6 bg-white/5 font-mono text-xs text-white/80 rounded-lg hover:bg-white/10 transition-all my-2">
            {cells.map((cell, idx) => (
              <div key={idx} className="flex-1 min-w-0 break-words">{formatText(cell)}</div>
            ))}
          </div>
        );
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={i} className="text-3xl font-extrabold mt-12 mb-6 text-white font-display-serif tracking-tight border-b border-white/10 pb-4 flex items-center gap-2">
            <span className="text-emerald-400 font-mono">#</span> {formatText(line.slice(2))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white/90 border-b border-white/5 pb-2 tracking-tight flex items-center gap-2">
            <span className="text-emerald-500/60 font-mono">##</span> {formatText(line.slice(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold mt-8 mb-3 text-white/80 tracking-tight flex items-center gap-2">
            <span className="text-emerald-500/40 font-mono">###</span> {formatText(line.slice(4))}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} className="ml-6 mb-3 text-white/70 list-disc marker:text-emerald-400/60 pl-2 text-[0.95rem] leading-relaxed">
            {formatText(line.slice(2))}
          </li>
        );
      } else if (/^\d+\. /.test(line)) {
        elements.push(
          <li key={i} className="ml-6 mb-3 text-white/70 list-decimal marker:text-emerald-400/60 pl-2 text-[0.95rem] leading-relaxed">
            {formatText(line.replace(/^\d+\. /, ''))}
          </li>
        );
      } else if (trimLine === '') {
        elements.push(<div key={i} className="h-4" />);
      } else {
        elements.push(
          <p key={i} className="mb-5 text-white/70 leading-relaxed text-[0.95rem] font-sans">
            {formatText(line)}
          </p>
        );
      }
    });

    return elements;
  }

  return (
    <div className="readme-content font-sans overflow-y-auto max-h-[70vh] pr-6 custom-scrollbar pb-10">
      <div className="flex items-center gap-3 mb-10 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 w-fit">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-emerald-400/80 font-mono font-black">Live Repository Sync</span>
      </div>
      <div className="prose-like-styles">
        {renderContent(readme)}
      </div>
    </div>
  )
}


function InstitutionCardDetail({ card, onClose }: { card: InstitutionCard; onClose: () => void }) {
  const githubAction = card.actions.find(a => a.kind === "github")

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div className="research-modal-strictly-readme">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 space-y-6">
          <div className="research-modal-topline">
            <span className="research-card-tag">{card.institution}</span>
          </div>
          <h3 className="research-modal-title text-4xl">{card.title}</h3>
          <p className="research-modal-description text-lg opacity-80">{card.description}</p>

          <div className="research-card-actions !justify-start !mt-10">
            {card.actions.map((action) => (
              <a
                key={action.label}
                href={action.href ? toExternalHref(action.href) : "#"}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "research-card-action !px-6 !py-3 !text-sm",
                  action.disabled && "research-card-action-disabled"
                )}
              >
                {action.label}
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-10">
          {githubAction?.href ? (
            <ReadmeViewer repoUrl={githubAction.href} />
          ) : (
            <div className="py-20 text-center opacity-40">
              <p className="text-sm font-mono">No GitHub repository linked for this project.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ResearchShowcase() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const activeCard = institutionCards.find((c) => c.id === activeCardId) ?? null

  const handleClose = () => setActiveCardId(null)

  return (
    <>
      <SectionShell id="research">
        <div className="inst-grid-shell">
          {/* Top row: Berkeley spanning the full width */}
          <div className="inst-grid-top">
            {institutionCards.slice(2).map((card, index) => (
              <Reveal key={card.id} delay={0.1 + index * 0.1} className="inst-card-slot inst-card-slot--wide">
                <motion.div
                  role="button"
                  tabIndex={0}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="inst-card inst-card--featured"
                  onClick={() => setActiveCardId(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveCardId(card.id)
                    }
                  }}
                >
                  {/* Background campus image */}
                  <div className="inst-card-bg-wrap">
                    <Image
                      src={card.bgImage}
                      alt={`${card.institution} campus`}
                      className="inst-card-bg-img"
                      fill
                    />
                    <div className="inst-card-bg-overlay" aria-hidden="true" />
                  </div>

                  {/* Floating inner panel image */}
                  <div className="inst-card-panel">
                    <Image
                      src={card.panelImage}
                      alt={`${card.title} preview`}
                      className="inst-card-panel-img"
                    />
                  </div>

                  {/* Text content */}
                  <div className="inst-card-content">
                    <p className="inst-card-institution">{card.institution}</p>
                    <h3 className="inst-card-title">{card.title}</h3>
                    <p className="inst-card-description">{card.description}</p>
                    <button
                      type="button"
                      className="inst-card-detail-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCardId(card.id)
                      }}
                    >
                      DETAIL
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Bottom row: Chapman + UCSC at equal widths */}
          <div className="inst-grid-bottom">
            {institutionCards.slice(0, 2).map((card, index) => (
              <Reveal key={card.id} delay={0.3 + index * 0.1} className="inst-card-slot">
                <motion.div
                  role="button"
                  tabIndex={0}
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="inst-card"
                  onClick={() => setActiveCardId(card.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveCardId(card.id)
                    }
                  }}
                >
                  <div className="inst-card-bg-wrap">
                    <Image
                      src={card.bgImage}
                      alt={`${card.institution} campus`}
                      className="inst-card-bg-img"
                      fill
                    />
                    <div className="inst-card-bg-overlay" aria-hidden="true" />
                  </div>

                  <div className="inst-card-panel">
                    <Image
                      src={card.panelImage}
                      alt={`${card.title} preview`}
                      className="inst-card-panel-img"
                    />
                  </div>

                  <div className="inst-card-content">
                    <p className="inst-card-institution">{card.institution}</p>
                    <h3 className="inst-card-title">{card.title}</h3>
                    <p className="inst-card-description">{card.description}</p>
                    <button
                      type="button"
                      className="inst-card-detail-link"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveCardId(card.id)
                      }}
                    >
                      DETAIL
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="research-modal-backdrop"
            onClick={handleClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(10px)" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="research-modal liquid-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="research-modal-close"
                aria-label="Close detail"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </button>
              <InstitutionCardDetail card={activeCard} onClose={handleClose} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function InteractivePillar({
  slides,
  className,
  isLarge = false,
}: {
  slides: PillarSlide[]
  className?: string
  isLarge?: boolean
}) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const currentSlide = slides[activeSlide]

  return (
    <div className={cn("pillar liquid-panel", className)}>
      <div className="pillar-slides-wrap">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="pillar-slide"
          >
            {currentSlide.logos?.length ? (
              <div className="pillar-logo-row">
                {currentSlide.logos.map((logo) => (
                  <div key={`${currentSlide.title}-${logo.alt}`} className="pillar-logo-chip" aria-hidden="true">
                    <Image src={logo.src} alt={logo.alt} className="pillar-logo-img" />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="pillar-text-wrap">
              <div className="pillar-title-row">
                <h3 className={isLarge ? "pillar-title-large" : "pillar-title"}>
                  {currentSlide.title}
                </h3>
                {currentSlide.titleMedia ? (
                  <Image
                    src={currentSlide.titleMedia.src}
                    alt={currentSlide.titleMedia.alt}
                    className="pillar-title-media"
                  />
                ) : null}
              </div>
              <p className={isLarge ? "pillar-copy-large" : "pillar-copy"}>
                {currentSlide.copy}
              </p>
              {currentSlide.actions?.length ? (
                <div className="pillar-actions">
                  {currentSlide.actions.map((action) =>
                    action.disabled || !action.href ? (
                      <span
                        key={`${currentSlide.title}-${action.label}`}
                        className="pillar-action pillar-action-disabled"
                      >
                        {action.label}
                      </span>
                    ) : (
                      <a
                        key={`${currentSlide.title}-${action.label}`}
                        href={toExternalHref(action.href)}
                        target="_blank"
                        rel="noreferrer"
                        className="pillar-action"
                      >
                        {action.label}
                      </a>
                    )
                  )}
                </div>
              ) : null}
            </div>
            <div className="pillar-gallery-wrap">
              <div
                className="pillar-image-wrap cursor-pointer"
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % currentSlide.images.length)}
              >
                <Image
                  src={currentSlide.images[activeImageIndex]}
                  alt={`${currentSlide.title} visual ${activeImageIndex + 1}`}
                  className={cn("pillar-image transition-opacity duration-300", currentSlide.imageClassName)}
                />
                <div className="pillar-image-wash" aria-hidden="true" />
                {/* Image counter dots */}
                {currentSlide.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 z-10 flex gap-1">
                    {currentSlide.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={cn("w-1.5 h-1.5 rounded-full transition-all", activeImageIndex === idx ? "bg-white" : "bg-white/30")}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Topic switcher tabs — each tab is a fully different gallery view */}
      {slides.length > 1 && (
        <div className="pillar-tabs">
          {slides.map((slide, i) => (
            <button
              key={i}
              type="button"
              className={cn("pillar-tab", activeSlide === i && "pillar-tab-active")}
              onClick={() => {
                setActiveSlide(i)
                setActiveImageIndex(0)
              }}
              aria-label={`Switch to ${slide.title}`}
            >
              {slide.title}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function PillarsSection() {
  return (
    <SectionShell id="experience">
      <div className="pillars-container">
        {/* Pillar 1 – Community Outreach */}
        <Reveal delay={0.1} className="pillar-wrap pillar-wrap-left">
          <InteractivePillar
            isLarge={true}
            slides={[
              {
                title: "Uplift Art Foundation",
                copy: "Led art outreach across 10 Bay Area schools; created and delivered 5,000+ cards for pediatric patients with national partner CFHK.",
                images: [upliftCardsSpread],
                actions: [
                  { label: "Website", href: "uplift-art.vercel.app", kind: "website" },
                ],
                logos: [
                  { src: monteVistaLogo, alt: "Uplift Art Foundation" },
                  { src: dilworthDragonsLogo, alt: "Dilworth Dragons" },
                  { src: vikingMascotLogo, alt: "Viking School" },
                  { src: millerMustangsLogo, alt: "Miller Middle School" },
                  { src: harkerLogo, alt: "De Vargas STEM" },
                ],
              },
            ]}
          />
        </Reveal>

        {/* Pillar 2 – STEM Leadership */}
        <Reveal delay={0.2} className="pillar-wrap pillar-wrap-center">
          <InteractivePillar
            className="pillar-main"
            isLarge={true}
            slides={[
              {
                title: "NovaSTEM",
                copy: "Founded STEM outreach; partner of Good Samaritan Preschool and Sunday Friends, delivering hands-on workshops to 350+ students.",
                images: [novaStemBalloonScience],
                titleMedia: { src: nova, alt: "NovaSTEM mark" },
                actions: [
                  { label: "Website", href: "novastem.vercel.app", kind: "website" },
                ],
                logos: [
                  { src: sundayFriendsLogo, alt: "Sunday Friends" },
                  { src: goodSamaritanLogo, alt: "Good Samaritan" },
                ],
              },
            ]}
          />
        </Reveal>

        {/* Pillar 3 – CS Mentorship */}
        <Reveal delay={0.3} className="pillar-wrap pillar-wrap-right">
          <InteractivePillar
            isLarge={true}
            slides={[
              {
                title: "CS4All",
                copy: "Mentored students in foundational CS concepts, guiding hands-on coding and problem-solving sessions.",
                images: [athletes],
                imageClassName: "pillar-image--cs4all",
                logos: [
                  { src: upliftHawkLogo, alt: "Harker School" },
                  { src: dilworthDragonsLogo, alt: "Miller Middle School" },
                  { src: deVargasStemLogo, alt: "Monte Vista" },
                ],
              },
            ]}
          />
        </Reveal>
      </div>
    </SectionShell>
  )
}

function ProjectGridSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.15, once: true })
  const { setPaused } = useShaderPalette()
  const [activeGridProject, setActiveGridProject] = useState<GridProject | null>(null)

  useEffect(() => {
    setPaused(isInView)
  }, [isInView, setPaused])

  return (
    <SectionShell id="projects-grid" noSnap>
      <div ref={ref} className="projects-page-shell">
        <div className="projects-page-container">
          <div className="projects-page-content">


            <div className="projects-marquee-viewport">
              <div className="flex flex-row gap-8 p-8 items-start">
                {/* Column 1 */}
                <div className="flex flex-col gap-8 flex-1">
                  {portfolioProjects.filter((_, i) => i % 2 === 0).map((project, idx) => (
                    <div key={`${project.title}-${idx}`} className="projects-v2-card-slot">
                      <article
                        role="button"
                        tabIndex={0}
                        className="projects-v2-card projects-page-card-optimized cursor-pointer"
                        onClick={() => setActiveGridProject(project as any)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault()
                            setActiveGridProject(project as any)
                          }
                        }}
                      >
                        <div className="projects-v2-card-text">
                          <div className="projects-v2-card-header-row">
                            <div className="projects-v2-title-stack">
                              <h3 className="projects-page-card-title">{project.title}</h3>
                              {"badge" in project && project.badge ? (
                                <span className="projects-v2-award-badge">{project.badge}</span>
                              ) : null}
                            </div>
                            <div
                              className="projects-v2-card-link-mini"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.href, '_blank', 'noreferrer');
                              }}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </div>
                          </div>

                          <p className="projects-page-card-subtitle">{project.hook}</p>
                        </div>

                        <div className="projects-v2-card-visual">
                          <div className="projects-v2-card-visual-inner">
                            {"gif" in project && project.gif ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={project.gif}
                                alt={`${project.title} demo`}
                                className="projects-v2-card-img"
                              />
                            ) : "image" in project && project.image ? (
                              <Image
                                src={project.image}
                                alt={`${project.title} screenshot`}
                                className="projects-v2-card-img"
                              />
                            ) : null}
                            <div className="projects-v2-card-img-wash" aria-hidden="true" />
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-8 flex-1">
                  {portfolioProjects.filter((_, i) => i % 2 !== 0).map((project, idx) => (
                    <div key={`${project.title}-${idx}`} className="projects-v2-card-slot">
                      <article
                        role="button"
                        tabIndex={0}
                        className="projects-v2-card projects-page-card-optimized cursor-pointer"
                        onClick={() => setActiveGridProject(project as any)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault()
                            setActiveGridProject(project as any)
                          }
                        }}
                      >
                        <div className="projects-v2-card-text">
                          <div className="projects-v2-card-header-row">
                            <div className="projects-v2-title-stack">
                              <h3 className="projects-page-card-title">{project.title}</h3>
                              {"badge" in project && project.badge ? (
                                <span className="projects-v2-award-badge">{project.badge}</span>
                              ) : null}
                            </div>
                            <div
                              className="projects-v2-card-link-mini"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.href, '_blank', 'noreferrer');
                              }}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </div>
                          </div>

                          <p className="projects-page-card-subtitle">{project.hook}</p>
                        </div>

                        <div className="projects-v2-card-visual">
                          <div className="projects-v2-card-visual-inner">
                            {"gif" in project && project.gif ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={project.gif}
                                alt={`${project.title} demo`}
                                className="projects-v2-card-img"
                              />
                            ) : "image" in project && project.image ? (
                              <Image
                                src={project.image}
                                alt={`${project.title} screenshot`}
                                className="projects-v2-card-img"
                              />
                            ) : null}
                            <div className="projects-v2-card-img-wash" aria-hidden="true" />
                          </div>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Grid Project Modal */}
            <AnimatePresence>
              {activeGridProject && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="research-modal-backdrop"
                  onClick={() => setActiveGridProject(null)}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 36, scale: 0.96, filter: "blur(10px)" }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="research-modal liquid-panel max-w-6xl w-full"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <button
                      type="button"
                      className="research-modal-close"
                      aria-label="Close project detail"
                      onClick={() => setActiveGridProject(null)}
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 p-4 md:p-6">
                      <div className="space-y-6">
                        <div className="projects-v2-card-visual-inner rounded-2xl overflow-hidden border border-white/10 aspect-video md:aspect-square">
                          {activeGridProject.gif ? (
                            <img src={activeGridProject.gif} alt={activeGridProject.title} className="w-full h-full object-cover" />
                          ) : activeGridProject.image ? (
                            <Image src={activeGridProject.image} alt={activeGridProject.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center">
                              <Sparkles className="h-10 w-10 text-white/20" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div className="projects-v2-modal-heading">
                            <h2 className="text-3xl font-display-serif text-white">{activeGridProject.title}</h2>
                            {activeGridProject.badge ? (
                              <span className="projects-v2-award-badge projects-v2-award-badge-modal">{activeGridProject.badge}</span>
                            ) : null}
                          </div>
                          <p className="text-white/60 leading-relaxed">{activeGridProject.hook}</p>

                          <a
                            href={activeGridProject.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-colors"
                          >
                            View on {activeGridProject.linkLabel}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>

                      <div className="md:border-l md:border-white/5 md:pl-10">
                        {activeGridProject.href.includes("github.com") ? (
                          <ReadmeViewer repoUrl={activeGridProject.href} />
                        ) : (
                          <div className="py-20 text-center opacity-40">
                            <p className="text-sm font-mono">Extended description available on website</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </SectionShell>
  )
}

function ForFunSection() {
  const [activeGridProject, setActiveGridProject] = useState<GridProject | null>(null)

  return (
    <SectionShell id="for-fun">
      <div className="for-fun-page-shell">
        <div className="for-fun-page-layout">
          <div className="for-fun-grid">
            {forFunProjects.map((project, idx) => (
            <article
              key={`${project.title}-${idx}`}
              role="button"
              tabIndex={0}
              className="projects-v2-card projects-page-card-optimized cursor-pointer h-full !p-5 !rounded-[2.25rem] flex flex-col overflow-hidden relative group justify-between"
              onClick={() => setActiveGridProject(project as any)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  setActiveGridProject(project as any)
                }
              }}
            >
              <div className="projects-v2-card-text flex flex-col items-center justify-center text-center flex-shrink-0 mb-3 w-full">
                <h3 className="projects-page-card-title text-base tracking-wider font-bold text-white">{project.title.toLowerCase()}</h3>
                <p className="font-display-serif mt-1.5 text-[11px] leading-relaxed opacity-60 text-white/70 max-w-[95%]">
                  {project.hook}
                </p>
              </div>
              <div className="flex-grow min-h-0 w-full flex items-center justify-center relative">
                {"image" in project && project.image ? (
                  <div className="relative max-h-full max-w-full rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-md overflow-hidden transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="max-h-[140px] lg:max-h-[190px] w-auto h-auto object-contain rounded-xl"
                    />
                    <div className="projects-v2-card-img-wash" aria-hidden="true" />
                  </div>
                ) : "languages" in project && project.languages ? (
                  <div className="flex flex-col gap-1.5 w-full justify-center items-center px-4">
                    {project.languages.map(lang => (
                      <div
                        key={lang}
                        className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-center text-[10px] font-bold text-white/90 font-display-serif"
                      >
                        {lang}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white/20" />
                  </div>
                )}
              </div>
            </article>
            ))}
          </div>

          <aside className="for-fun-terminal">
            <div className="for-fun-terminal-inner">
              <GitHubTerminal />
            </div>
          </aside>
        </div>

        <AnimatePresence>
          {activeGridProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10"
            >
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setActiveGridProject(null)} />
              <motion.div
                layoutId={`forfun-${activeGridProject.title}`}
                className="relative w-full max-w-2xl bg-[#0a0c14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setActiveGridProject(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>

                <div className="p-8 md:p-12 space-y-8">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                    {activeGridProject.image ? (
                      <Image src={activeGridProject.image} alt={activeGridProject.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="h-12 w-12 text-white/10" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl font-display-serif text-white">{activeGridProject.title.toLowerCase()}</h2>
                    <p className="text-white/60 leading-relaxed">{activeGridProject.hook}</p>

                    {"languages" in activeGridProject && (activeGridProject as any).languages && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(activeGridProject as any).languages.map((lang: string) => (
                          <span key={lang} className="px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/10 text-xs font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}

function ContactSection() {
  return (
    <SectionShell id="contact">
      <div className="contact-page-shell">
        <div className="contact-page-visual-column">
          <div className="contact-photo-shell">
            <div className="contact-photo-frame">
              <Image
                src={contactImage}
                alt="Portrait of Vishay Agarwal"
                className="contact-photo"
              />
              <div className="contact-photo-wash" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="contact-page-panel-column">
          <div className="contact-panel liquid-panel">
            <div className="contact-panel-header">
              <span className="contact-panel-kicker">Connect</span>
              <h3 className="contact-panel-title">Feel free to reach out!</h3>
              <p className="contact-panel-copy">
                If you have an idea, research opportunity, collaboration, or even just a question, I&apos;m always happy to connect
              </p>
            </div>

            <div className="contact-button-grid">
              {contactButtons.map((button) => (
                <a
                  key={button.label}
                  href={button.href.startsWith("#") ? button.href : toExternalHref(button.href)}
                  target={button.href.startsWith("#") ? undefined : "_blank"}
                  rel={button.href.startsWith("#") ? undefined : "noreferrer"}
                  className="contact-button-tile"
                >
                  <div className="contact-button-image-shell">
                    <Image src={button.image} alt={button.label} className="contact-button-image" />
                  </div>
                  <span className="contact-button-label">{button.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}

export function PortfolioPage() {
  return (
    <>
      <main className="portfolio-page">
        <StickyNavbar />

        <HeroSection />

        <ResearchShowcase />

        <PillarsSection />

        <ProjectGridSection />
        <ForFunSection />
        <ContactSection />
      </main>

      <style jsx global>{`
        .nav-root {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 30;
        }

        .nav-shell {
          display: grid;
          grid-template-columns: minmax(12rem, auto) minmax(0, 1fr) auto;
          align-items: center;
          gap: 1rem;
          width: 100%;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgb(255 255 255 / 0.08);
          backdrop-filter: blur(26px) saturate(140%);
          background: linear-gradient(180deg, rgb(7 10 19 / 0.34), rgb(7 10 19 / 0.12));
        }

        .github-banner-wrap {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          padding: 0.75rem 1.5rem;
          width: 100%;
          display: flex;
          justify-content: center;
          pointer-events: none;
          z-index: 20;
        }

        .github-banner {
          pointer-events: auto;
          max-width: 600px;
          width: 100%;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          background: linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.05));
          backdrop-filter: blur(16px) saturate(120%);
          border: 1px solid rgb(255 255 255 / 0.16);
          box-shadow: 
            0 8px 32px rgb(0 0 0 / 0.2),
            0 0 20px rgb(255 255 255 / 0.03);
          transition: transform 0.2s ease;
        }

        .github-banner:hover {
          transform: scale(1.02);
          border-color: rgb(255 255 255 / 0.25);
        }

        .github-banner-icon-glow {
          position: relative;
          background: rgb(16 185 129 / 0.1) !important;
          border-color: rgb(16 185 129 / 0.2) !important;
          box-shadow: 0 0 10px rgb(16 185 129 / 0.2);
        }

        .github-banner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .github-banner-left {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .github-banner-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          background: rgb(255 255 255 / 0.06);
          border-radius: 50%;
          border: 1px solid rgb(255 255 255 / 0.14);
          flex-shrink: 0;
        }

        .github-banner-text {
          font-size: 0.68rem;
          font-weight: 600;
          color: rgb(255 255 255 / 0.95);
          letter-spacing: 0.02em;
          font-family: var(--font-body-luxury);
          text-shadow: 0 2px 4px rgb(0 0 0 / 0.3);
        }

        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-width: 0;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .nav-palette-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.06), transparent 58%);
          backdrop-filter: blur(18px) saturate(140%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 24px rgb(0 0 0 / 0.08);
        }

        .nav-palette-button,
        .nav-mobile-palette-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .nav-palette-button {
          width: 2.25rem;
          height: 2.25rem;
          padding: 0.24rem;
        }

        .nav-palette-button:hover,
        .nav-mobile-palette-button:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.18);
        }

        .nav-palette-button-active,
        .nav-mobile-palette-button-active {
          border-color: rgb(255 255 255 / 0.28);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 22px rgb(0 0 0 / 0.1);
        }

        .nav-palette-swatch {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 999px;
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.35),
            0 8px 18px rgb(0 0 0 / 0.12);
        }

        .nav-link {
          padding: 0.72rem 1rem;
          border-radius: 999px;
          color: rgb(255 255 255 / 0.76);
        }

        .nav-mobile-palettes {
          display: none;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.55rem;
          margin-bottom: 0.35rem;
        }

        .nav-mobile-palette-button {
          gap: 0.55rem;
          justify-content: flex-start;
          padding: 0.8rem 0.9rem;
          border-radius: 1rem;
          border-color: rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.06), transparent 58%);
          color: rgb(255 255 255 / 0.82);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          backdrop-filter: blur(16px);
        }

        .nav-mobile-palette-button .nav-palette-swatch {
          width: 1.4rem;
          height: 1.4rem;
          flex-shrink: 0;
        }

        html {
          scroll-snap-type: y mandatory;
          scroll-padding-top: 92px;
          overscroll-behavior-y: none;
        }

        body {
          scroll-snap-type: none;
          margin: 0;
          padding: 0;
        }

        .portfolio-page {
          padding-top: 0;
        }

        .snap-section {
          scroll-snap-align: start;
          scroll-snap-stop: always;
          contain: layout style paint;
        }

        .hero-section {
          width: 100%;
          min-height: 100vh;
          height: 100vh;
          max-height: 100vh;
          padding: calc(92px + 1.5rem) 2rem 3rem;
          overflow: hidden;
          position: relative;
          isolation: isolate;
        }

        .hero-ambient-stage {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .hero-ambient-ribbon {
          position: absolute;
          border-radius: 999px;
          filter: blur(46px);
          mix-blend-mode: screen;
          opacity: 0.68;
        }

        .hero-ambient-ribbon-one {
          top: 10%;
          left: 6%;
          width: 18rem;
          height: 18rem;
          background:
            radial-gradient(circle at center, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.02) 70%, transparent 100%);
        }

        .hero-ambient-ribbon-two {
          right: 8%;
          bottom: 9%;
          width: 22rem;
          height: 22rem;
          background:
            radial-gradient(circle at center, rgb(219 186 149 / 0.22), rgb(219 186 149 / 0.02) 70%, transparent 100%);
        }

        .section-anchor {
          height: 100vh !important;
          min-height: 100vh !important;
          max-height: 100vh !important;
          overflow: hidden !important;
          padding-top: 92px !important;
          padding-left: 1.5rem !important;
          padding-right: 1.5rem !important;
          padding-bottom: 1.5rem !important;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
        }

        #experience.section-anchor {
          padding-left: 0.75rem !important;
          padding-right: 0.75rem !important;
          padding-bottom: 0.75rem !important;
        }

        #research.section-anchor {
          padding-top: 92px !important;
        }

        #projects-grid.section-anchor {
          padding-top: 92px !important;
          padding-bottom: 0 !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          width: 100vw !important;
          max-width: 100vw !important;
        }

        #contact.section-anchor {
          padding-top: 92px !important;
          padding-bottom: 1.5rem !important;
        }

        .hero-inner {
          display: flex;
          align-items: center;
          min-height: 100%;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(34rem, 1.14fr);
          align-items: center;
          gap: clamp(1.25rem, 3vw, 3.5rem);
          width: 100%;
        }

        .hero-copy-column {
          width: 100%;
          max-width: 64rem;
          padding-left: clamp(3rem, 8vw, 9rem);
        }

        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.72rem 1rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.16);
          background: rgb(255 255 255 / 0.1);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgb(255 255 255 / 0.8);
          position: relative;
          overflow: hidden;
        }

        .hero-kicker-animated {
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 12px 28px rgb(0 0 0 / 0.12);
        }

        .hero-kicker-sheen {
          position: absolute;
          inset: -20% auto -20% -40%;
          width: 38%;
          background: linear-gradient(90deg, transparent, rgb(255 255 255 / 0.36), transparent);
          transform: skewX(-20deg);
          animation: hero-kicker-sheen 6.8s ease-in-out infinite;
          pointer-events: none;
        }

        .hero-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-weight: 500;
          font-optical-sizing: auto;
          margin-top: 1.5rem;
          max-width: 100%;
          font-size: clamp(4.2rem, 9.5vw, 8.5rem);
          line-height: 0.88;
          letter-spacing: -0.05em;
          color: white;
        }

        .hero-title-line {
          display: block;
          position: relative;
          text-shadow: 0 10px 38px rgb(0 0 0 / 0.16);
        }

        .hero-title-line-accent {
          color: white;
        }

        .hero-subtext {
          margin-top: 1.5rem;
          max-width: 46rem;
          font-size: clamp(1.28rem, 1.7vw, 1.65rem);
          line-height: 1.72;
          color: rgb(255 255 255 / 0.76);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 2rem;
        }

        .hero-portrait-wrap {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          min-height: 100%;
          padding-right: clamp(1rem, 4vw, 4rem);
        }

        .hero-portrait-shell {
          width: min(54vw, 50rem);
          max-width: 50rem;
          min-width: 34rem;
        }

        .hero-portrait-mask {
          height: min(82vh, 58rem);
          max-height: 58rem;
        }

        .hero-image {
          object-position: center 14%;
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgb(0 0 0 / 0.92) 12%,
            black 24%,
            black 76%,
            rgb(0 0 0 / 0.92) 88%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            rgb(0 0 0 / 0.92) 12%,
            black 24%,
            black 76%,
            rgb(0 0 0 / 0.92) 88%,
            transparent 100%
          );
        }

        .hero-image-wash {
          background:
            linear-gradient(
              to bottom,
              rgb(240 244 255 / 0.16) 0%,
              rgb(240 244 255 / 0.04) 12%,
              transparent 26%,
              transparent 74%,
              rgb(9 11 20 / 0.12) 88%,
              rgb(9 11 20 / 0.42) 100%
            ),
            radial-gradient(circle at center, transparent 42%, rgb(9 11 20 / 0.12) 68%, rgb(9 11 20 / 0.34) 100%);
          filter: blur(14px);
        }

        .hero-image-sheen {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, transparent 24%, rgb(255 255 255 / 0.18) 40%, transparent 56%),
            linear-gradient(180deg, rgb(255 255 255 / 0.06), transparent 18%);
          mix-blend-mode: screen;
          opacity: 0.72;
          animation: hero-image-sheen 8.2s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes hero-kicker-sheen {
          0%, 14% {
            transform: translateX(0) skewX(-20deg);
            opacity: 0;
          }
          22% {
            opacity: 1;
          }
          36%, 100% {
            transform: translateX(380%) skewX(-20deg);
            opacity: 0;
          }
        }

        @keyframes hero-image-sheen {
          0%, 16% {
            transform: translateX(-24%);
            opacity: 0;
          }
          28% {
            opacity: 0.72;
          }
          44%, 100% {
            transform: translateX(24%);
            opacity: 0;
          }
        }

        /* ── Institution Grid (Research) ──────────────── */
        .inst-grid-shell {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .inst-grid-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          flex: 1;
          min-height: 0;
        }

        .inst-grid-bottom {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
          flex: 1;
          min-height: 0;
        }

        .inst-card-slot {
          height: 100%;
          min-height: 0;
        }

        .inst-card-slot--wide {
          grid-column: 1 / -1;
        }

        .inst-card {
          position: relative;
          height: 100%;
          width: 100%;
          border-radius: 2rem;
          border: 1px solid rgb(255 255 255 / 0.14);
          overflow: hidden;
          background: #111;
          display: flex;
          align-items: center;
          padding: 2.5rem;
          gap: 2.5rem;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .inst-card:hover {
          transform: scale(1.005);
          border-color: rgb(255 255 255 / 0.25);
        }

        .inst-card-bg-wrap {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .inst-card-bg-img {
          object-fit: cover;
          opacity: 0.82;
          filter: saturate(0.65) contrast(0.92) brightness(1.08);
        }

        .inst-card-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.1) 0%,
              rgba(255, 255, 255, 0.04) 38%,
              rgba(0, 0, 0, 0.18) 62%,
              rgba(0, 0, 0, 0.48) 100%
            );
        }

        .inst-card-panel {
          position: relative;
          z-index: 2;
          flex: 0 0 42%;
          aspect-ratio: 16/10;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgb(255 255 255 / 0.12);
          background: rgba(0,0,0,0.4);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .inst-card-panel-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .inst-card--featured .inst-card-panel {
          flex-basis: 32%;
          max-width: 38rem;
        }

        .inst-card-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .inst-card-institution {
          font-family: var(--font-sans-display);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.78);
          margin-bottom: 0.75rem;
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
        }

        .inst-card-title {
          font-family: \"Sohne\", \"Geist\", sans-serif !important;
          font-size: clamp(1.8rem, 2.5vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          color: white;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow:
            0 2px 8px rgba(0, 0, 0, 0.8),
            0 8px 24px rgba(0, 0, 0, 0.45);
        }

        .inst-card-description {
          font-size: 1.15rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.88);
          max-width: 36ch;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 2rem;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.85);
        }

        .inst-card-detail-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.78);
          text-shadow: 0 1px 6px rgba(0, 0, 0, 0.9);
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .inst-card:hover .inst-card-detail-link {
          color: white;
          transform: translateX(4px);
        }

        .research-editorial-shell {
          display: grid;
          grid-template-rows: minmax(0, 1fr);
          flex: 1;
          margin-top: 0;
          height: 100%;
          min-height: 0;
        }

        .research-grid-frame {
          display: grid;
          align-items: stretch;
          overflow: hidden;
          height: 100%;
          min-height: 0;
          padding-top: 0.75rem;
          padding-bottom: 0;
        }

        .research-editorial-panel {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
          padding: 1.8rem;
          border-color: rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.14), transparent 42%);
        }

        .research-editorial-copy,
        .research-editorial-meta {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .research-editorial-meta {
          gap: 0.8rem;
          align-self: stretch;
        }

        .research-editorial-title {
          margin-top: 0.85rem;
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(2rem, 3.2vw, 3.4rem);
          line-height: 1;
          letter-spacing: -0.05em;
          color: white;
        }

        .research-editorial-text {
          margin-top: 1rem;
          max-width: 44rem;
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgb(255 255 255 / 0.76);
        }

        .research-mini-kicker {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgb(255 255 255 / 0.56);
        }

        .research-meta-pill,
        .research-stack-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          width: fit-content;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.1);
          background: rgb(255 255 255 / 0.06);
          padding: 0.7rem 0.95rem;
          font-size: 0.82rem;
          color: rgb(255 255 255 / 0.8);
          backdrop-filter: blur(18px);
        }

        .research-card-grid {
          display: grid;
          gap: clamp(1rem, 1vw, 1.25rem);
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          align-items: stretch;
          align-self: stretch;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .research-card-slot {
          min-height: 0;
          height: 100%;
        }

        .research-card {
          position: relative;
          display: grid;
          grid-template-columns: clamp(12rem, 31%, 15rem) minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr);
          column-gap: 1.25rem;
          row-gap: 0.9rem;
          min-height: 0;
          height: 100%;
          padding: 1.2rem;
          text-align: left;
          border-color: rgb(255 255 255 / 0.18);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.16), transparent 44%);
        }

        .research-card-sheen {
          position: absolute;
          inset: 0;
          opacity: 0.9;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .research-card-topline,
        .research-modal-topline {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.9rem;
        }

        .research-card-topline {
          grid-column: 1 / -1;
        }

        .research-logo-slot {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.9rem;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.08);
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          backdrop-filter: blur(18px);
        }

        .research-logo-slot-large {
          width: 3.4rem;
          height: 3.4rem;
          font-size: 1rem;
        }

        .research-card-tag {
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgb(255 255 255 / 0.58);
        }

        .research-card-image-wrap,
        .research-modal-visual {
          position: relative;
          overflow: hidden;
          margin-top: 1rem;
          border: 1px solid rgb(255 255 255 / 0.08);
        }

        .research-modal-visual {
          border-radius: 1.5rem;
          background: rgb(255 255 255 / 0.04);
        }

        .research-card-image-wrap {
          border-radius: 1rem;
          grid-column: 1;
          grid-row: 1;
          margin-top: 0;
          min-height: 0;
          height: auto;
          align-self: center;
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.15),
            0 18px 40px rgb(0 0 0 / 0.08);
        }

        .research-card-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .research-modal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }

        .research-card-image-wash,
        .research-modal-image-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgb(240 244 255 / 0.08), transparent 28%, transparent 72%, rgb(9 11 20 / 0.3)),
            radial-gradient(circle at center, transparent 46%, rgb(9 11 20 / 0.18) 74%, rgb(9 11 20 / 0.4) 100%);
          pointer-events: none;
        }

        .research-card-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          grid-column: 2;
          grid-row: 1;
          height: 100%;
          min-height: 0;
        }

        .research-card-title,
        .research-modal-title {
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(1.45rem, 1.5vw, 1.8rem);
          font-optical-sizing: auto;
          line-height: 1.04;
          letter-spacing: -0.04em;
          color: white;
        }

        .research-card-title {
          display: block;
          width: 100%;
        }

        .research-modal-description {
          margin-top: 0.42rem;
          font-size: clamp(0.98rem, 0.95vw, 1.08rem);
          line-height: 1.55;
          color: rgb(255 255 255 / 0.74);
        }

        .research-card-copy {
          margin-top: 0.8rem;
          font-size: clamp(1.05rem, 1.25vw + 0.4rem, 1.25rem);
          line-height: 1.6;
          color: rgb(255 255 255 / 0.85);
          white-space: pre-line;
          display: block;
        }

        .research-card-hook {
          font-size: clamp(0.98rem, 1.05vw, 1.15rem);
          line-height: 1.55;
          color: rgb(255 255 255 / 0.82);
          margin-top: 0;
          margin-bottom: 1rem;
          max-width: 45ch;
        }

        .research-card-footer {
          margin-top: auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          padding-top: 1.5rem;
        }

        .research-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.98rem;
          font-weight: 500;
          color: rgb(255 255 255 / 0.84);
        }

        .research-card-detail-button {
          border: 1px solid rgb(255 255 255 / 0.12);
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 55%);
          padding: 0.62rem 0.95rem;
          backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 24px rgb(0 0 0 / 0.08);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease;
        }

        .research-card-detail-button:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.2);
        }

        .research-card-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          justify-content: flex-end;
        }

        .research-card-action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 55%);
          padding: 0.58rem 0.88rem;
          font-size: 0.83rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: rgb(255 255 255 / 0.86);
          backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 10px 24px rgb(0 0 0 / 0.08);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .research-card-action:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.2);
          color: white;
        }

        .research-card-action-disabled {
          opacity: 0.62;
          cursor: default;
        }

        .research-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: rgb(5 8 16 / 0.48);
          backdrop-filter: blur(24px) saturate(135%);
        }

        .research-modal {
          position: relative;
          width: min(72rem, 100%);
          padding: 1.4rem;
          border-color: rgb(255 255 255 / 0.14);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.12), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.15), transparent 38%);
        }

        .research-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.75rem;
          height: 2.75rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.08);
          color: rgb(255 255 255 / 0.86);
        }

        .research-modal-grid {
          display: grid;
          gap: 1.4rem;
          grid-template-columns: minmax(0, 1fr) minmax(20rem, 0.92fr);
        }

        .research-detail-grid {
          display: grid;
          gap: 1.4rem;
          align-items: stretch;
          min-height: 0;
        }

        .research-detail-grid--chamtern,
        .research-detail-grid--phytovision {
          grid-template-columns: minmax(0, 1fr) minmax(22rem, 0.96fr);
        }

        .research-detail-grid--neuro {
          grid-template-columns: minmax(22rem, 0.94fr) minmax(18rem, 0.72fr);
        }

        .research-detail-grid--sentinel {
          grid-template-columns: minmax(20rem, 0.9fr) minmax(0, 1fr);
        }

        .research-detail-visual,
        .research-detail-stat-card {
          position: relative;
          overflow: hidden;
          border-radius: 1.55rem;
          border: 1px solid rgb(255 255 255 / 0.1);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.1), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.11), transparent 42%);
        }

        .research-detail-visual {
          min-height: 28rem;
          padding: 1.1rem;
        }

        .research-detail-visual--sentinel,
        .research-detail-visual--neuro {
          min-height: 24rem;
        }

        .research-detail-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 0;
          padding: 0.6rem 0.5rem 0.6rem 0.2rem;
        }

        .research-detail-copy .research-mini-kicker {
          margin-top: 2rem;
        }

        .research-detail-copy .research-modal-title {
          margin-top: 0.8rem;
        }

        .research-detail-copy .research-modal-description {
          margin-top: 1.2rem;
        }

        .research-detail-copy--sentinel {
          padding-right: 1rem;
        }

        .research-detail-rail {
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          gap: 1rem;
        }

        .research-detail-stat-card {
          display: grid;
          gap: 0.5rem;
          padding: 1rem 1.1rem;
          backdrop-filter: blur(18px);
        }

        .research-detail-stat-label {
          font-size: 0.66rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.54);
        }

        .research-detail-stat-value {
          font-size: 0.98rem;
          line-height: 1.65;
          color: rgb(255 255 255 / 0.78);
        }

        .research-modal-image--contain {
          object-fit: contain;
          object-position: center center;
        }

        .research-detail-note {
          margin-top: 1.3rem;
          border: 1px solid rgb(255 255 255 / 0.08);
          border-radius: 1.35rem;
          background: rgb(255 255 255 / 0.05);
          padding: 1rem 1.1rem;
          font-size: 0.98rem;
          line-height: 1.72;
          color: rgb(255 255 255 / 0.74);
        }

        .research-modal-visual {
          min-height: 30rem;
        }

        .research-modal-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 1rem 1rem 1rem 0.4rem;
        }

        .research-modal-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        .research-modal-note {
          margin-top: 1.4rem;
          border: 1px solid rgb(255 255 255 / 0.08);
          border-radius: 1.35rem;
          background: rgb(255 255 255 / 0.05);
          padding: 1rem 1.1rem;
          font-size: 0.96rem;
          line-height: 1.75;
          color: rgb(255 255 255 / 0.74);
        }

        .pillars-container {
          display: flex;
          align-items: stretch;
          justify-content: center;
          gap: clamp(0.75rem, 1.5vw, 1.25rem);
          margin-top: 0;
          margin-bottom: 0;
          padding: 0.25rem 0 0.25rem;
          width: 100%;
          flex: 1;
          min-height: 0;
          max-height: calc(100vh - 92px - 8.25rem);
        }

        .pillar-wrap {
          flex: 1;
          display: flex;
          align-items: stretch;
          min-width: 0;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pillar-wrap:hover {
          transform: translateY(-8px);
        }

        .pillar {
          width: 100%;
          height: 100%;
          min-height: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          padding: clamp(0.9rem, 1.45vw, 1.25rem);
          border-radius: 2rem;
          border: 1px solid rgb(255 255 255 / 0.16);
          background:
            linear-gradient(135deg, rgb(255 255 255 / 0.15), rgb(255 255 255 / 0.02)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.15), transparent 45%);
          backdrop-filter: blur(28px) saturate(140%);
          box-shadow: 
            0 24px 48px rgb(0 0 0 / 0.25),
            inset 0 1px 0 rgb(255 255 255 / 0.25),
            inset 0 0 20px rgb(255 255 255 / 0.05);
          overflow: hidden;
        }

        .pillar-wrap-center .pillar {
          border-color: rgb(255 255 255 / 0.25);
          background:
            linear-gradient(135deg, rgb(255 255 255 / 0.22), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.22), transparent 50%);
          box-shadow: 
            0 32px 64px rgb(0 0 0 / 0.3),
            inset 0 1px 0 rgb(255 255 255 / 0.35),
            inset 0 0 24px rgb(255 255 255 / 0.1);
        }

        .pillar-slides-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
          min-height: 0;
        }

        .pillar-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          height: 100%;
          min-height: 0;
          gap: 0.45rem;
        }

        .pillar-text-wrap {
          flex: 0 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 0;
        }

        .pillar-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.55rem;
          margin-top: 0.95rem;
        }

        .pillar-action {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 6.6rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.16);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 60%);
          padding: 0.58rem 0.9rem;
          font-size: 0.76rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: rgb(255 255 255 / 0.86);
          backdrop-filter: blur(18px) saturate(135%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 12px 24px rgb(0 0 0 / 0.08);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .pillar-action:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.22);
          color: white;
        }

        .pillar-action-disabled {
          opacity: 0.68;
          cursor: default;
        }

        .pillar-logo-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-top: 0.1rem;
          margin-bottom: 0.55rem;
          justify-content: center;
          max-width: 100%;
        }

        .pillar-logo-chip {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1.08rem;
          border: 1px solid rgb(255 255 255 / 0.18);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.2), rgb(255 255 255 / 0.06)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.16), transparent 60%);
          backdrop-filter: blur(14px) saturate(135%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.26),
            0 10px 22px rgb(0 0 0 / 0.08);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.28rem;
        }

        .pillar-gallery-wrap {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: center;
          width: 100%;
          margin-bottom: 0;
          min-height: 0;
        }

        .pillar-image-wrap {
          width: 100%;
          height: min(100%, clamp(14.75rem, 31vh, 21rem));
          max-height: 100%;
          border-radius: 2.8rem;
          overflow: visible;
          position: relative;
          border: none;
          background: transparent;
          flex-shrink: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }

        .pillar-image {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center center;
          border-radius: 2.8rem;
          background: transparent;
          box-shadow: 0 12px 28px rgb(0 0 0 / 0.12);
          filter: saturate(1.02) contrast(1.03);
          mask-image: radial-gradient(ellipse 94% 92% at center, black 58%, rgb(0 0 0 / 0.92) 76%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 94% 92% at center, black 58%, rgb(0 0 0 / 0.92) 76%, transparent 100%);
        }

        .pillar-image--cs4all {
          max-width: 88%;
        }


        .pillar-image-wash {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            radial-gradient(circle at center, transparent 42%, rgb(255 255 255 / 0.05) 70%, transparent 100%),
            linear-gradient(
              to bottom,
              rgb(255 255 255 / 0.08) 0%,
              rgb(255 255 255 / 0.03) 10%,
              transparent 26%,
              transparent 74%,
              rgb(9 11 20 / 0.12) 88%,
              rgb(9 11 20 / 0.34) 100%
            ),
            linear-gradient(
              to right,
              rgb(255 255 255 / 0.06) 0%,
              rgb(255 255 255 / 0.02) 10%,
              transparent 24%,
              transparent 76%,
              rgb(9 11 20 / 0.1) 90%,
              rgb(9 11 20 / 0.28) 100%
            );
          filter: blur(24px);
          mix-blend-mode: screen;
          opacity: 0.98;
          pointer-events: none;
        }

        .pillar-tabs {
          display: flex;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 0.95rem;
          padding-bottom: 0.1rem;
          flex-shrink: 0;
          width: 100%;
          justify-content: center;
        }

        .pillar-tab {
          flex: 1;
          padding: 0.45rem 0.75rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.06);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgb(255 255 255 / 0.6);
          transition: all 0.2s ease;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pillar-tab:hover {
          background: rgb(255 255 255 / 0.12);
          border-color: rgb(255 255 255 / 0.25);
          color: rgb(255 255 255 / 0.9);
        }

        .pillar-tab-active {
          background: rgb(255 255 255 / 0.18);
          border-color: rgb(255 255 255 / 0.36);
          color: white;
          font-weight: 600;
        }

        .pillar-title-row {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          max-width: 100%;
          flex-wrap: nowrap;
        }

        .pillar-title-media {
          width: auto;
          height: clamp(2.7rem, 3vw, 3.35rem);
          flex-shrink: 0;
          object-fit: contain;
          filter: drop-shadow(0 8px 18px rgb(0 0 0 / 0.12));
        }

        .pillar-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(1.6rem, 2vw, 2.2rem);
          color: white;
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }

        .pillar-title-large {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(2rem, 2.65vw, 2.9rem);
          color: white;
          margin-bottom: 0.8rem;
          line-height: 1.1;
        }

        .pillar-title-row .pillar-title,
        .pillar-title-row .pillar-title-large {
          margin-bottom: 0;
          white-space: nowrap;
        }

        .pillar-title-row + .pillar-copy,
        .pillar-title-row + .pillar-copy-large {
          margin-top: 0.8rem;
        }

        .pillar-copy {
          font-size: clamp(0.9rem, 0.95vw, 1rem);
          color: rgb(255 255 255 / 0.76);
          line-height: 1.5;
        }

        .pillar-copy-large {
          font-size: clamp(0.96rem, 1vw, 1.08rem);
          color: rgb(255 255 255 / 0.82);
          line-height: 1.5;
        }

        .projects-page-shell {
          flex: 1;
          min-height: 0;
          height: 100%;
          width: 100%;
          max-width: none;
          margin-inline: auto;
          display: grid;
          align-items: stretch;
        }

        .projects-page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.5rem;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        @media (min-width: 1024px) {
          .projects-page-container {
            flex-direction: row;
            gap: 0;
            align-items: stretch;
            justify-content: center;
          }

          .projects-page-content {
            flex: 0 1 96rem;
            width: min(100%, 96rem);
            min-width: 0;
            margin-inline: auto;
          }
        }

        .projects-page-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(3, minmax(0, 1fr));
          gap: clamp(0.6rem, 0.8vw, 1rem);
          width: 100%;
          height: 100%;
          min-height: 0;
          contain: layout style;
        }

        .projects-page-card-slot {
          min-height: 0;
          height: 100%;
        }

        .projects-page-card {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          gap: 0.6rem;
          height: 100%;
          min-height: 0;
          padding: clamp(0.8rem, 1vw, 1.1rem);
          border-radius: 1.5rem;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.12), transparent 40%);
          text-align: center;
          contain: layout style paint;
        }

        .projects-page-card-optimized {
          border: 1px solid rgb(255 255 255 / 0.1);
          transition: transform 0.2s ease-out, border-color 0.2s ease-out;
          transform: translateZ(0);
        }

        .projects-page-card-optimized:hover {
          transform: translateY(-6px) translateZ(0);
          border-color: rgb(255 255 255 / 0.2);
        }

        .projects-page-card-topline,
        .projects-page-card-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .projects-page-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2rem;
          padding: 0.45rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background: rgb(255 255 255 / 0.08);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.74);
        }

        .projects-page-index {
          font-size: 0.76rem;
          letter-spacing: 0.16em;
          color: rgb(255 255 255 / 0.5);
        }

        .projects-page-card-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(1.3rem, 1.6vw, 1.8rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: white;
          text-wrap: balance;
          margin-top: 0;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .projects-page-card-hook-display {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          color: rgb(255 255 255 / 0.85);
          font-weight: 500;
        }

        .projects-page-card-body {
          display: grid;
          align-content: center;
          justify-items: center;
          gap: 0.7rem;
          min-height: 0;
        }

        .projects-page-card-hook {
          font-size: clamp(0.75rem, 0.9vw, 0.85rem);
          line-height: 1.4;
          color: rgb(255 255 255 / 0.7);
          max-width: 28ch;
          margin-top: 0;
          margin-bottom: 0.6rem;
        }

        .projects-stats-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.8rem;
          width: 100%;
          margin-top: 0.5rem;
        }

        .projects-stats-grid--research {
          justify-content: center;
          gap: 2rem;
          margin-top: 1rem;
        }

        .projects-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.1rem;
        }

        .projects-stat-value {
          font-family: var(--font-sohne), var(--font-geist), sans-serif;
          font-size: clamp(1rem, 1.2vw, 1.3rem);
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .projects-stat-label {
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgb(255 255 255 / 0.45);
          text-transform: uppercase;
          line-height: 1.2;
        }

        .projects-page-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          min-height: 2.1rem;
          padding: 0.5rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.1);
          color: rgb(255 255 255 / 0.88);
          font-size: 0.86rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .projects-page-card-link:hover {
          transform: translateY(-1px);
          border-color: rgb(255 255 255 / 0.22);
          color: white;
        }

        /* ── Toggle bar ─────────────────────────────────── */
        .projects-toggle-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          margin-bottom: 0.75rem;
          padding: 0.25rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.08), rgb(255 255 255 / 0.03)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.06), transparent 58%);
          backdrop-filter: blur(18px) saturate(135%);
          width: fit-content;
          margin-inline: auto;
        }

        .projects-toggle-btn {
          padding: 0.38rem 1rem;
          border-radius: 999px;
          border: 1px solid transparent;
          background: transparent;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.5);
          transition: all 0.22s ease;
          cursor: pointer;
        }

        .projects-toggle-btn:hover {
          color: rgb(255 255 255 / 0.8);
          background: rgb(255 255 255 / 0.06);
        }

        .projects-toggle-btn-active {
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.18), rgb(255 255 255 / 0.08));
          border-color: rgb(255 255 255 / 0.2);
          color: white;
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 4px 12px rgb(0 0 0 / 0.1);
        }

        /* ── V2 card grid ───────────────────────────────── */
        .projects-page-grid-v2 {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: clamp(0.75rem, 1.2vw, 1.25rem);
          width: 100%;
          min-height: 0;
          contain: layout style;
        }

        .projects-marquee-viewport {
          height: calc(100vh - 92px);
          overflow-y: auto;
          position: relative;
          padding-right: 0.5rem;
          mask-image: linear-gradient(to bottom, black 95%, transparent);
        }

        /* Discreet but usable Scrollbar */
        .projects-marquee-viewport::-webkit-scrollbar {
          width: 10px;
        }

        .projects-marquee-viewport::-webkit-scrollbar-track {
          background: transparent;
        }

        .projects-marquee-viewport::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border: 3px solid transparent;
          background-clip: padding-box;
          border-radius: 999px;
        }

        .projects-marquee-viewport::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
          background-clip: padding-box;
        }

        .for-fun-page-shell {
          width: 100%;
          height: calc(100vh - 116px);
          min-height: calc(100vh - 116px);
          padding: 1.25rem;
          overflow: hidden;
        }

        .for-fun-page-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.3fr);
          gap: 1.25rem;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .for-fun-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          grid-template-rows: repeat(2, minmax(0, 1fr));
          gap: 1rem;
          width: 100%;
          height: 100%;
          min-height: 0;
        }

        .for-fun-terminal {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 0;
          min-height: 0;
        }

        .for-fun-terminal-inner {
          width: 100%;
          max-width: 34rem;
        }

        .for-fun-featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        @media (max-width: 1180px) {
          .for-fun-page-shell {
            overflow-y: auto;
          }

          .for-fun-page-layout {
            grid-template-columns: 1fr;
            height: auto;
          }

          .for-fun-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: none;
            height: auto;
          }

          .for-fun-terminal {
            min-height: 18rem;
          }
        }

        @media (max-width: 768px) {
          .for-fun-grid {
            grid-template-columns: 1fr;
          }

          .for-fun-featured-grid {
            grid-template-columns: 1fr;
          }
        }

        .projects-marquee-track {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 2rem;
          padding: 2rem;
        }





        .projects-v2-card-slot {
          min-height: 0;
          height: auto;
        }

        .projects-v2-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          height: auto;
          min-height: 0;
          padding: 2rem;
          border-radius: 2.5rem;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.12), transparent 40%);
          contain: layout style paint;
          gap: 1.25rem;
        }

        .projects-v2-card-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 0.7rem;
          flex: 0 0 auto;
        }

        .projects-v2-card-header-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          width: 100%;
        }


        .projects-v2-title-stack {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.65rem;
          min-width: 0;
        }

        .projects-v2-award-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 2rem;
          padding: 0.42rem 0.82rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.18);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.06)),
            radial-gradient(circle at 20% 0%, rgb(255 255 255 / 0.18), transparent 52%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 10px 24px rgb(0 0 0 / 0.16);
          color: rgb(255 255 255 / 0.9);
          font-size: clamp(0.68rem, 0.82vw, 0.82rem);
          font-weight: 760;
          letter-spacing: 0.11em;
          line-height: 1;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .projects-v2-modal-heading {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .projects-v2-award-badge-modal {
          min-height: 2.15rem;
          padding-inline: 0.95rem;
        }

        .projects-v2-card-header-row .projects-page-card-title {
          margin-bottom: 0;
          font-size: clamp(1.7rem, 2.25vw, 2.45rem);
          font-weight: 650;
          line-height: 1.02;
          letter-spacing: -0.045em;
        }

        .projects-v2-card-link-mini {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          border: 1px solid rgb(255 255 255 / 0.14);
          background: rgb(255 255 255 / 0.08);
          color: rgb(255 255 255 / 0.8);
          transition: all 0.2s ease;
        }

        .projects-v2-card-link-mini:hover {
          background: rgb(255 255 255 / 0.16);
          border-color: rgb(255 255 255 / 0.25);
          color: white;
          transform: translateY(-1px);
        }

        .projects-page-card-subtitle {
          font-size: clamp(0.98rem, 1.2vw, 1.18rem);
          font-weight: 450;
          color: rgb(255 255 255 / 0.76);
          line-height: 1.5;
          max-width: 58ch;
          margin: 0;
          text-wrap: balance;
        }

        .projects-page-card-subtitle strong {
          color: rgb(255 255 255 / 0.96);
          font-weight: 760;
        }

        .projects-stats-row-inline {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.35rem;
          margin-top: 0.25rem;
        }

        .projects-stat-item-mini {
          display: flex;
          align-items: baseline;
          gap: 0.38rem;
        }

        .projects-stat-value-mini {
          font-size: clamp(0.92rem, 1.05vw, 1.08rem);
          font-weight: 750;
          color: white;
          letter-spacing: -0.02em;
        }

        .projects-stat-label-mini {
          font-size: clamp(0.64rem, 0.7vw, 0.74rem);
          font-weight: 650;
          color: rgb(255 255 255 / 0.62);
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .projects-v2-card-visual {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.2rem;
          flex: 0 0 auto;
        }

        .projects-v2-card-visual-inner {
          position: relative;
          width: 100%;
          border-radius: 1.25rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          background: rgb(0 0 0 / 0.2);
          overflow: hidden;
          box-shadow: 
            0 8px 24px rgb(0 0 0 / 0.15),
            inset 0 1px 0 rgb(255 255 255 / 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .projects-v2-card-img {
          width: 100%;
          height: auto;
          max-width: none;
          max-height: none;
          object-fit: cover;
          display: block;
        }

        .projects-v2-card-img-wash {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, transparent 70%, rgb(9 11 20 / 0.2) 100%);
          pointer-events: none;
        }

        .contact-page-shell {
          flex: 1;
          min-height: 0;
          height: 100%;
          width: min(100%, 98rem);
          margin-inline: auto;
          display: grid;
          grid-template-columns: minmax(0, 0.4fr) minmax(0, 0.6fr);
          gap: clamp(1.2rem, 2vw, 2rem);
          align-items: stretch;
        }

        .contact-page-visual-column,
        .contact-page-panel-column {
          min-height: 0;
          display: grid;
          align-items: center;
        }

        .contact-photo-shell {
          display: grid;
          place-items: center;
          min-height: 0;
          height: 100%;
          padding: clamp(1rem, 2vw, 1.5rem);
        }

        .contact-photo-frame {
          position: relative;
          display: grid;
          place-items: center;
          width: min(100%, 30rem);
          height: min(100%, 36rem);
          border-radius: 3rem;
          overflow: hidden;
          isolation: isolate;
        }

        .contact-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-radius: 3rem;
          filter: saturate(1.03) contrast(1.02);
          mask-image: radial-gradient(circle at center, black 45%, rgb(0 0 0 / 0.94) 68%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, black 45%, rgb(0 0 0 / 0.94) 68%, transparent 100%);
        }

        .contact-photo-wash {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            radial-gradient(circle at center, transparent 42%, rgb(255 255 255 / 0.06) 68%, transparent 100%),
            linear-gradient(
              to bottom,
              rgb(255 255 255 / 0.05) 0%,
              transparent 18%,
              transparent 82%,
              rgb(9 11 20 / 0.16) 100%
            ),
            linear-gradient(
              to right,
              rgb(255 255 255 / 0.04) 0%,
              transparent 16%,
              transparent 84%,
              rgb(9 11 20 / 0.14) 100%
            );
          filter: blur(20px);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .contact-panel {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr);
          gap: 1.4rem;
          min-height: 0;
          height: 100%;
          padding: clamp(1.25rem, 1.7vw, 1.65rem);
          border-radius: 2.2rem;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(240 244 255 / 0.16), transparent 38%);
        }

        .contact-panel-header {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 0.75rem;
        }

        .contact-panel-kicker {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          min-height: 2rem;
          padding: 0.45rem 0.8rem;
          border-radius: 999px;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.05)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.08), transparent 58%);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.74);
          backdrop-filter: blur(16px);
        }

        .contact-panel-title {
          font-family: "Clash Display", "Satoshi", var(--font-display-google), "Plus Jakarta Sans", "Space Grotesk", "SF Pro Display", "Segoe UI", sans-serif !important;
          font-size: clamp(2rem, 2.6vw, 3rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          color: white;
          text-wrap: balance;
        }

        .contact-panel-copy {
          max-width: 58ch;
          font-size: clamp(0.98rem, 1vw, 1.08rem);
          line-height: 1.7;
          color: rgb(255 255 255 / 0.74);
        }

        .contact-button-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: clamp(0.85rem, 1vw, 1.25rem);
          align-content: center;
          min-height: 0;
        }

        .contact-button-tile:nth-child(-n+3) {
          grid-column: span 4;
        }
        .contact-button-tile:nth-child(n+4) {
          grid-column: span 3;
        }

        .contact-button-tile {
          position: relative;
          z-index: 1;
          display: grid;
          justify-items: center;
          align-content: center;
          gap: 0.8rem;
          min-height: 0;
          padding: clamp(0.85rem, 1.2vw, 1.05rem);
          border-radius: 1.5rem;
          border: 1px solid rgb(255 255 255 / 0.12);
          background:
            linear-gradient(180deg, rgb(255 255 255 / 0.14), rgb(255 255 255 / 0.04)),
            radial-gradient(circle at top left, rgb(255 255 255 / 0.1), transparent 58%);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.16),
            0 14px 28px rgb(0 0 0 / 0.08);
          backdrop-filter: blur(18px);
          transition:
            transform 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .contact-button-tile:hover {
          transform: translateY(-2px) scale(1.01);
          border-color: rgb(255 255 255 / 0.22);
          box-shadow:
            inset 0 1px 0 rgb(255 255 255 / 0.18),
            0 20px 32px rgb(0 0 0 / 0.1);
        }

        .contact-button-image-shell {
          display: grid;
          place-items: center;
          width: clamp(3.7rem, 5vw, 4.8rem);
          aspect-ratio: 1;
          border-radius: 1.2rem;
          background: transparent;
          border: none;
          overflow: hidden;
        }

        .contact-button-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.2rem;
          background: transparent;
          filter: drop-shadow(0 10px 18px rgb(0 0 0 / 0.12));
        }

        .contact-button-label {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgb(255 255 255 / 0.8);
          text-align: center;
        }

        @media (max-width: 767px) {
          .nav-links {
            display: none;
          }

          .nav-palette-controls {
            display: none;
          }

          .nav-mobile-palettes {
            display: grid;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-copy-column {
            padding-left: 0;
          }

          .hero-title {
            font-size: clamp(4.4rem, 15vw, 6.5rem);
          }

          .hero-subtext {
            font-size: clamp(1.05rem, 4.2vw, 1.25rem);
          }

          .hero-portrait-shell {
            width: min(78vw, 24rem);
            min-width: auto;
          }

          .hero-portrait-mask {
            height: min(48vh, 28rem);
          }

          .inst-grid-shell {
            height: auto;
            max-height: none;
            gap: 1.25rem;
          }

          .inst-grid-top,
          .inst-grid-bottom {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .inst-card {
            flex-direction: column;
            padding: 1.5rem;
            gap: 1.5rem;
            height: auto;
          }

          .inst-card-panel {
            flex: 0 0 auto;
            width: 100%;
          }

          .inst-card-title {
            font-size: 2rem;
          }

          .inst-card-description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
          }

          .research-editorial-panel,
          .research-modal-grid,
          .research-detail-grid,
          .research-detail-grid--chamtern,
          .research-detail-grid--neuro,
          .research-detail-grid--phytovision,
          .research-detail-grid--sentinel {
            grid-template-columns: 1fr;
          }

          .research-card-grid {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            height: auto;
          }


          .research-card {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
          }

          .research-card-image-wrap,
          .research-card-body {
            grid-column: 1;
          }

          .research-card-image-wrap {
            grid-row: 1;
          }

          .research-card-body {
            grid-row: 2;
          }

          .research-modal {
            padding: 1rem;
          }

          .research-detail-visual {
            min-height: 16rem;
          }

          .research-modal-backdrop {
            padding: 1rem;
          }

          .pillars-container {
            flex-direction: column;
            gap: 1.25rem;
            margin-top: 1rem;
            padding: 0.5rem 0;
            max-height: none;
          }

          .pillar-wrap {
            width: 100%;
            max-width: 100%;
            align-items: center;
          }

          .pillar-wrap:hover {
            transform: translateY(-6px);
          }

          .pillar-wrap-left .pillar,
          .pillar-wrap-right .pillar,
          .pillar-wrap-center .pillar {
            height: auto;
            min-height: 14rem;
            margin-top: 0;
            padding: 1.5rem;
          }

          .pillar-image-wrap {
            height: min(100%, clamp(10.75rem, 40vw, 16rem));
          }

          .projects-page-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, minmax(0, 1fr));
          }

          .projects-page-grid-v2 {
            grid-template-columns: 1fr;
            grid-template-rows: none;
            height: auto;
          }

          .projects-v2-card-visual {
            max-height: 12rem;
          }

          .contact-page-shell {
            grid-template-columns: 1fr;
            grid-template-rows: auto minmax(0, 1fr);
            gap: 1rem;
          }

          .contact-photo-shell {
            padding: 0.25rem 0 0;
            height: auto;
          }

          .contact-photo-frame {
            width: min(78vw, 19rem);
            height: min(36vh, 19rem);
          }

          .contact-panel {
            padding: 1rem;
          }

          .contact-button-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }

        }

        @media (min-width: 768px) and (max-width: 1180px) {
          .projects-page-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows: repeat(3, minmax(0, 1fr));
          }

          .contact-page-shell {
            grid-template-columns: minmax(0, 0.42fr) minmax(0, 0.58fr);
          }

          .contact-button-grid {
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  )
}
