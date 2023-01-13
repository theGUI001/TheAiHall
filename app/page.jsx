import styles from './home.module.css'
import Post from "../Components/Post"

export default async function Home() {

  const src = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/posts`)
  const posts = await src.json()

  return (
    <div id={styles.plotarea} className="mx-2 my-4 justify-items-center">
      {posts.map((post, key) => (
        <Post image={post.url} author={post.author} prompt={post.prompt} key={key} />
      )
      )}
    </div >
  )
}
