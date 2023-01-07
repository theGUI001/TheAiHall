"use client"
import { SessionProvider } from 'next-auth/react'
export default function Template({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}