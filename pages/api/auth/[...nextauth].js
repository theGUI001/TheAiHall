import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
const sqlite3 = require('sqlite3')
import bcrypt from 'bcrypt'

export const authOptions = {
    // Configure authentication providers
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials

                // Connect to db
                let db = new sqlite3.Database('aihall.db')

                // Create new promisse
                const result = await new Promise((resolve, reject) => {
                    // Select provided user and return as promisse response
                    db.get("SELECT * FROM users WHERE username=?", [email], (err, row) => {
                        if (err) reject(err)
                        else resolve(row)
                    })
                })
                // CLose db connection
                db.close()

                // Verifies if user is valid
                if (!result) {
                    throw new Error('Invalid Credentials')
                }
                // Verifies if password is correct
                if (email == result.username && bcrypt.compare(password, result.password)) {
                    return { id: result.id, user: result.username }
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
        error: '/api/errors'
    },
    session: {
        strategy: 'jwt'
    }

}

export default NextAuth(authOptions)