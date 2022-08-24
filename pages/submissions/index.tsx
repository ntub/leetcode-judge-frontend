import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { signIn, getSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faChevronLeft,
  faChevronRight,
  faAnglesRight,
  faCircleCheck,
  faPenToSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import refreshToken from '../../components/auth_service'

export default function Submission({ session }: any) {
  const router = useRouter()
  const [submission, setSubmission] = useState();
  let { page } = router.query
  let currentPage = router.query.page ? parseInt(page) : 1

  let pagination = {
    currentPage,
    totalPage: 1,
    perPage: 20,
    ordering: '-created'
  }

  useEffect(() => {
    if (!session?.user.access_token) return

    fetch(
      process.env.V1_API_ENDPOINT + '/record/submissions?page_size=5&ordering=-created',
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
  }, [session]);

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

  pagination.totalPage = Math.ceil(submission?.count / pagination.perPage)
  return (
    <div className="mt-4 flex flex-col items-center pb-24">
      <div className="w-4/5 my-4">
        <table className='w-full border border-gray-500 rounded'>
          <thead>
            <tr className='border-b border-gray-400'>
              <th className='p-2 text-center w-24'>審核狀態</th>
              <th className='p-2 text-center w-48'>提交時間</th>
              <th className='p-2 text-left'>題目</th>
              <th className='w-24'></th>
            </tr>
          </thead>
          <tbody>
            {
              submission?.results.map(data => {
                return (
                  <tr key={data.id} className='hover:bg-gray-300'>
                    <td className='p-2 text-center'>
                      {
                        data.verify_status === 'accepted' &&
                        <FontAwesomeIcon icon={faCircleCheck} className='text-green-700' />
                      }
                    </td>
                    <td className='p-2 text-center'>{data.created}</td>
                    <td className='p-2 truncate'>{data.question.title}</td>
                    <td className='p-2 flex items-center'>
                      <a href={`/submissions/${data.id}`}><FontAwesomeIcon icon={faEye} /></a>
                      {
                        data.verify_status !== 'accepted' &&
                        <a href={`/submissions/${data.id}/edit`} className='ml-4'><FontAwesomeIcon icon={faPenToSquare} /></a>
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <div className="mt-14 mb-10 flex justify-center">
          {
            pagination.totalPage !== 1 &&
            <>
              <a href='/announcements?page=1' className="py-2 px-4 border border-r-0 border-gray-500 rounded-l hover:bg-gray-200">
                <FontAwesomeIcon icon={faAnglesLeft} />
              </a>
              <a href={`/announcements?page=${pagination.currentPage - 1}`} className="py-2 px-4 border border-r-0 border-gray-500 hover:bg-gray-200">
                <FontAwesomeIcon icon={faChevronLeft} />
              </a>
            </>
          }
          {
            pagination.currentPage > 2 &&
            <a href={`/announcements?page=${pagination.currentPage - 2}`} className="py-2 px-4 border border-r-0 border-gray-500 font-bold hover:bg-gray-200">{pagination.currentPage - 2}</a>
          }
          {
            pagination.currentPage > 1 &&
            <a href={`/announcements?page=${pagination.currentPage - 1}`} className="py-2 px-4 border border-r-0 border-gray-500 font-bold hover:bg-gray-200">{pagination.currentPage - 1}</a>
          }
          {
            <span href="#page" className="py-2 px-4 border border-gray-500 font-bold bg-gray-700 text-white">{pagination.currentPage}</span>
          }
          {
            pagination.totalPage - pagination.currentPage > 0 &&
            <a href={`/announcements?page=${pagination.currentPage + 1}`} className="py-2 px-4 border border-l-0 border-gray-500 font-bold hover:bg-gray-200">{pagination.currentPage + 1}</a>
          }
          {
            pagination.totalPage - pagination.currentPage > 1 &&
            <a href={`/announcements?page=${pagination.currentPage + 2}`} className="py-2 px-4 border border-l-0 border-gray-500 font-bold hover:bg-gray-200">{pagination.currentPage + 2}</a>
          }
          {
            pagination.totalPage !== 1 &&
            <>
              <a href={`/announcements?page=${pagination.currentPage + 1}`} className="py-2 px-4 border border-l-0 border-gray-500 font-bold hover:bg-gray-200">
                <FontAwesomeIcon icon={faChevronRight} />
              </a>
              <a href={`/announcements?page=${pagination.totalPage}`} className="py-2 px-4 border border-l-0 border-gray-500 rounded-r hover:bg-gray-200">
                <FontAwesomeIcon icon={faAnglesRight} />
              </a>
            </>
          }
        </div>
      </div>
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