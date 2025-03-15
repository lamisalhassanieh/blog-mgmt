import axios from "axios";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    debug: true, // Enable debug mode for NextAuth
    session: {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },

            // @ts-ignore
            async authorize(credentials) {
                try {
                    if (!credentials || !credentials.username || !credentials.password) {
                        throw new Error("Missing username or password");
                    }

                    const { username, password } = credentials;
                    const headerParams: any = {
                        "Content-type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                        "Access-Control-Allow-Headers": "Content-Type",
                    }

                    const response = await axios({
                        headers: headerParams,
                        url: `${process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL}jwt-auth/v1/token`,
                        method: "POST",
                        params: { username: username, password: password },
                    }) as any;
                    console.log("response_____________", response?.data)
                    if (response) {
                        if (response.status === 200) {
                            return response?.data;
                        }
                    }
                } catch (error) {
                    console.error("Error in authorize method:", error);
                    throw new Error("Login failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt(params: { token: JWT; user: any }) {
            try {
                const { token, user } = params;
                if (user) {
                    token.name = user?.user_nicename;
                    token.token = user?.token;
                }
                return token;
            } catch (error) {
                console.error("Error in jwt callback:", error);
                throw error;
            }
        },
        async session({ session, token }: { session: any; token: any }) {
            try {
                session.token = token.token;
                session.name = token.name;
                return session;
            } catch (error) {
                console.error("Error in session callback:", error);
                throw error;
            }
        },
    },
    pages: {
        signIn: `/login`,
        signOut: '/',
        error: '/', // Redirect to this page on error
    },
    secret: process.env.NEXTAUTH_SECRET,
};
