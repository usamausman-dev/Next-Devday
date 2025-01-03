import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";
import { compare } from 'bcryptjs'


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => res.json({ error: "Connection failed" }))

                const result = await Users.findOne({ email: credentials.email })

                if (!result) {
                    throw new Error("No User Exists")
                }


                const checkPassword = await compare(credentials.password, result.password)

                if (!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username/Password Mismatch")

                }

                return { email: result.email, id: result._id };
            }

        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Add the user ID to the token if it exists
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            // Add the user ID from the token to the session object
            session.user.id = token.id;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Add your secret here
});