import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';

const options = {
  secret: process.env.SECRET,
  site: process.env.NEXTAUTH_URL,
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
      session.user.name = email.split('@')[0];

      let request_params = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ access_token: token.accessToken })
      }

      await fetch(process.env.V1_API_ENDPOINT + '/auth/token/login', request_params)
        .then((res) => res.json())
        .then((data) => {
          session.user.access_token = data.access
          session.user.refresh_token = data.refresh
        })
        .catch(error => {
          session = {}
          console.log(error)
        })

      return session
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
