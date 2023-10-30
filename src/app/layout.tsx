import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { MyReactQueryProvider } from '@/MyReactQueryProvider'
import Header from '@/components/home/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'test-task',
  description: 'test task for EtaCar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <MyReactQueryProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </MyReactQueryProvider>
    </html>
  )
}
