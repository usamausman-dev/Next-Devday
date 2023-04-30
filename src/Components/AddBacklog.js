import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddBacklog({ ProjectID }) {

    let status = ['open', 'In Progress', 'closed']

    const [open, setOpen] = useState(false);
    const [projectStatus, setProjectStatus] = useState(status[0]);
    const [name, setName] = useState('');
    const [nature, setNature] = useState('')
    const [startdate, setStartDate] = useState(new Date())
    const [enddate, setEndDate] = useState(new Date())
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    function AddBacklogHandler() {

        let payload = { ProjectID, name, nature, startdate, enddate, projectStatus, person: "" }
        console.log(payload)

        axios.post('/api/createtask', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setOpen(false);
                    router.reload();

                }
            })
            .catch(function (error) {
                console.log(error.response);
            });

    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-orange-500 text-white px-10 py-2 rounded'> <i className="fa-solid fa-plus lg:mr-3"></i> <span className='sm:hidden lg:inline-block'> Add Backlog</span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                maxWidth="xl"
                fullScreen={true}
            >
                <DialogTitle>
                    <div className='flex   justify-between'>
                        <h1 className='text-xl'>Add Backlog</h1>
                        <button onClick={handleClose}> <i className="fa-solid fa-multiply"></i></button>

                    </div>
                </DialogTitle>



                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" component="span">

                        <div className='grid grid-cols-1 gap-5'>
                            <div className='flex flex-col  '>
                                <label htmlFor="name">Name</label>
                                <input required value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" placeholder='Backlog Name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                            </div>



                            <div className='flex flex-col  '>
                                <label htmlFor="nature">Nature</label>
                                <input required type="text" value={nature} onChange={(e) => setNature(e.target.value)} name="nature" id="nature" placeholder='Nature' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                            </div>



                            <div className='flex flex-col  '>
                                <label htmlFor="startdate">Start Date</label>
                                <input required type='datetime-local' onChange={(e) => setStartDate(e.target.value)} name="startdate" id="startdate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                            </div>



                            <div className='flex flex-col  '>
                                <label htmlFor="enddate">End Date</label>
                                <input required type='datetime-local' onChange={(e) => setEndDate(e.target.value)} name="enddate" id="enddate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5" />
                            </div>


                            <div className='flex flex-col'>
                                <label htmlFor="Status">Status</label>


                                <select required id='Status' name='Status' onChange={(e) => setProjectStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ">
                                    {
                                        status.map((val, key) => <option key={key} value={val}>{val}</option>)
                                    }
                                </select>
                            </div>
                            <button onClick={AddBacklogHandler} className='bg-orange-600 px-3 py-2 rounded text-white'>Add Backlog</button>
                        </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}