const sqlite3 = require('sqlite3').verbose()

export default function Posts(req, res) {
    let postID = parseInt(req.query.postID)
    let db = new sqlite3.Database('aihall.db')
    db.all(`SELECT * FROM content WHERE ID=${postID}`, [], (err, rows) => {
        if (err) {
            throw err;
        }
        db.close()
        return res.status(200).json(rows.pop())
    })
}