import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';


const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session, token }: any) {
            let email = token.email;
            session.user.email = email;
            session.user.name  = email.split('@')[0];

            return session;
        },
        async jwt({ token, user, account }: any) {
          // Persist the OAuth access_token to the token right after signin
          if (account) {
            token.accessToken = account.access_token;
            token.refreshToken = account.refresh_token;
            token.idToken = account.id_token;
            token.provider = account.provider;
          }
          if (user) {
            token.id = user.id.toString();
          }
          return token;
        },
    }
}

export default (req: any, res: any) => NextAuth(req, res, options)
