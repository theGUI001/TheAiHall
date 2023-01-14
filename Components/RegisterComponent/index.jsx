"use client"
import Button from "../Elements/Button"
import TextBox from "../Elements/TextBox"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterComponent() {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({ email: "", password: "" })

    async function handleSubmit(e) {
        e.preventDefault()
        // Sets new payload
        const payload = new FormData()
        // Append to payload user and password values
        payload.append('username', userInfo.email)
        payload.append('pswd', userInfo.password)
        // Send payload to API route
        const register = await fetch('/api/register', {
            method: 'POST',
            body: payload
        })
        // Verifies if user was created
        let res = await register.json()
        if (res.message == "Success") {
            router.push('/auth/signin')
        } else {
            window.alert("This username already exists, try another one")
        }
    }

    return (
        <div className="flex justify-center items-center  h-screen ">
            <div className="px-7 py-6 shadow w-4/5 bg-gray-900 rounded-md flex flex-col gap-2 md:w-2/5">
                <h1 className="text-center text-zinc-50 text-2xl mb-2">Sign Up</h1>

                <TextBox
                    labelText="َUser"
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                />
                <TextBox
                    labelText="Password"
                    type={"password"}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                />
                <Button onClick={handleSubmit}>Sign up</Button>
            </div>
        </div>
    )
}