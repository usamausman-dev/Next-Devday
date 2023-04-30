import React from 'react'
import Layout from '@/Layout/layout'
import Head from 'next/head'
import ProjectCard from '@/Components/ProjectCard'
import Link from 'next/link'
import AddProject from '@/Components/AddProject'
import JoinProject from '@/Components/JoinProject'

const project = () => {
    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>

            <div className='p-10'>

                <div className='flex justify-between'>
                    <h1 className='text-bold text-3xl'>Projects </h1>
                    <div className='flex gap-3'>
                        <JoinProject />
                        <AddProject />
                    </div>


                </div>

                <div className='grid lg:grid-cols-4 sm:grid-cols-2 mt-10 gap-10'>
                    <Link href={'/project/1234'}><ProjectCard /></Link>
                </div>





            </div>

        </Layout>
    )
}

export default project