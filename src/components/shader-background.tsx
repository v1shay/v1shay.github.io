"use client"

import type { ComponentProps, ReactNode } from "react"
import { Component } from "react"
import { createContext, useContext, useMemo, useState } from "react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"

import { shaderGradientConfig } from "@/lib/shader-config"

type ShaderGradientProps = ComponentProps<typeof ShaderGradient> & {
  axesHelper?: string
  destination?: string
  embedMode?: string
  format?: string
  frameRate?: number
  gizmoHelper?: string
}

class ShaderErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

const shaderColorCycles = [
  {
    key: "color1",
    label: "Tone 1",
    values: [
      "#f0f4ff",
      "#bfe1ff",
      "#98fff1",
      "#bbf7a7",
      "#ffe08a",
      "#ffb37a",
      "#ff7ea7",
      "#b98cff",
      "#7f223d",
    ] as const,
  },
  {
    key: "color2",
    label: "Tone 2",
    values: [
      "#dbba95",
      "#ffd0b5",
      "#ff9f7a",
      "#ff6b6b",
      "#ff5fa2",
      "#d76dff",
      "#7f7cff",
      "#56b6ff",
      "#64182f",
    ] as const,
  },
  {
    key: "color3",
    label: "Tone 3",
    values: [
      "#e1cdb2",
      "#fff1db",
      "#f8ffae",
      "#aaf8b8",
      "#78f0ff",
      "#7ec8ff",
      "#8fa3ff",
      "#c591ff",
      "#4c1021",
    ] as const,
  },
] as const

type ShaderColorKey = (typeof shaderColorCycles)[number]["key"]

type ShaderPaletteContextValue = {
  controls: Array<{
    key: ShaderColorKey
    label: string
    swatch: string
    step: number
  }>
  cycleColor: (key: ShaderColorKey) => void
  isPaused: boolean
  setPaused: (paused: boolean) => void
}

const ShaderPaletteContext = createContext<ShaderPaletteContextValue | null>(null)

export function ShaderPaletteProvider({ children }: { children: ReactNode }) {
  const [colorSteps, setColorSteps] = useState<Record<ShaderColorKey, number>>({
    color1: 0,
    color2: 0,
    color3: 0,
  })
  const [isPaused, setIsPaused] = useState(false)

  const contextValue = useMemo<ShaderPaletteContextValue>(
    (): ShaderPaletteContextValue => ({
      isPaused,
      setPaused: setIsPaused,
      controls: shaderColorCycles.map((entry) => ({
        key: entry.key,
        label: entry.label,
        swatch: entry.values[colorSteps[entry.key]],
        step: colorSteps[entry.key],
      })),
      cycleColor: (key: ShaderColorKey) =>
        setColorSteps((current) => {
          const cycle = shaderColorCycles.find((entry) => entry.key === key)

          if (!cycle) return current

          return {
            ...current,
            [key]: (current[key] + 1) % cycle.values.length,
          }
        }),
    }),
    [colorSteps, isPaused]
  )

  return <ShaderPaletteContext.Provider value={contextValue}>{children}</ShaderPaletteContext.Provider>
}

export function useShaderPalette() {
  const context = useContext(ShaderPaletteContext)

  if (!context) {
    throw new Error("useShaderPalette must be used inside ShaderPaletteProvider")
  }

  return context
}

function ShaderScene({ colorSteps, isPaused }: { colorSteps: Record<ShaderColorKey, number>, isPaused: boolean }) {
  const paletteConfig = useMemo(
    () => ({
      ...shaderGradientConfig,
      animate: isPaused ? "off" : "on",
      color1: shaderColorCycles[0].values[colorSteps.color1],
      color2: shaderColorCycles[1].values[colorSteps.color2],
      color3: shaderColorCycles[2].values[colorSteps.color3],
    }),
    [colorSteps, isPaused]
  )

  return (
    <div className="fixed inset-0 z-0" style={{ transform: 'translateZ(0)', willChange: 'auto' }}>
      <ShaderGradientCanvas
        pointerEvents="none"
        pixelDensity={0.75}
        fov={45}
        style={{ width: "100%", height: "100%", transform: 'translateZ(0)' }}
      >
        <ShaderGradient
          {...(paletteConfig as unknown as ShaderGradientProps)}
        />
      </ShaderGradientCanvas>
    </div>
  )
}

export function ShaderBackground() {
  const { controls, isPaused } = useShaderPalette()

  const colorSteps = useMemo<Record<ShaderColorKey, number>>(
    () => ({
      color1: controls.find((entry) => entry.key === "color1")?.step ?? 0,
      color2: controls.find((entry) => entry.key === "color2")?.step ?? 0,
      color3: controls.find((entry) => entry.key === "color3")?.step ?? 0,
    }),
    [controls]
  )

  return (
    <ShaderErrorBoundary fallback={<div className="shader-fallback" aria-hidden="true" />}>
      <ShaderScene colorSteps={colorSteps} isPaused={isPaused} />
    </ShaderErrorBoundary>
  )
}
