import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/app/(models)/User';
import bcrypt from 'bcrypt';

export const options = {
    providers: [
        GithubProvider({
            profile(profile) {
                console.log("Profile Github: ", profile);

                let userRole = "GitHub User"
                if (profile?.email === "klemen.nedelko2@gmail.com") {
                    userRole = "Admin"
                }

                return {
                    ...profile,
                    role: userRole
                };
            },
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                };
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "your-email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-password"
                },
            },
            async authorize(credentials) {
                try {
                    const foundUser = await User.findOne({ email: credentials.email })
                        .lean()
                        .exec();

                    if (foundUser) {
                        const match = await bcrypt.compare(credentials.password, foundUser.password);
                        if (match) {
                            console.log("Good Pass");
                            delete foundUser.password;
                            foundUser["role"] = "Unverified Email"
                            return foundUser;
                        }
                    }

                } catch (error) {
                    console.log("Error: ", error);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role;
            return session;
        }
    }
}