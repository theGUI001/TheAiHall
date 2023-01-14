import './globals.css'
import { Roboto } from '@next/font/google'
import Link from 'next/link'
import NavBar from '../Components/Navbar'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>

      <head />

      <body className='bg-gray-800'>

        <NavBar className="absolute top-0 right-0 left-0" />
        <main>{children}</main>
        <footer className="p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-900 bottom-0 left-0 right-0" id='footer'>
          <span className="text-sm sm:text-center text-gray-400">
            <Link href="/">The AI Hall</Link>. Made as CS50 2023 final project.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
            <li>
              <Link href="/api/auth/signout" className="mr-4 hover:underline md:mr-6 ">Logout</Link>
            </li>
          </ul>
        </footer>

      </body>
    </html>
  )
}
