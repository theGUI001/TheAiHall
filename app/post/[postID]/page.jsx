import DetailsPost from "../../../Components/DetailsPost"

async function getData(id) {
    const src = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/post/${id}`, { cache: "force-cache" })
    const res = await src.json()
    return res
}

export default async function Page({ params }) {

    const data = await getData(params.postID)

    return <DetailsPost data={data} />

}