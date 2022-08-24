import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react'

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
        .then((res) =>setProblem(res))
        
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
        .then((res) =>setLanguage(res))
    }, [session]);

    if(!session?.user.access_token) return
    return (
        <div id="uploadRecordModel" className="fixed flex justify-center items-center w-full bg-gray-700-rgba-50 top-0 hidden">
            <div className="bg-white rounded w-3/4 h-10/12 p-6">
                <form id='recordForm' onSubmit={submitForm} className="flex flex-col">
                    <input type="hidden" defaultValue={session?.user.access_token} id='token' />
                    <label htmlFor='problemTitle' className="text-lg font-bold">題目 *</label>
                    <select id='problemTitle' className="border border-gray-700 rounded text-lg h-12 px-4 mt-2" required>
                        <option></option>
                        { problem?.map(data => <option value={data.title_slug} key={data.title_slug}>{data.title}</option>) }
                    </select>

                    <label htmlFor='codingLanguage' className="text-lg font-bold mt-4">語言 *</label>
                    <select id='codingLanguage' className="border border-gray-700 rounded text-lg h-12 px-4 mt-2" required>
                        <option></option>
                        { language?.map(data => <option value={data.slug} key={data.slug}>{data.name}</option>) }
                    </select>

                    <label htmlFor='sourceCode' className="text-lg font-bold mt-4">原始碼 *</label>
                    <textarea id='sourceCode' rows={6} className="border border-gray-700 rounded mt-2 p-4" required></textarea>


                    <label htmlFor="solvedAt" className="text-lg font-bold mt-4">解題日期 *</label>
                    <input type="datetime" id="solvedAt" className="border border-gray-700 rounded mt-2 p-4" required/>
                    
                    <label htmlFor='problemResult' className="text-lg font-bold mt-4">結果 </label>
                    <textarea id='problemResult' rows={2} className="border border-gray-700 rounded mt-2 p-4"></textarea>

                    <label htmlFor="problemResultFile" className="text-lg font-bold mt-4">畫面截圖 *</label>
                    <input type="file" id="problemResultFile" className="mt-2" required/>

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

    const runtimeRegex = (problemResult.value) ? problemResult.value.match(/Runtime: (?<runtime>[0-9]+ ms), faster than (?<runtimeRating>[0-9]+\.*[0-9]+)*\%/).groups : null
    const runtime = (problemResult.value) ? runtimeRegex.runtime : null
    const runtimeRating = (problemResult.value) ? parseFloat(runtimeRegex.runtimeRating) / 100 : null

    const memoryRegex = (problemResult.value) ? problemResult.value.match(/Memory Usage: (?<memory>[0-9]+\.*[0-9]* MB), less than (?<memoryRating>[0-9]+\.*[0-9]*)\%/).groups : null
    const memory = (problemResult.value) ? memoryRegex.memory : null
    const memoryRating = (problemResult.value) ? parseFloat(memoryRegex.memoryRating) / 100 : null

    const data  = new FormData(recordForm);
    data.append('question_title_slug', problemTitle.value)
    data.append('difficulty', 5)
    data.append('lang_slug', codingLanguage.value)
    data.append('source_code', sourceCode.value)
    data.append('solved', solvedAt.value)
    data.append('runtime', runtime)
    data.append('runtime_rating', runtimeRating)
    data.append('memory', memory)
    data.append('memory_rating', memoryRating)
    data.append('snapshot', problemResultFile.files[0])

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
    .then((res) => res.json())
    .then((res) => {
        problemTitle.value = ''
        problemResult.value = ''
        codingLanguage.value = ''
        sourceCode.value = ''
        solvedAt.value = ''
        problemResultFile.value = ''
        toggleUploadModal()
    })
    .catch(error => {
        console.log(error)
    })
}