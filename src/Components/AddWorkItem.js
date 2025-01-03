import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function AddWorkItem({ projectID, workItems, setWorkItems }) {
    const status = ["To Do", "In Progress", "Done"];
    const priority = ["Low", "Medium", "High"];

    const [open, setOpen] = useState(false);
    const [person, setPerson] = useState('');
    const [projectStatus, setProjectStatus] = useState(status[0]);
    const [members, setMembers] = useState([]);
    const [name, setName] = useState('');
    const [projectPriority, setProjectPriority] = useState(priority[0]);
    const [startdate, setStartDate] = useState(new Date());
    const [enddate, setEndDate] = useState(new Date());

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios.get('/api/getusers')
            .then(response => {
                setMembers(response.data.users);
                setPerson(response.data.users[0]);
            })
            .catch(console.log);
    }, []);

    const AddWorkItemHandler = () => {


        const payload = {
            projectID,
            name,
            nature: projectPriority,
            startdate,
            enddate,
            projectStatus,
            person
        }

        axios.post('/api/createworkitem', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setWorkItems([...workItems, response.data.task])
                    setOpen(false);
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <div>
            <button onClick={handleClickOpen} className='bg-orange-500 text-white px-10 py-2 rounded'>
                <i className="fa-solid fa-plus lg:mr-3"></i> <span className='sm:hidden md:hidden lg:inline-block'>Add WorkItem</span>
            </button>
            <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} maxWidth="xl" fullScreen>
                <DialogTitle>
                    <div className='flex justify-between'>
                        <h1 className='text-xl'>Add WorkItem</h1>
                        <button onClick={handleClose}><i className="fa-solid fa-multiply"></i></button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className='grid grid-cols-1 gap-5'>
                        <div className='flex flex-col'>
                            <label htmlFor="name">Name</label>
                            <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Work Item Name' className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="priority">Priority</label>
                            <select required value={projectPriority} onChange={(e) => setProjectPriority(e.target.value)} className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5">
                                {priority.map((val, key) => <option key={key} value={val}>{val}</option>)}
                            </select>
                        </div>
                        <div className='grid md:grid-cols-2 gap-5'>
                            <div className='flex flex-col'>
                                <label htmlFor="startdate">Start Date</label>
                                <input required type='datetime-local' onChange={(e) => setStartDate(e.target.value)} className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="enddate">End Date</label>
                                <input required type='datetime-local' onChange={(e) => setEndDate(e.target.value)} className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5" />
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="members">Assign To</label>
                            <select required value={person} onChange={(e) => setPerson(e.target.value)} className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5">
                                {members.map((val, key) => <option key={key} value={val}>{val}</option>)}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="Status">Status</label>
                            <select required value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)} className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5">
                                {status.map((val, key) => <option key={key} value={val}>{val}</option>)}
                            </select>
                        </div>
                        <button onClick={AddWorkItemHandler} className='bg-orange-600 px-3 py-2 rounded text-white'>Add WorkItem</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
