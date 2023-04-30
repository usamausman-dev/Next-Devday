import React, { useEffect, useState } from 'react'
import Layout from '@/Layout/layout'
import Head from 'next/head'
import ProjectCard from '@/Components/ProjectCard'
import Link from 'next/link'
import AddProject from '@/Components/AddProject'
import JoinProject from '@/Components/JoinProject'
import { useSession, signIn, signOut } from "next-auth/react"
import axios from 'axios'

const project = () => {

    const { data: session } = useSession()
    const [projects, setProjects] = useState([])


    useEffect(() => {
        if (session?.user.email) {
            axios.post('/api/fetchprojects', { projectAdmin: session.user.email })
                .then(function (response) {
                    if (response.status === 201) {
                        setProjects(response.data.data)
                        console.log(response.data.data)
                    }
                })
                .catch(function (error) {
                    console.log(error.response);
                });

        }

    }, [session])

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

                    {
                        projects.map((val, key) => <Link key={key} href={`/project/${val._id}`}><ProjectCard projectName={val.projectName} /></Link>)
                    }

                </div>





            </div>

        </Layout>
    )
}

export default project