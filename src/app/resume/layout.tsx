import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download Resume',
  description: 'Print my latest resume in PDF',
  openGraph: {
    title: 'Download Resume',
    description: 'Print my latest resume in PDF',
    type: 'website',
    url: 'https://ismail.kattakath.com/resume',
  },
  twitter: {
    card: 'summary',
    title: 'Download Resume',
    description: 'Print my latest resume in PDF',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
