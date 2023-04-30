import React from 'react'
import Layout from '@/Layout/layout'
import Head from 'next/head'
import OrganizationCards from '@/Components/OrganizationCards'

const dashboard = () => {
  return (
    <Layout>
      <Head>
        <title>Dashbaord</title>
      </Head>

      <div className='p-10'>
        <h1 className='text-bold text-3xl'>Organizations</h1>
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 mt-10 gap-10'>
          <OrganizationCards />
          <OrganizationCards />
          <OrganizationCards />
        </div>
      </div>

    </Layout>
  )
}

export default dashboard