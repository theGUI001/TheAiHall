const sqlite3 = require('sqlite3').verbose()

export default function Posts(req, res) {
    let db = new sqlite3.Database('aihall.db')
    db.all('SELECT * FROM content', [], (err, rows) => {
        if (err) {
            throw err;
        }
        data = rows
        db.close()
        return res.status(200).json(rows)
    })
}