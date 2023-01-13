"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { redirect } from "next/dist/server/api-utils"

export default function Page() {
    const session = useSession()

    const [imageInfo, setImageInfo] = useState({ author: "", prompt: "", ai: "" });
    const [file, setFile] = useState(null)

    function handleChange(e) {
        setFile(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (imageInfo.author != "" && imageInfo.prompt != "" && imageInfo.ai != "" && file != null) {
            let { author, prompt, ai } = imageInfo
            let imageName = `${new Date().valueOf()}_${file.name}`
            let payload = new FormData()

            payload.append('file', file)
            payload.append('name', imageName)
            payload.append('author', author)
            payload.append('prompt', prompt)
            payload.append('ai', ai)

            const upload = await fetch('/api/upload', {
                method: 'POST',
                body: payload
            })
            let uploadRes = upload.json()
            if (uploadRes.message == "uploaded") {
                redirect('/')
            } else {
                alert("An error occurred while uploading, please try again later")
            }



        } else {
            window.alert("Please fill in all fields before uploading")
        }
    }


    if (session) {
        return (
            <div className="h-screen flex items-center justify-center">
                <form className="bg-gray-900 rounded-xl flex flex-col w-4/5 px-6 py-6" onSubmit={handleSubmit}>
                    <h1 className="text-center text-white font-semibold text-2xl">Upload an Image</h1>
                    <span className="text-gray-300">Who is the author of the prompt?</span>
                    <input
                        type="text"
                        placeholder="Discord Nick"
                        onChange={({ target }) => setImageInfo({ ...imageInfo, author: target.value })}
                        required
                        autoFocus
                        name="author"
                    >
                    </input>
                    <span className="text-gray-300">What was the prompt?</span>
                    <input
                        type="text"
                        placeholder="Prompt"
                        onChange={({ target }) => setImageInfo({ ...imageInfo, prompt: target.value })}
                        required
                        name="prompt"
                    >
                    </input>
                    <span className="text-gray-300">Which AI generated the image?</span>
                    <input
                        type="text"
                        placeholder="Midjourney, DALL-E, etc."
                        onChange={({ target }) => setImageInfo({ ...imageInfo, ai: target.value })}
                        required
                        name="ai"
                    >
                    </input>
                    <span className="text-gray-300">Choose your image</span>
                    <input
                        type="file"
                        className="text-gray-300"
                        onChange={handleChange}
                        required
                        name="file"
                    >
                    </input>
                    <button
                        type="submit"
                        className="text-white mt-4 self-end bg-sky-500 rounded-xl w-32 leading-9"
                    > Upload</button>
                </form>
            </div >
        )
    }
    return (
        <div>
            <Link href="/auth/signin">Sign in</Link>
        </div>
    )
}