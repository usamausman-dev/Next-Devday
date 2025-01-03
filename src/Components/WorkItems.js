import React, { useState, useEffect } from 'react'
import AddWorkItem from './AddWorkItem'
import axios from 'axios'
import { convertToDateFormat } from '@/utils';

const Workitems = ({ ProjectID }) => {

    const [workItems, setWorkItems] = useState([])

    useEffect(() => {
        if (ProjectID) {
            axios.get(`/api/getworkitems?projectID=${ProjectID}`)
                .then(function (response) {
                    setWorkItems(response.data.workItems)
                    console.log(response.data.workItems)
                }).catch((e) => {
                    console.log(e)
                })
        }

    }, [ProjectID])
    return (
        <div className='bg-slate-900 p-2'>
            <div className='flex justify-between items-center border-b-2  p-4 text-white'>
                <div className='text-bold text-xl'>Work Items </div>
                <AddWorkItem projectID={ProjectID} workItems={workItems} setWorkItems={setWorkItems} />

            </div>

            <div>
                <table width="100%" className='table-fixed text-center border-separate border-spacing-y-3.5' cellPadding="20px">
                    <thead className='text-[#707eae]'>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Assign To</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Start Date</th>
                            <th>Due Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            workItems.map((item) => <tr key={item._id} className='shadow-lg bg-gray-50 text-xs '>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.person}</td>
                                <td>{item.projectStatus}</td>
                                <td>{item.nature}</td>
                                <td>{convertToDateFormat(item.startdate)}</td>
                                <td>{convertToDateFormat(item.enddate)}</td>
                                <td><button onClick={() => window.location = "/WorkItem/1234"} className='bg-slate-900 text-orange-600 px-3 py-1 rounded'><i className="fa-solid fa-right-to-bracket"></i></button></td>
                            </tr>)
                        }





                    </tbody>
                </table>

            </div>

        </div>
    )
}
export default Workitems