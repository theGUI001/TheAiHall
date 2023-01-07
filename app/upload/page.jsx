"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"


export default function Page() {
    const session = useSession()

    if (session) {
        return <h1>Upload Page</h1>
    }
    return (
        <div>
            <Link href="/auth/signin">Sign in</Link>
        </div>
    )
}