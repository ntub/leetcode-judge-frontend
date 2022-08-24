import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { signIn, getSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import refreshToken from '../../../components/auth_service'

const verifyStatus = status => {
  switch (status) {
    case 'accepted':
      return '已審核'
    case 'waiting':
      return '等待審核'
  }
}

export default function Announcement({ session }: any) {
  const router = useRouter()
  const [submission, setSubmission] = useState();
  let { id } = router.query

  useEffect(() => {
    if (!session?.user.access_token) return

    fetch(
      process.env.V1_API_ENDPOINT + `/record/submissions/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.access_token}`
        }
      }
    )
      .then((res) => res.json())
      .then((res) => setSubmission(res))
  }, [session, id]);

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
    <div className="w-4/5 my-4 mx-auto flex flex-col pb-24">
      <div className="p-2 flex flex-col items-start">
        <div className="my-2 flex items-center w-full">
          <a href="/" className="text-md border-b border-gray-500 hover:italic w-10 text-center">首頁</a>
          <FontAwesomeIcon icon={faChevronRight} className='mx-2' />
          <a href="/submissions" className="text-md border-b border-gray-500 hover:italic w-20 text-center">解題紀錄</a>
          <FontAwesomeIcon icon={faChevronRight} className='mx-2' />
          <span className="text-md truncate">{submission?.question.title}</span>
        </div>
        <h1 className="mt-6 text-3xl font-bold">{submission?.question.title}</h1>
      </div>

      <label htmlFor="difficulty" className="text-lg font-bold mt-4">難易度</label>
      <input type="text" id="difficulty" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.difficulty} readOnly={true} />

      <label htmlFor="difficulty" className="text-lg font-bold mt-4">審核狀態</label>
      <input type="text" id="difficulty" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={verifyStatus(submission?.verify_status)} readOnly={true} />

      <div className="flex">
        <div className='w-full flex mr-2 flex-col'>
          <label htmlFor='created' className="text-lg font-bold mt-4">提交時間</label>
          <input type="datetime" id="created" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.created} readOnly={true} />
        </div>
        <div className='w-full flex ml-2 flex-col'>
          <label htmlFor='modified' className="text-lg font-bold mt-4">最後編輯時間</label>
          <input type="datetime" id="modified" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.modified} readOnly={true} />
        </div>
      </div>

      <label htmlFor="language" className="text-lg font-bold mt-4">語言</label>
      <input type="text" id="language" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.lang.name} readOnly={true} />

      <label htmlFor="source_code" className="text-lg font-bold mt-4">原始碼</label>
      <textarea id="source_code" rows={6} className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.source_code} readOnly={true} />

      <div className="flex">
        <div className='w-full flex mr-2 flex-col'>
          <label htmlFor='runtime' className="text-lg font-bold mt-4">Runtime</label>
          <input type="text" id="runtime" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.runtime} readOnly={true} />
        </div>
        <div className='w-full flex ml-2 flex-col'>
          <label htmlFor='runtimeRating' className="text-lg font-bold mt-4">Runtime Rating</label>
          <input type="text" id="runtimeRating" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.runtime_rating} readOnly={true} />
        </div>
      </div>
      
      <div className="flex">
        <div className='w-full flex mr-2 flex-col'>
          <label htmlFor='memory' className="text-lg font-bold mt-4">Memory</label>
          <input type="text" id="memory" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.memory} readOnly={true} />
        </div>
        <div className='w-full flex ml-2 flex-col'>
          <label htmlFor='memoryRating' className="text-lg font-bold mt-4">Memory Rating</label>
          <input type="text" id="memoryRating" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={submission?.memory_rating} readOnly={true} />
        </div>
      </div>

      <label className="text-lg font-bold mt-4">截圖</label>
      <img src={submission?.snapshot} alt="" />

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