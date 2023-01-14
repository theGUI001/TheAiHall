"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
    const session = useSession()
    const router = useRouter()

    const [imageInfo, setImageInfo] = useState({ author: "", prompt: "", ai: "" });
    const [file, setFile] = useState(null)

    function handleChange(e) {
        setFile(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault()
        // Checks that all fields are filled in
        if (imageInfo.author != "" && imageInfo.prompt != "" && imageInfo.ai != "" && file != null) {

            if (imageInfo.author.includes('"') || imageInfo.prompt.includes('"') || imageInfo.ai.includes('"')) {
                window.alert('Please do not use (") character ')
                return
            }

            let { author, prompt, ai } = imageInfo
            //Sets an unique file name in OCI
            let imageName = `${new Date().valueOf()}_${file.name}`
            let payload = new FormData()

            // Appends image and form data to payload
            payload.append('file', file)
            payload.append('name', imageName)
            payload.append('author', author)
            payload.append('prompt', prompt)
            payload.append('ai', ai)

            // Sends data to API route 
            const upload = await fetch('/api/upload', {
                method: 'POST',
                body: payload
            })
            let uploadRes = await upload.json()

            // Verifies if post was submitted correctly
            if (uploadRes.message == "uploaded") {
                // Redirect if sucess
                router.push("/")
            } else {
                // Alerts if there are errors
                alert("An error occurred while uploading, please try again later and check that all fields are filled in correctly")
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
                        className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-3"
                        name="author"
                    >
                    </input>
                    <span className="text-gray-300">What was the prompt?</span>
                    <input
                        type="text"
                        placeholder="Prompt"
                        onChange={({ target }) => setImageInfo({ ...imageInfo, prompt: target.value })}
                        required
                        className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-3"
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
                        className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white mb-3"
                    >
                    </input>
                    <span className="text-gray-300">Choose your image</span>
                    <input
                        type="file"
                        className="text-sm text-grey-500 rounded-lg text-gray-400 placeholder-gray-400 focus:outline-none
                        file:mr-5 file:py-2 file:px-6 bg-gray-700
                        file:rounded-lg file:border-0
                        file:text-sm file:font-medium
                        file:bg-gray-600 file:text-white
                        hover:file:cursor-pointer hover:file:bg-gray-500 mb-3"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleChange}
                        required
                        name="file"
                    >
                    </input>
                    <button
                        type="submit"
                        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
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