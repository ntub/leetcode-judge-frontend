import Link from "next/link";
import { useSession, signIn } from 'next-auth/react'


function Home() {
    const { data: session } = useSession();

    if(!session) {
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
        <div className="mt-4 grow flex flex-col items-center">
            <div className="w-4/5 my-4">
                <h2 className="mb-4 text-2xl font-bold">
                    <span className="border-4 border-l border-gray-700 mr-2"></span>
                    <span>公告 Announcement</span>
                </h2>
                <div className="border rounded border-black">
                    <a href="./announcement-detail.html" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-22</span>
                        <div className="flex ml-4">
                            <span className="text-sm text-red-600 mr-2">new</span>
                            <span className="truncate">111學年度國軍退除役官兵就讀大學暨技術校院二年制進修部(夜二技)甄試-錄取名單公告</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-21</span>
                        <div className="flex ml-4">
                            <span className="text-sm text-red-600 mr-2">new</span>
                            <span className="truncate">111 年【數位行銷】教師研習課程</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-21</span>
                        <div className="flex ml-4">
                            <span className="text-sm text-red-600 mr-2">new</span>
                            <span className="truncate">【就輔組公告】【填問卷•抽好禮】109、107及105學年度畢業生畢業流向問卷抽獎活動開跑囉</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-15</span>
                        <div className="flex ml-4">
                            <span className="truncate">第一次公告-111學年度北區五專聯合免試入學達現場分發資格名單</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-14</span>
                        <div className="flex ml-4">
                            <span className="truncate">【臺北校區】111年度 (第1期)「地政士證照考試輔導班」111/7/20 (三) 確定開班~截止報名</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-22</span>
                        <div className="flex ml-4">
                            <span className="text-sm text-red-600 mr-2">new</span>
                            <span className="truncate">111學年度國軍退除役官兵就讀大學暨技術校院二年制進修部(夜二技)甄試-錄取名單公告</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-21</span>
                        <div className="flex ml-4">
                            <span className="text-sm text-red-600 mr-2">new</span>
                            <span className="truncate">111 年【數位行銷】教師研習課程</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-21</span>
                        <div className="flex ml-4">
                            <span className="text-sm text-red-600 mr-2">new</span>
                            <span className="truncate">【就輔組公告】【填問卷•抽好禮】109、107及105學年度畢業生畢業流向問卷抽獎活動開跑囉</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-15</span>
                        <div className="flex ml-4">
                            <span className="truncate">第一次公告-111學年度北區五專聯合免試入學達現場分發資格名單</span>
                        </div>
                    </a>
                    <a href="#anno1" className="px-2 py-3 flex flex-col lg:flex-row border-b border-gray-600 hover:bg-gray-200">
                        <span className="ml-4 lg:text-center">2022-07-14</span>
                        <div className="flex ml-4">
                            <span className="truncate">【臺北校區】111年度 (第1期)「地政士證照考試輔導班」111/7/20 (三) 確定開班~截止報名</span>
                        </div>
                    </a>
                    <div className="w-full h-10 flex justify-center items-center">
                        <a href="./announcement.html" className="hover:border-b hover:border-gray-500">
                            more...
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-4/5 my-4 flex flex-col lg:flex-row">
                <div className="lg:w-1/2 lg:my-0 my-2 py-2 px-4 border rounded border-gray-600 flex flex-col">
                    <span className="mt-4 text-md text-gray-700">Solved Problems</span>
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
                                    strokeDashoffset="63.33"
                                ></circle>
                            </svg>
                            <div className="group absolute w-40">
                                <div className="flex flex-col text-center">
                                    <span className="group-hover:hidden text-3xl solved-count">44</span>
                                    <span className="hidden group-hover:block text-3xl solved-percent pl-2">36.7%</span>
                                    <span className="text-sm">Solved</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col w-full md:w-1/2 mb-4">
                            <div className="my-2">
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Easy</span>
                                    <div className="w-1/2 text-right">
                                        <span className="font-bold text-l">30</span>
                                        <span className="text-gray-400 text-sm"> / 60</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Beats</span>
                                    <span className="w-1/2 text-right text-gray-800 text-sm font-bold">50.0%</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute border-2 border-green-200 w-full"></span>
                                    <span className="absolute border-2 border-green-500" style={{ width: "50%" }}></span>
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Medium</span>
                                    <div className="w-1/2 text-right">
                                        <span className="font-bold text-l">12</span>
                                        <span className="text-gray-400 text-sm"> / 40</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Beats</span>
                                    <span className="w-1/2 text-right text-gray-800 text-sm font-bold">30.0%</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute border-2 border-yellow-200 w-full"></span>
                                    <span className="absolute border-2 border-yellow-500" style={{ width: '30%' }}></span>
                                </div>
                            </div>
                            <div className="my-2">
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Hard</span>
                                    <div className="w-1/2 text-right">
                                        <span className="pl-2 font-bold text-l">2</span>
                                        <span className="text-gray-400 text-sm"> / 20</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    <span className="w-1/2 text-gray-500 text-sm">Beats</span>
                                    <span className="w-1/2 text-right text-gray-800 text-sm font-bold">10.0%</span>
                                </div>
                                <div className="relative">
                                    <span className="absolute border-2 border-red-200 w-full"></span>
                                    <span className="absolute border-2 border-red-500" style={{ width: '10%' }}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:w-1/2 lg:ml-2 lg:my-0 my-2 p-2 border rounded border-gray-600">
                    <div className="flex flex-col">
                        <a href="#problem" className="py-1 px-2 border-b border-gray-400">
                            <span className="w-10">審核</span>
                            <span className="ml-4">題目</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 flex flex-between hover:border-b hover:border-gray-400 truncate">
                            <span className="w-10 ml-2">
                                <i className="fa-solid fa-circle-check text-green-700"></i>
                            </span>
                            <span className="ml-2">1. Two Sum</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 hover:border-b hover:border-gray-400 truncate">
                            <span className="ml-14">2. Add Two Numbers</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 flex flex-between hover:border-b hover:border-gray-400 truncate">
                            <span className="w-10 ml-2">
                                <i className="fa-solid fa-circle-check text-green-700"></i>
                            </span>
                            <span className="ml-2">6. Zigzag Conversion</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 flex flex-between hover:border-b hover:border-gray-400 truncate">
                            <span className="w-10 ml-2">
                                <i className="fa-solid fa-circle-check text-green-700"></i>
                            </span>
                            <span className="ml-2">8. String to Integer (atoi)</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 hover:border-b hover:border-gray-400 truncate">
                            <span className="ml-14">315. Count of Smaller Numbers After Self</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 hover:border-b hover:border-gray-400 truncate">
                            <span className="ml-14">315. Count of Smaller Numbers After Self</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 hover:border-b hover:border-gray-400 truncate">
                            <span className="ml-14">315. Count of Smaller Numbers After Self</span>
                        </a>
                        <a href="#problem" className="py-1 px-2 hover:border-b hover:border-gray-400 truncate">
                            <span className="ml-14">315. Count of Smaller Numbers After Self</span>
                        </a>
                        <div className="flex justify-end items-center pr-4">
                            <a href="#more-info" className="hover:border-b hover:border-gray-500">more...</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* <Link 
  href={{
    pathname: "/posts/[postId]",
    query: { postId: "1" },
  }}
>
  <a>切換至 pages/post/[postId].tsx</a>
</Link> */}
export default Home;