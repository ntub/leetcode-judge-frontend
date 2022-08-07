export default function UploadRecord() {
    return (
        <div id="uploadRecordModel" className="fixed flex justify-center items-center h-full w-full bg-gray-700-rgba-50 top-0 hidden">
            <div className="bg-white rounded w-3/4 h-10/12 p-6">
                <form onSubmit={submitForm} className="flex flex-col">
                    <span className="text-lg font-bold">題目</span>
                    <select className="border border-gray-700 rounded text-lg h-12 px-4 mt-2">
                        <option value=""></option>
                        <option value="1">1. Two Sum</option>
                        <option value="2">2. Add Two Numbers</option>
                    </select>

                    <span className="text-lg font-bold mt-4">結果</span>
                    <textarea rows={10} className="border border-gray-700 rounded mt-2"></textarea>


                    <span className="text-lg font-bold mt-4">上傳原始碼</span>
                    <input type="file" className="mt-2"/>

                    <div className="w-full flex justify-center mt-4">
                        <button className="mx-2 rounded px-4 py-2 border border-green-700 text-green-700 hover:bg-green-700 hover:text-white">送出</button>
                        <button className="mx-2 rounded px-4 py-2 border border-red-700 text-red-700 hover:bg-red-700 hover:text-white"
                                onClick={toggleUploadModal}>
                            取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const toggleUploadModal = () => {
    const uploadRecordModel: any = document.getElementById('uploadRecordModel')
    uploadRecordModel.classList.toggle('hidden')
}

const submitForm = (event: any) => {
    event.preventDefault()
}