import React, { useState, useEffect } from 'react'
import Layout from '@/Layout/layout'
import Head from 'next/head'
import OrganizationCards from '@/Components/OrganizationCards'
import { useSession } from "next-auth/react"
import axios from 'axios'
import Link from 'next/link'
import AddOrganization from '@/Components/AddOrganization'


const dashboard = () => {
  const { data: session } = useSession()
  const [organizations, setOrganizations] = useState([])

  useEffect(() => {
    if (session?.user.id) {
      axios.get(`http://localhost:3000/api/getOrganizationByuid?createdBy=${session.user.id}`).then((res) => {
        setOrganizations(res.data.organizations)
      })
        .catch(err => console.log(err))

    }

  }, [session])


  return (
    <Layout>
      <Head>
        <title>Dashbaord</title>
      </Head>

      <div className='p-10 w-full'>
        <div className='flex justify-between'>
          <div>
            <h1 className='font-bold text-3xl'>Organizations </h1>
            <p className='mt-3'>Navigate to your Organizations to preview Projects</p>
          </div>

          <AddOrganization organizations={organizations} setOrganizations={setOrganizations} />
        </div>

        <div className='grid lg:grid-cols-4 sm:grid-cols-2 mt-10 gap-10'>
          {
            organizations.map((organization) => <Link key={organization._id} href={`/projects/${organization._id}`}><OrganizationCards projectsLength={organization.projects.length} organizationName={organization.organizationName} /></Link>)
          }


        </div>
      </div>

    </Layout>
  )
}

export default dashboard