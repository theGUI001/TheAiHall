import styles from './home.module.css'
import Post from "../Components/Post"
import Link from 'next/link'
import { Suspense } from 'react'
const sqlite3 = require('sqlite3').verbose()

export const revalidate = 2

async function getData() {
  // Connect to db
  let db = new sqlite3.Database('aihall.db')
  // Create new promisse
  const data = new Promise((resolve, reject) => {
    // Select posts in db
    db.all('SELECT * FROM content order by id DESC', [], (err, rows) => {
      if (err) reject(err)
      else resolve(rows)
    })
  })
  // Closes db connection
  db.close()
  return await data

}

export default async function Home() {
  const posts = await getData()

  return (
    <main>
      <div id={styles.plotarea} className="mx-2 my-4 justify-items-center">
        <Suspense fallback={"Loading..."}>
          {posts.map((post) => (
            <Link href={`/post/${post.id}`} key={post.id}>
              <Post image={post.url} author={post.author} prompt={post.prompt} />
            </Link>
          )
          )}
        </Suspense>
      </div >
    </main>
  )
}
