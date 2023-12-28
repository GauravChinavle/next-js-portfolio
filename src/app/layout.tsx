import type { Metadata } from 'next'
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
      <head>
        <meta  charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Portfolio</title>
      </head>
      <body className={inter.className}>
      <React.StrictMode>

        <Navbar/>
        {children}
        </React.StrictMode>

      </body>
    </html>
  )
}
