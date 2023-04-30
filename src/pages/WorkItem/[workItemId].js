import React, { useState } from 'react'
import Layout from '@/Layout/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'

const workItemId = () => {
    const router = useRouter()
    const [status, setStatus] = useState('Open')

    function changeStatus() {
        console.log(status)

    }
    return (
        <Layout>
            <Head>
                <title>WorkItem - {router.query.workItemId}</title>
            </Head>

            <div className='p-10'>
                <h1 className='text-3xl text-bold mb-10' >WorkItem - {router.query.workItemId}</h1>

                <div className='grid grid-cols-2 gap-10 content-center'>
                    <p className='text-bold'>Title</p>
                    <p>Worksheet Title</p>

                    <p className='text-bold'>Description</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum deserunt sequi dolorem officiis nihil recusandae odio labore magnam modi? Laboriosam?</p>

                    <p className='text-bold'>Assign To</p>
                    <p>Worksheet Title</p>


                    <p className='text-bold'>Status</p>
                    <p>Worksheet Title</p>


                    <p className='text-bold'>Category</p>
                    <p>Worksheet Title</p>


                    <p className='text-bold'>Start Date</p>
                    <p>Worksheet Title</p>


                    <p className='text-bold'>End Date</p>
                    <p>Worksheet Title</p>

                    <p className='text-bold'>Change Status</p>
                    <div className='flex'>
                        <select onChange={(e) => setStatus(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500">
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>

                        <button className='bg-orange-600 px-3 mx-3 rounded text-white' onClick={changeStatus}>Change</button>
                    </div>


                </div>



            </div>

        </Layout>
    )
}

export default workItemId