'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BACKGROUND_IMAGE_PATH } from '@/config/background'

interface BackgroundImageProps {
  withBlur?: boolean
  withOverlay?: boolean
}

export default function BackgroundImage({
  withBlur = false,
  withOverlay = false,
}: BackgroundImageProps = {}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = BACKGROUND_IMAGE_PATH

    img.onload = () => {
      setIsLoaded(true)
    }

    // Check if image is already cached
    if (img.complete) {
      setIsLoaded(true)
    }
  }, [])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null
  }

  const isLight = resolvedTheme === 'light'

  return (
    <>
      {/* Background Image */}
      <div
        className={`fixed inset-0 transition-all duration-1000 ease-in-out print:hidden ${
          withBlur ? 'blur-sm' : ''
        }`}
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE_PATH})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          opacity: isLoaded ? (isLight ? 0.15 : 1) : 0,
          zIndex: withOverlay ? -2 : -1,
        }}
      />

      {/* Theme-aware Overlay */}
      {withOverlay && (
        <div
          className="fixed inset-0 print:hidden transition-all duration-1000"
          style={{
            zIndex: -1,
            backgroundColor: isLight
              ? 'rgba(255, 255, 255, 0.85)'
              : 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}
    </>
  )
}
