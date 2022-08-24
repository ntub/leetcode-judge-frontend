import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { signIn, getSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faChevronLeft,
  faChevronRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

import refreshToken from '../../components/auth_service'

export default function Announcement({ session }: any) {
  const router = useRouter()
  const [announcement, setAnnouncement] = useState();
  let { page } = router.query
  let currentPage = router.query.page ? parseInt(page) : 1

  let pagination = {
    currentPage,
    totalPage: 1,
    perPage: 20,
    ordering: '-created'
  }

  useEffect(() => {
    if(!session?.user.access_token) return
    
    fetch(
      process.env.V1_API_ENDPOINT + `/bulletin/announcements?page=${pagination.currentPage}&page_size=${pagination.perPage}&ordering=${pagination.ordering}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.access_token}`
        }
      }
    )
      .then((res) => {
        if(!res.ok) window.location.href = window.location.pathname
        return res.json()
      })
      .then((res) => {
        const { count, results } = res
        setAnnouncement({
          count,
          datas: results
        })
      })
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

  if(!announcement?.count) return
  pagination.totalPage = Math.ceil(announcement?.count / pagination.perPage)
  return (
    <div className="mt-4 flex flex-col items-center pb-24">
      <div className="w-4/5 my-4">
        <h2 className="mb-4 text-2xl font-bold">
          <span className="border-4 border-l border-gray-700 mr-2"></span>
          <span>公告 Announcement</span>
        </h2>
        <div className="border rounded border-black shadow-lg">
          {
            announcement?.count === 0 ?
              <span className="block px-2 py-3"> 目前沒有任何公告 </span>
              :
              <>
                {
                  announcement?.datas.map(announcement => {
                    const {
                      title,
                      created,
                    } = announcement

                    const announcementDate = new Date(created)
                    const showNewLabel = (new Date() - announcementDate) < 7 * 24 * 3600 * 1000 // 1 week
                    return (
                      <a href={`./announcements/${announcement.id}`} className="px-2 py-3 flex flex-col lg:flex-row border-b last:border-b-0 border-gray-600 hover:bg-gray-200" key={announcement.id}>
                        <span className="ml-4 lg:text-center">{announcementDate.toLocaleDateString()}</span>
                        <div className="flex ml-4">
                          {showNewLabel ? <span className="text-sm text-red-600 mr-2 flex items-center">new</span> : null}
                          <span className="truncate">{title}</span>
                        </div>
                      </a>
                    )
                  })
                }
              </>
          }
        </div>

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
            <span className="py-2 px-4 border border-gray-500 font-bold bg-gray-700 text-white">{pagination.currentPage}</span>
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