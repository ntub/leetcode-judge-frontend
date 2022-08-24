import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { signIn, getSession } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronRight,
  faCircleInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import refreshToken from '../../../components/auth_service'

const verifyStatus = status => {
  switch (status) {
    case 'accepted':
      return '已審核'
    case 'waiting':
      return '等待審核'
  }
}

const parseRuntimeOrMemory = input => {
  if (input?.indexOf('ms') === -1) return input
  return input?.match(/(?<num>[0-9]+\.*[0-9]*) (ms|MB)/).groups.num;
}
const parseRuntimeOrMemoryRating = input => input * 100;
const toggleAlert = () => { notify.classList.toggle('hidden') }

export default function Announcement({ session }: any) {
  const router = useRouter()
  const [submission, setSubmission] = useState();
  const [language, setLanguage] = useState();
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

    fetch(
      process.env.V1_API_ENDPOINT + '/problem/languages',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${session.user.access_token}`
        }
      }
    )
      .then((res) => res.json())
      .then((res) => setLanguage(res))
  }, [session, id]);

  if (!session?.user.access_token) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <button onClick={signIn} className='px-4 py-2 border rounded border-gray-700 hover:bg-gray-700 hover:text-white'>使用者登入</button>
        <p className="mt-4">
          請先登入學校 email ，再執行後續操作
        </p>
      </div>
    )
  }

  if (submission?.verify_status === 'accepted') { window.location.href = `/submissions/${id}` }
  return (
    <div className="w-4/5 my-4 mx-auto flex flex-col pb-24">
      <div id="notify" className='fixed flex justify-between items-center border border-alert-border-green rounded bg-alert-bg-green text-alert-text-green w-64 h-16 top-16 right-10 p-2 hidden'>
        <div>
          <FontAwesomeIcon icon={faCircleInfo} className='mx-3' />
          更新成功
        </div>
        <button onClick={toggleAlert}>
          <FontAwesomeIcon icon={faXmark} className='text-gray-500 mr-3' />
        </button>
      </div>

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

      <input type="hidden" id="token" defaultValue={session?.user.access_token} />
      <input type="hidden" id="question_slug" defaultValue={submission?.question.title_slug} />
      <input type="hidden" id="submissionId" defaultValue={submission?.id} />

      <label htmlFor="difficulty" className="text-lg font-bold mt-4">
        難易度 *
        <span className='text-sm ml-2'>最簡單：1、最難：5</span>
      </label>
      <select id="difficulty" className="border border-gray-700 rounded mt-2 p-4">
        {
          [1, 2, 3, 4, 5].map(rating => {
            return <option value={rating} key={rating} selected={rating === submission?.difficulty}>{rating}</option>
          })
        }
      </select>

      <label htmlFor="verify_status" className="text-lg font-bold mt-4">審核狀態</label>
      <input type="text" id="verify_status" className="border border-gray-700 rounded mt-2 p-4 cursor-default bg-gray-200" defaultValue={verifyStatus(submission?.verify_status)} readOnly={true} />

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

      <label htmlFor="language" className="text-lg font-bold mt-4">語言 *</label>
      <select id='language' className="border border-gray-700 rounded text-lg h-12 px-4 mt-2" required>
        {language?.map(data => <option value={data.slug} key={data.slug} selected={data.slug === submission?.lang.slug}>{data.name}</option>)}
      </select>

      <label htmlFor="sourceCode" className="text-lg font-bold mt-4">原始碼 *</label>
      <textarea id="sourceCode" rows={6} className="border border-gray-700 rounded mt-2 p-4" defaultValue={submission?.source_code} required />

      <div className="flex">
        <div className='w-full flex mr-2 flex-col'>
          <label htmlFor='runtime' className="text-lg font-bold mt-4">Runtime</label>
          <div className="flex items-center">
            <input type="text" id="runtime" className="w-full border border-gray-700 rounded mt-2 p-4" defaultValue={parseRuntimeOrMemory(submission?.runtime)} />
            <span className='ml-4'> ms</span>
          </div>
        </div>
        <div className='w-full flex ml-2 flex-col'>
          <label htmlFor='runtimeRating' className="text-lg font-bold mt-4">Runtime Rating</label>
          <div className="flex items-center">
            <input type="text" id="runtimeRating" className="w-full border border-gray-700 rounded mt-2 p-4" defaultValue={parseRuntimeOrMemoryRating(submission?.runtime_rating)} />
            <span className='ml-4'> %</span>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className='w-full flex mr-2 flex-col'>
          <label htmlFor='memory' className="text-lg font-bold mt-4">Memory</label>
          <div className="flex items-center">
            <input type="text" id="memory" className="w-full border border-gray-700 rounded mt-2 p-4" defaultValue={parseRuntimeOrMemory(submission?.memory)} />
            <span className='ml-4'> ms</span>
          </div>
        </div>
        <div className='w-full flex ml-2 flex-col'>
          <label htmlFor='memoryRating' className="text-lg font-bold mt-4">Memory Rating</label>
          <div className="flex items-center">
            <input type="text" id="memoryRating" className="w-full border border-gray-700 rounded mt-2 p-4" defaultValue={parseRuntimeOrMemoryRating(submission?.memory_rating)} />
            <span className='ml-4'> %</span>
          </div>
        </div>
      </div>

      <label htmlFor='snapshot' className="text-lg font-bold mt-4">截圖 *</label>
      <img src={submission?.snapshot} alt="" />
      <input type="file" id='snapshot' className="border border-gray-700 rounded mt-2 p-4" />

      <div className='w-full flex justify-center items-center mt-4'>
        <button onClick={formSubmit} className="mx-2 rounded px-4 py-2 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white">送出</button>
        <a href='/submissions' className="mx-2 rounded px-4 py-2 border border-red-700 text-red-700 hover:bg-red-700 hover:text-white">取消</a>
      </div>
    </div>

  );
}

const formSubmit = () => {
  const data = new FormData();
  data.append('difficulty', difficulty.value)
  data.append('lang_slug', language.value)
  data.append('source_code', sourceCode.value)
  data.append('solved', created.value)
  if(!!runtime.value) data.append('runtime', parseInt(runtime.value))
  if(!!runtimeRating.value) data.append('runtime_rating', parseFloat(runtimeRating.value)/ 100)
  if(!!memory.value) data.append('memory', parseInt(memory.value))
  if(!!memoryRating.value) data.append('memory_rating', parseFloat(memoryRating.value) / 100)
  if(snapshot.files.length !== 0) data.append('snapshot', snapshot.files[0])

  fetch(
    process.env.V1_API_ENDPOINT + `/record/submissions/${submissionId.value}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: data
    }
  )
    .then((res) => res.json())
    .then((res) => {
      toggleAlert()
      setTimeout(() => { toggleAlert() }, 3000)
      window.location.href = `/submissions/${submissionId.value}`
    })
    .catch(error => {
      console.log(error)
    })
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