import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faCaretDown,
    faUser,
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
    return (
        <nav>
            <div className="flex items-center justify-between bg-teal-500 p-6">

                <a href="/" className="flex items-center flex-no-shrink text-white mr-6">
                    <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
                    </svg>
                    <span className="font-semibold text-xl tracking-tight">Tailwind CSS</span>
                </a>
                <div className="flex items-center justify-end">
                    <button onClick={toggleUploadModal} className="px-5 py-2 text-white hover:border-b hover:border-white hidden lg:block">
                        上傳成績
                    </button>
                    <a href="#2" className="px-5 py-2 text-white hover:border-b hover:border-white hidden lg:block">
                        解題記錄
                    </a>
                    <button className="flex items-center mx-2 lg:px-5 py-2 text-white hover:lg:border-b hover:lg:border-white" onClick={toggleDropdownMenu}>
                        <div className="hidden lg:block">
                            <FontAwesomeIcon icon={faUser} />
                            <span className="mx-4">10446008</span>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                        <div className="lg:hidden">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </button>
                </div>
            </div>
            <div id="dropdown" className="fixed w-full lg:w-auto lg:right-6 border border-gray-500 bg-white hidden">
                <div className="flex flex-col">
                    <a href="#profile" className="py-2 pl-4 pr-24 border border-gray-300 hover:bg-gray-200">
                        個人資料
                    </a>
                    <button onClick={toggleUploadModal} className="py-2 pl-4 pr-24 border border-gray-300 hover:bg-gray-200 lg:hidden text-left">
                        上傳成績
                    </button>
                    <a href="#profile" className="py-2 pl-4 pr-24 border border-gray-300 hover:bg-gray-200 lg:hidden">
                        解題記錄
                    </a>
                    <a href="#logout" className="py-2 pl-4 pr-24 border border-gray-300 hover:bg-gray-200">
                        登出
                    </a>
                </div>
            </div>
        </nav>
    );
}