import React, { useEffect, useState } from 'react'
import Layout from '@/Layout/layout'
import Head from 'next/head'
import ProjectCard from '@/Components/ProjectCard'
import Link from 'next/link'
import AddProject from '@/Components/AddProject'
import JoinProject from '@/Components/JoinProject'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'
import { useRouter } from 'next/router'


const project = () => {

    const { data: session } = useSession()
    const [projects, setProjects] = useState([])
    const router = useRouter()



    useEffect(() => {
        if (router.query.OrganizationId) {
            axios.get(`/api/getOrganization?id=${router.query.OrganizationId}`)
                .then(function (response) {
                    setProjects(response.data.data.projects)
                    console.log(response.data.data.projects)
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    }, [router.query.OrganizationId])

    return (
        <Layout>
            <Head>
                <title>Projects</title>
            </Head>

            <div className='p-10  w-full'>

                <div className='flex justify-between'>
                    <h1 className='font-bold text-3xl'><Link href='/dashboard'>{router.query.OrganizationId}</Link>/Projects </h1>
                    <div className='flex gap-3'>
                        <AddProject setProjects={setProjects} projects={projects} OrganizationId={router.query.OrganizationId} />
                    </div>


                </div>

                <div className='grid lg:grid-cols-4 sm:grid-cols-2 mt-10 gap-10'>

                    {
                        projects.map((val, key) => <Link key={key} href={`/project/${val._id}`}><ProjectCard projectName={val.projectName} /></Link>)
                    }

                </div>





            </div>

        </Layout>
    )
}

export default project