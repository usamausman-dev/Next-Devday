import React from 'react'
import Sidebar from '@/Components/sidebar'

export default function Layout({ children }) {
    return (
        <div className='flex' >
            <Sidebar />
            {/* <div className='p-10 flex-1 h-screen overflow-y-scroll bg-slate-500'> */}
            {children}
            {/* </div> */}
        </div>
    )
}
