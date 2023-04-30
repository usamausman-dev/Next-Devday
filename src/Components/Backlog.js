import React, { useState, useEffect } from 'react'
import AddBacklog from './AddBacklog'
import axios from 'axios'

const Backlog = ({ ProjectID }) => {


    const [task, setTasks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/getalltasks')
            .then(function (response) {
                setTasks(response.data.tasks)
                console.log(response.data.tasks)
            }).catch((e) => {
                console.log(e)
            })
    }, [])




    return (
        <div className='bg-slate-900 p-2'>
            <div className='flex justify-between items-center border-b-2  p-4 text-white'>
                <div className='text-bold text-xl'>Backlogs </div>
                <AddBacklog ProjectID={{ ProjectID }} />
            </div>

            <div>
                <table width="100%" className='table-fixed text-center border-separate border-spacing-y-3.5' cellPadding="20px">
                    <thead className='text-[#707eae]'>
                        <tr >
                            <th>ID</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Start Date</th>
                            <th>End Date</th>


                            <th>Assign</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            task.map((val, key) =>
                                <tr key={key} className='shadow-lg bg-gray-50' >
                                    <td><small>{val._id}g</small></td>
                                    <td>{val.name}</td>
                                    <td>{val.projectStatus}</td>
                                    <td>{val.nature}</td>
                                    <td>{val.startdate}</td>
                                    <td>{val.enddate}</td>

                                    <td><button onClick={() => window.location = "/Backlogs/1234"} className='bg-slate-900 text-orange-600 px-3 py-1 rounded'><i className="fa-solid fa-right-to-bracket"></i></button></td>
                                </tr>)
                        }


                        {/* <tr className='shadow-lg bg-gray-50' >
                            <td>156788</td>
                            <td>Responsiveness</td>
                            <td>24 Apr 2023</td>
                            <td>Bug fix</td>
                            <td><button onClick={() => window.location = "/Backlogs/1234"} className='bg-slate-900 text-orange-600 px-3 py-1 rounded'><i className="fa-solid fa-right-to-bracket"></i></button></td>
                        </tr> */}

                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Backlog