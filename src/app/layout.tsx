import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import { MyReactQueryProvider } from '@/MyReactQueryProvider'
import Header from '@/components/home/header'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'test-task',
  description: 'test task for EtaCar',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <MyReactQueryProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </MyReactQueryProvider>
    </html>
  )
}
