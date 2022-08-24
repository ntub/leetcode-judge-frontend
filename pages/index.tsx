import { useState, useEffect } from "react";
import { signIn, getSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import refreshToken from '../components/auth_service'

export default function Home({ session }: any) {
    const [submission, setSubmission] = useState();
    const [announcement, setAnnouncement] = useState();

    useEffect(() => {
        if (!session?.user.access_token) return

        fetch(
            process.env.V1_API_ENDPOINT + '/bulletin/announcements?page=1&page_size=10&ordering=-created',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.user.access_token}`
                }
            }
        )
            .then((res) => res.json())
            .then((res) => {
                const { count, results } = res
                setAnnouncement({
                    count,
                    datas: results
                })
            })
            .catch(_error => setAnnouncement({ count: 0, datas: [] }))

        fetch(
            process.env.V1_API_ENDPOINT + '/record/submissions?page_size=4&ordering=-created',
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

    let chart: any = {
        total: 0,
        accepted: 0,
        waiting: 0,
        Easy: {
            total: 0,
            accepted: 0,
            waiting: 0,
        },
        Medium: {
            total: 0,
            accepted: 0,
            waiting: 0,
        },
        Hard: {
            total: 0,
            accepted: 0,
            waiting: 0,
        }
    }

    for (let data of (submission?.results || [])) {
        chart[data.question.difficulty]['total'] += 1
        chart[data.question.difficulty][data.verify_status] += 1

        chart.total += 1
        chart[data.verify_status] += 1
    }

    return (
        <div className="mt-4 grow flex flex-col items-center">
            <div className="w-4/5 my-4">
                <h2 className="mb-4 text-2xl font-bold">
                    <span className="border-4 border-l border-gray-700 mr-2"></span>
                    <span>公告 Announcement</span>
                </h2>
                <div className="border rounded border-black">
                    {
                        announcement?.count === 0 ?
                            <span className="block px-2 py-3">
                                目前沒有任何公告
                            </span>
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
                                <div className="w-full h-10 flex justify-center items-center">
                                    <a href="/announcements" className="hover:border-b hover:border-gray-500">
                                        more...
                                    </a>
                                </div>
                            </>
                    }
                </div>
            </div>

            <div className="w-4/5 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 my-4 py-2 mr-2 px-4 border rounded border-gray-600 flex flex-col">
                    <span className="mt-4 text-md text-gray-700">Submission Verify Status</span>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <div className="w-full md:w-1/2 relative flex justify-center items-center">
                            <svg className="h-full w-full origin-center -rotate-90" viewBox="0 0 50 50">
                                <circle
                                    r="16"
                                    cx="25"
                                    cy="25"
                                    fill="none"
                                    stroke="gainsboro"
                                    strokeWidth="2"
                                >
                                </circle>
                                <circle
                                    r="16"
                                    cx="25"
                                    cy="25"
                                    fill="none"
                                    stroke="orange"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray="100 100"
                                    strokeDashoffset={(chart.waiting / chart.total * 100) || 100}
                                ></circle>
                            </svg>
                            <div className="group absolute w-40">
                                <div className="flex flex-col text-center">
                                    <span className="group-hover:hidden text-3xl solved-count">{chart.accepted}</span>
                                    <span className="hidden group-hover:block text-3xl solved-percent pl-2">{((chart.total === 0) ? 0 : chart.accepted / chart.total * 100).toFixed(1)}%</span>
                                    <span className="text-sm">Solved</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 mb-4">
                            <div className="my-2">
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Easy</span>
                                    <div className="w-1/2 text-right">
                                        <span className="font-bold text-l">{chart.Easy.accepted}</span>
                                        <span className="text-gray-400 text-sm"> / {chart.Easy.total}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Beats</span>
                                    <span className="w-1/2 text-right text-gray-800 text-sm font-bold">{`${(chart.Easy.total === 0) ? 0 : Math.round((chart.Easy.accepted / chart.Easy.total * 100))}%`}</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute border-2 border-green-200 w-full"></span>
                                    {
                                        chart.Easy.total > 0 &&
                                        <span className="absolute border-2 border-green-500" style={{ width: `${Math.round((chart.Easy.accepted / chart.Easy.total * 100))}%` }}></span>
                                    }
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Medium</span>
                                    <div className="w-1/2 text-right">
                                        <span className="font-bold text-l">{chart.Medium.accepted}</span>
                                        <span className="text-gray-400 text-sm"> / {chart.Medium.total}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Beats</span>
                                    <span className="w-1/2 text-right text-gray-800 text-sm font-bold">{`${(chart.Medium.total === 0) ? 0 : Math.round((chart.Medium.accepted / chart.Medium.total * 100))}%`}</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute border-2 border-yellow-200 w-full"></span>
                                    {
                                        chart.Medium.total > 0 &&
                                        <span className="absolute border-2 border-yellow-500" style={{ width: `${Math.round((chart.Medium.accepted / chart.Medium.total * 100))}%` }}></span>
                                    }
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Hard</span>
                                    <div className="w-1/2 text-right">
                                        <span className="pl-2 font-bold text-l">{chart.Hard.accepted}</span>
                                        <span className="text-gray-400 text-sm"> / {chart.Hard.total}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Beats</span>
                                    <span className="w-1/2 text-right text-gray-800 text-sm font-bold">{`${(chart.Hard.total === 0) ? 0 : Math.round((chart.Hard.accepted / chart.Hard.total * 100))}%`}</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute border-2 border-red-200 w-full"></span>
                                    {
                                        chart.Hard.total > 0 &&
                                        <span className="absolute border-2 border-red-500" style={{ width: `${Math.round((chart.Hard.accepted / chart.Hard.total * 100))}%` }}></span>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 my-4 py-2 ml-2 border rounded border-gray-600">
                    <div className="flex flex-col">
                        <div className="py-1 px-2 border-b border-gray-400 flex">
                            <div className="w-20 text-center">審核狀態</div>
                            <div className="ml-4">提交時間 / 題目</div>
                        </div>
                        {
                            submission?.count === 0 ?
                                <span className="py-1 px-2">尚未提交任何成績</span>
                                :
                                <>
                                    {
                                        submission?.results.map(data => {
                                            return (
                                                <a href={`/submissions/${data.id}`} className="p-2 flex border-b last:border-b-0 border-gray-400 hover:bg-gray-200" key={data.id}>
                                                    <div className="w-20 flex justify-center items-center">
                                                        {
                                                            data.verify_status === 'accepted' &&
                                                            <FontAwesomeIcon icon={faCircleCheck} className='text-green-700' />
                                                        }
                                                    </div>
                                                    <div className="ml-4 lg:ml-0">
                                                        <div className="w-40 lg:ml-4">
                                                            {data.created}
                                                        </div>
                                                        <div className="lg:ml-4 truncate">{data.question.title}</div>
                                                    </div>
                                                </a>
                                            )
                                        })
                                    }
                                    <div className="flex justify-end items-center pr-4 py-2">
                                        <a href="/submissions" className="hover:border-b hover:border-gray-500">more...</a>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context: any) {
    let session = await getSession(context)
    session = await refreshToken(session)
    if (!session) signOut()

    return {
        props: {
            session
        },
    }
}