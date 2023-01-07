import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    // Configure authentication providers
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            authorize(credentials) {
                const { email, password } = credentials

                if (email !== process.env.UP_USER || password !== process.env.UP_PASSWORD) {
                    throw new Error('Invalid Credentials')
                }

                return { id: '1', name: 'Upload Account' }

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