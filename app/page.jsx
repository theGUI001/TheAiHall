import styles from './home.module.css'
import Post from "../Components/Post"
import Link from 'next/link'

async function getData() {
  const src = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/posts`, { next: { revalidate: 2 } })
  return src.json()
}

export default async function Home() {
  const posts = await getData()

  return (
    <main>
      <div id={styles.plotarea} className="mx-2 my-4 justify-items-center">
        {posts.map((post) => (
          <Link href={`/post/${post.id}#uPost`} key={post.id}>
            <Post image={post.url} author={post.author} prompt={post.prompt} />
          </Link>
        )
        )}
      </div >
    </main>
  )
}
