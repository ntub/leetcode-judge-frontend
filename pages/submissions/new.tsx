import Select from 'react-select'

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react'
import { signIn } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faXmark
} from "@fortawesome/free-solid-svg-icons";

const toggleAlert = () => { notify.classList.toggle('hidden') }
let lang:string;
let question:string;

export default function UploadRecord() {
  const { data: session } = useSession()
  const [problem, setProblem] = useState();
  const [language, setLanguage] = useState();

  useEffect(() => {
    if (!session?.user.access_token) return

    fetch(
      process.env.V1_API_ENDPOINT + '/problem/questions',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${session.user.access_token}`
        }
      }
    )
      .then((res) => res.json())
      .then((res) => setProblem(res))

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
  }, [session]);

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

  return (
    <div className="flex justify-center items-center w-full top-0">
      <div id="notify" className='fixed flex justify-between items-center border border-alert-border-green rounded bg-alert-bg-green text-alert-text-green w-64 h-16 top-16 right-10 p-2 hidden'>
        <div>
          <FontAwesomeIcon icon={faCircleInfo} className='mx-3' />
          新增成功
        </div>
        <button onClick={toggleAlert}>
          <FontAwesomeIcon icon={faXmark} className='text-gray-500 mr-3' />
        </button>
      </div>
      <div className="bg-white rounded w-3/4 h-10/12 p-6">
        <form id='recordForm' onSubmit={submitForm} className="flex flex-col">
          <input type="hidden" defaultValue={session?.user.access_token} id='token' />
          <label className="text-lg font-bold">題目 *</label>
          <Select className="border border-gray-500 rounded text-lg mt-2"
                  onChange={changeQuestion}
                  options={problem?.map(data => { return { value: data.title_slug, label: data.title } })} 
                  required />

          <label htmlFor="difficulty" className="text-lg font-bold mt-4">
            難易度 *
            <span className='text-sm ml-2'>最簡單：1、最難：5</span>
          </label>
          <select id="difficulty" className="border border-gray-700 rounded mt-2 p-4" required>
            <option></option>
            {
              [1, 2, 3, 4, 5].map(rating => {
                return <option value={rating} key={rating}>{rating}</option>
              })
            }
          </select>

          <label htmlFor="solvedAt" className="text-lg font-bold mt-4">解題日期 *</label>
          <input type="datetime" id="solvedAt" className="border border-gray-700 rounded mt-2 py-2 px-4" placeholder="yyyy-mm-dd" required />

          <label className="text-lg font-bold mt-4">語言 *</label>
          <Select className="border border-gray-500 rounded text-lg mt-2"
                  onChange={changeLanguage}
                  options={language?.map(data => { return { value: data.slug, label: data.name } })} 
                  required />

          <label htmlFor='sourceCode' className="text-lg font-bold mt-4">原始碼 *</label>
          <textarea id='sourceCode' rows={6} className="border border-gray-700 rounded mt-2 p-4" required></textarea>

          <label htmlFor='problemResult' className="text-lg font-bold mt-4">結果 </label>
          <textarea id='problemResult' rows={2} className="border border-gray-700 rounded mt-2 p-4"></textarea>

          <label htmlFor="problemResultFile" className="text-lg font-bold mt-4">畫面截圖 *</label>
          <input type="file" id="problemResultFile" className="mt-2" required />

          <div className="w-full flex justify-center mt-4">
            <button className="mx-2 rounded px-4 py-2 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white">送出</button>
            <a className="mx-2 rounded px-4 py-2 border border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
              href="/">
              返回
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

const submitForm = (event: any) => {
  event.preventDefault()

  let runtime: any
  let runtimeRating: any
  let memory: any
  let memoryRating: any

  if (!!problemResult.value) {
    const runtimeRegex = (problemResult.value) ? problemResult.value.match(/Runtime: (?<runtime>[0-9]+ ms), faster than (?<runtimeRating>[0-9]+\.*[0-9]+)*\%/).groups : null
    runtime = (problemResult.value) ? runtimeRegex.runtime : null
    runtimeRating = (problemResult.value) ? parseFloat(runtimeRegex.runtimeRating) / 100 : null

    const memoryRegex = (problemResult.value) ? problemResult.value.match(/Memory Usage: (?<memory>[0-9]+\.*[0-9]* MB), less than (?<memoryRating>[0-9]+\.*[0-9]*)\%/).groups : null
    memory = (problemResult.value) ? memoryRegex.memory : null
    memoryRating = (problemResult.value) ? parseFloat(memoryRegex.memoryRating) / 100 : null


  }

  const data = new FormData(recordForm);
  data.append('question_title_slug', question)
  data.append('difficulty', difficulty.value)
  data.append('lang_slug', lang)
  data.append('source_code', sourceCode.value)
  data.append('solved', solvedAt.value)
  data.append('snapshot', problemResultFile.files[0])
  data.append('runtime', runtime || 0)
  data.append('runtime_rating', runtimeRating || 0)
  data.append('memory', memory || 0)
  data.append('memory_rating', memoryRating || 0)

  fetch(
    process.env.V1_API_ENDPOINT + '/record/submissions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      body: data
    }
  )
    .then((res) => {
      if (!res.ok) throw res
      return res.json()
    })
    .then((res) => {
      problemResult.value = ''
      sourceCode.value = ''
      solvedAt.value = ''
      problemResultFile.value = ''
      toggleAlert()
      setTimeout(() => { toggleAlert() }, 3000)
    })
    .catch(error => {
      console.log(error)
    })
}

const changeLanguage = event => { lang = event.value }
const changeQuestion = event => { question = event.value }