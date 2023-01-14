const sqlite3 = require('sqlite3').verbose()
import formidable from 'formidable'
import bcrypt from 'bcrypt'


export const config = {
    api: {
        bodyParser: false
    },
}

export default function Register(req, res) {
    // Verify if method is POST
    if (req.method != "POST") {

        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    else {
        // Parse POST body with formidable
        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {

            // Log and return if error
            if (err) {
                console.error(err)
                return res.status(500).json({ message: 'Error while parsing form data' })
            }

            // Sets username and encrypt password
            const username = fields.username
            const password = await bcrypt.hash(fields.pswd, 10)

            // Verifies if user already exists
            let db = new sqlite3.Database('aihall.db')
            db.all(`SELECT id FROM users WHERE username=?`, [username], (err, rows) => {
                if (err) {
                    throw err
                }

                db.close()

                const len = rows.length
                if (len >= 1) {
                    return res.status(400).json({ message: 'User already exists' })
                }

                // Insert user into db
                db.all(`INSERT INTO users (username, password) VALUES (?,?)`, [username, password], (err, rows) => {
                    if (err) {
                        throw err
                    }
                    res.status(200).json({ message: "Success" })
                })

            })
        })
    }
}