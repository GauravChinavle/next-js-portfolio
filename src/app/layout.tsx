import type { Metadata } from 'next'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import React from 'react';
import Navbar from "@/components/Navbar";
import './globals.css'
import './mediaqueries.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta  charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Portfolio</title>
      </Head>
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
