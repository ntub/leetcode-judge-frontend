const parseJWT = (token: string) => JSON.parse(decodeURIComponent(escape(Buffer.from(token.split('.')[1], 'base64').toString())))

export default async function refreshToken(session: any) {
  if (!session?.user?.access_token) return null

  const access = parseJWT(session.user?.access_token)
  if (new Date(access.exp * 1000) > new Date) return session

  const refresh = parseJWT(session.user.refresh_token)
  if (new Date(refresh.exp * 1000) < new Date) return null

  await fetch(
    process.env.V1_API_ENDPOINT + '/auth/token/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: session.user.refresh_token })
    }
  )
    .then((res) => res.json())
    .then((res) => {
      session.user.access_token = res.access
      session.user.refresh_token = res.refresh
      return session
    })
}
