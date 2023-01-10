'use client'
import { Raleway } from "@next/font/google"
import { useState, useEffect } from "react"
import {
    Navbar,
    MobileNav,
    Typography,
    IconButton,
} from "@material-tailwind/react"
import Link from "next/link"

const raleway = Raleway({
    weight: '900',
    subsets: ['latin'],
})


export default function NavBar() {
    const [openNav, setOpenNav] = useState(false)

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        )
    }, [])

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center md:gap-4">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal text-gray-400"
            >
                <Link href="/" className="flex items-center">
                    Home
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal text-gray-400"
            >
                <Link href="/upload" className="flex items-center">
                    Upload
                </Link>
            </Typography>
        </ul>
    )

    return (
        <Navbar id="navbar" className="mx-auto py-1 px-2 lg:px-8 lg:py-4 bg-gray-900 border-none" >
            <div className="container mx-auto flex items-center justify-between text-gray-400">
                <Typography
                    as="a"
                    href="/"
                    variant="small"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    <span className={raleway.className}>The AI Hall</span>
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={openNav}>
                {navList}
            </MobileNav>
        </Navbar >
    )
}