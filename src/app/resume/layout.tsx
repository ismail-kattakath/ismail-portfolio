import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ATS Resume Builder | Ismail Kattakath',
  description: 'Create ATS-optimized resumes with our professional resume builder',
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      position: 'relative',
      zIndex: 1,
      color: '#000000',
      fontFamily: 'sans-serif',
    }}>
      {children}
    </div>
  )
}
