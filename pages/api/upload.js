import axios from 'axios'
import formidable from 'formidable'
const fs = require('fs');

export const config = {
    api: {
        bodyParser: false
    },
}

export default async function Upload(req, res) {
    if (req.method != "POST") {

        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    else {

        const form = new formidable.IncomingForm()
        form.parse(req, async (err, fields, files) => {

            if (err) {
                console.error(err)
                res.status(500).json({ message: 'Error while parsing form data' })
                return
            }

            const data = { filename: fields.name, author: fields.author, prompt: fields.prompt, ai: fields.ai }
            const file = fs.readFileSync(files.file.filepath)
            const date = new Date().toUTCString()

            const config = {
                headers: {
                    'date': date,
                    'Content-Type': files.file.mimetype
                }
            }

            axios.put(`https://objectstorage.sa-saopaulo-1.oraclecloud.com/p/QQT1bGO1KbQ_c0B2SEGE9_LgPGktkgPkq_0Deyeh7nvxG4xrdhjY3Dgx_Kp8DNv2/n/gr76az1mgnha/b/bucket-aihall/o/${data.filename}`, file, config)
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });

        })
        res.status(200).json({ message: 'dev' })


        //! // Insert data to SQLite DB
        //! const db = new sqlite3.Database('/aihall.db');
        //! const query = `INSERT INTO content (id,author, prompt, ia_name) values (${id}, ${author}, ${prompt}, ${ai})`
        //! db.run(query)
    }
}
