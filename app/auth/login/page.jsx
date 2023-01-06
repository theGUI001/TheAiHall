"use client"
import Button from "../../../Components/Elements/Button"
import TextBox from "../../../Components/Elements/TextBox"
import { useRef } from "react"

export default function LoginPage() {

    const userName = useRef("");
    const pass = useRef("");

    async function onSubmit() {
        return null
    }

    return (
        <div className="flex justify-center items-center  h-screen ">
            <div className="px-7 py-6 shadow w-4/5 bg-gray-900 rounded-md flex flex-col gap-2 md:w-2/5">
                <TextBox
                    lableText="َUser"
                    onChange={(e) => (userName.current = e.target.value)}
                />
                <TextBox
                    lableText="Password"
                    type={"password"}
                    onChange={(e) => (pass.current = e.target.value)}
                />
                <Button onClick={onSubmit}>Login</Button>
            </div>
        </div>
    )
}