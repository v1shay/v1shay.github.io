# ShaderGradient Setup Notes

## Runtime
- This project uses a local user-space Node runtime because Homebrew was not available without admin access.
- Local Node path: `.tooling/node-v24.14.0-darwin-arm64/bin`
- Local pnpm path: `.tooling/pnpm-home/bin`

## Core install commands
```bash
PATH=$PWD/.tooling/node-v24.14.0-darwin-arm64/bin:$PWD/.tooling/pnpm-home/bin:$PATH pnpm install
PATH=$PWD/.tooling/node-v24.14.0-darwin-arm64/bin:$PWD/.tooling/pnpm-home/bin:$PATH pnpm dev
```

## Shortcut wrapper
```bash
./pnpm-local install
./pnpm-local dev
./pnpm-local build
```

## ShaderGradient packages
- `@shadergradient/react`
- `three`
- `@react-three/fiber`
- `three-stdlib`
- `camera-controls`

## Integration strategy
- The site-wide background lives in `src/components/shader-background.tsx`.
- The shader preset lives in `src/lib/shader-config.ts`.
- The root layout mounts the shader once, behind all page content.
- Foreground content sits above a readable scrim so the background can stay animated without overpowering text.

## Current fallback behavior
- The shader only renders on the client.
- A soft gradient fallback is shown while loading.
- If the shader crashes during rendering, the app keeps the fallback background instead of failing the whole page.
