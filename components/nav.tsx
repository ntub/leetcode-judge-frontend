import { useSession, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faFileArrowUp,
    faBook,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const toggleDropdownMenu = () => {
    const dropdown: any = document.getElementById('dropdown')
    dropdown.classList.toggle("hidden")
}

const toggleUploadModal = () => {
    const uploadRecordModel: any = document.getElementById('uploadRecordModel')
    uploadRecordModel.classList.toggle('hidden')
}

export default function Nav() {
    let { data: session } = useSession()
    
    return (
        <nav>
            <div className="flex items-center justify-between bg-teal-500 p-6">
                <a href="/" className="flex items-center flex-no-shrink text-white mr-6">
                    <span className="font-semibold text-xl tracking-tight">LeetCode Judge</span>
                </a>

                {
                    session?.user.access_token &&
                    <div className="flex items-center justify-end">
                        <a href='/submissions/new' className="px-5 py-2 text-white hover:border-b hover:border-white hidden lg:block">
                            上傳成績
                        </a>
                        <a href="/submissions" className="px-5 py-2 text-white hover:border-b hover:border-white hidden lg:block">
                            解題記錄
                        </a>
                        <button onClick={signOut} className="flex items-center mx-2 lg:px-5 py-2 text-white hover:lg:border-b hover:lg:border-white hidden lg:block">
                            登出
                        </button>
                        <button className="flex items-center mx-2 lg:px-5 py-2 text-white hover:lg:border-b hover:lg:border-white lg:hidden" onClick={toggleDropdownMenu}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    </div>
                }
            </div>
            {
                session?.user.access_token &&
                <div id="dropdown" className="fixed w-full lg:w-auto lg:right-6 border border-gray-500 bg-white hidden lg:hidden">
                    <div className="flex flex-col">
                        <a href='/submissions/new' className="py-2 pl-4 pr-20 border border-gray-300 hover:bg-gray-200 lg:hidden text-left">
                            <FontAwesomeIcon icon={faFileArrowUp} className='mr-4' />
                            上傳成績
                        </a>
                        <a href="/submissions" className="py-2 pl-4 pr-20 border border-gray-300 hover:bg-gray-200 lg:hidden">
                            <FontAwesomeIcon icon={faBook} className='mr-4' />
                            解題記錄
                        </a>
                        <button onClick={signOut} className="py-2 pl-4 pr-20 border border-gray-300 hover:bg-gray-200 text-left">
                            <FontAwesomeIcon icon={faArrowRightFromBracket} className='mr-4' />
                            登出
                        </button>
                    </div>
                </div>
            }
        </nav>
    );
}