"use client"
import { signIn } from "next-auth/react"
import Button from "../Elements/Button"
import TextBox from "../Elements/TextBox"
import { useState } from "react"

export default function SignInComponent({ providers }) {

    const [userInfo, setUserInfo] = useState({ email: "", password: "" })

    async function onSubmit(e) {
        e.preventDefault()

        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            callbackUrl: "http://localhost:3000/upload"
        })
        console.log(res)
    }

    return (
        <div className="flex justify-center items-center  h-screen ">
            <div className="px-7 py-6 shadow w-4/5 bg-gray-900 rounded-md flex flex-col gap-2 md:w-2/5">
                <h1 className="text-center text-zinc-50 text-2xl mb-2">Log in</h1>
                <TextBox
                    labelText="َUser"
                    onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
                />
                <TextBox
                    labelText="Password"
                    type={"password"}
                    onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
                />
                <Button onClick={onSubmit}>Login</Button>

                {/* {Object.values(providers).map((provider) => (<div key={provider.name}>
                    <Button onClick={() => signIn(provider.id, {
                        callbackUrl: process.env.VERCEL_URL || "http://localhost:3000/"
                    })} className="text-center w-full">Sign in with {provider.name}</Button>
                </div>))} */}
            </div>
        </div>
    )
}