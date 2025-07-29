/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="gsap/types" />

declare module '*.svg?react' {
  const content: React.FC<React.SVGProps<SVGElement>>
  export default content
}

declare module '*.jpg'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}