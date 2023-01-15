const sqlite3 = require('sqlite3').verbose()
import DetailsPost from "../../../Components/DetailsPost"

export const revalidate = 2

async function getData(id) {
    // Connect to db
    let db = new sqlite3.Database('aihall.db')
    // Create new promisse
    const data = new Promise((resolve, reject) => {
        // Select posts in db
        db.all(`SELECT * FROM content WHERE ID=?`, [id], (err, rows) => {
            if (err) reject(err)
            else resolve(rows.pop())
        })
    })
    // Closes db connection
    db.close()
    return await data
}

export default async function Page({ params }) {

    const data = await getData(params.postID)
    return <DetailsPost data={data} />

}