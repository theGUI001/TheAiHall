import axios from 'axios'
import formidable from 'formidable'
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

export const config = {
    api: {
        bodyParser: false
    },
}

export default async function Upload(req, res) {
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

            // Puts all input values into an object and reads binaries from the image
            const data = { filename: fields.name, author: fields.author, prompt: fields.prompt, ai: fields.ai }
            const file = fs.readFileSync(files.file.filepath)
            const date = new Date().toUTCString()
            // Sets headers for send image to OCI bucket
            const config = {
                headers: {
                    'date': date,
                    'Content-Type': files.file.mimetype
                }
            }

            if (!files.file.mimetype.startsWith('image/')) {
                return res.status(400).json({ message: 'Invalid Image' })
            }

            // Sends the image to OCI
            let response = await axios.put(`https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/${process.env.AUTH_OCI}/n/gr76az1mgnha/b/bucket-aihall/o/${data.filename}`, file, config)

            if (response.status != 200) {
                return res.status(400).json({ message: 'ERROR UPLOADING IMAGE' })
            }

            // Inserts data to DB
            const db = new sqlite3.Database('aihall.db')
            const query = `INSERT INTO content (author, url, prompt, ia_name) VALUES ("${data.author}", "${data.filename}", "${data.prompt}", "${data.ai}")`
            db.run(query, function (err) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ message: err })

                } else {
                    db.close()
                    return res.status(200).json({ message: 'uploaded' })
                }
            })
        })
    }
}
