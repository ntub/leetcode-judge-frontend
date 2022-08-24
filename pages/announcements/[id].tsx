import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { signIn, getSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import refreshToken from '../../components/auth_service'

export default function Announcement({ session }: any) {
  const router = useRouter()
  const [announcement, setAnnouncement] = useState();
  let { id } = router.query

  useEffect(() => {
    if (!session?.user.access_token) return

    fetch(
      process.env.V1_API_ENDPOINT + `/bulletin/announcements/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.access_token}`
        }
      }
    )
      .then((res) => {
        if (!res.ok) window.location.href = '/announcements'
        return res.json()
      })
      .then((res) => setAnnouncement(res))
  }, [session, id]);

  console.log(announcement)

  if (!session) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <button onClick={signIn} className='px-4 py-2 border rounded border-gray-700 hover:bg-gray-700 hover:text-white'>使用者登入</button>
        <p className="mt-4">
          請先登入學校 email ，再執行後續操作
        </p>
      </div>
    )
  }

  return (
    <div id='container' className="mt-12 mx-auto w-3/5">
      <div className="p-2 border-b border-gray-700 flex flex-col items-start">
        <div className="my-2 flex items-center w-full">
          <a href="/" className="text-md border-b border-gray-500 hover:italic w-10 text-center">首頁</a>
          <FontAwesomeIcon icon={faChevronRight} className='mx-2' />
          <a href="/announcements" className="text-md border-b border-gray-500 hover:italic w-10 text-center">公告</a>
          <FontAwesomeIcon icon={faChevronRight} className='mx-2' />
          <span className="text-md truncate">{announcement?.title}</span>
        </div>
        <h1 className="mt-6 text-3xl font-bold">{announcement?.title}</h1>
        <span className="self-end text-sm">公告於： {announcement?.created}</span>
        <span className="self-end text-sm">最後編輯時間：{announcement?.modified}</span>
      </div>

      <div dangerouslySetInnerHTML={{ __html: announcement?.description }} />

    </div>
  );
}

export async function getServerSideProps(context: any) {
  let session = await getSession(context)
  session = await refreshToken(session)

  return {
    props: {
      session
    },
  }
}