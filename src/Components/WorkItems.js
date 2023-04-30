import React from 'react'
import AddWorkItem from './AddWorkItem'

const Workitems = ({ ProjectID }) => {
    return (
        <div className='bg-slate-900 p-2'>
            <div className='flex justify-between items-center border-b-2  p-4 text-white'>
                <div className='text-bold text-xl'>Work Items </div>
                <AddWorkItem />

            </div>

            <div>
                <table width="100%" className='table-fixed text-center border-separate border-spacing-y-3.5' cellPadding="20px">
                    <thead className='text-[#707eae]'>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Assign To</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr className='shadow-lg bg-gray-50 '>
                            <td>156788</td>
                            <td>Responsiveness</td>
                            <td>Usama Usman</td>
                            <td>Open</td>
                            <td>Bug fix</td>
                            <td>24 Apr 2023</td>
                            <td>27 Apr 2023</td>
                            <td><button onClick={() => window.location = "/WorkItem/1234"} className='bg-slate-900 text-orange-600 px-3 py-1 rounded'><i className="fa-solid fa-right-to-bracket"></i></button></td>
                        </tr>



                    </tbody>
                </table>

            </div>

        </div>
    )
}
export default Workitems