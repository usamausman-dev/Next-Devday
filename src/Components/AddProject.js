import { useState, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useSession, signIn, signOut } from "next-auth/react"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddProject({ setProjects, projects, OrganizationId }) {
    const { data: session } = useSession();

    const [open, setOpen] = useState(false);
    const [project, setProject] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setProject("");
    };

    async function AddProjectHandler(e) {
        e.preventDefault();

        const payload = {
            projectAdmin: session.user.id,
            projectName: project,
            members: [session.user.id],
            organizationId: OrganizationId
        };

        try {
            const response = await axios.post('/api/createproject', payload);

            if (response.status === 201) {
                alert("Project Created Successfully");
                console.log(response.data)
                const newProject = response.data.project; 
                setProjects([...projects, newProject]);
                setOpen(false);
            }
        } catch (error) {
            // alert(error.response?.data?.message || "An error occurred");
            console.log(error)
        }
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-orange-500 text-white px-10 py-2 rounded'>
                <i className="fa-solid fa-plus lg:mr-3"></i>
                <span className='sm:hidden md:hidden lg:inline-block'>Add project</span>
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl'>Add Project</h1>
                        <button onClick={handleClose}><i className="fa-solid fa-multiply"></i></button>
                    </div>
                </DialogTitle>
                <form onSubmit={AddProjectHandler}>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" component="span">
                            <div className='m-5'>Please write the name of the project in the input field below:</div>
                            <div className="border rounded-xl">
                                <input
                                    value={project}
                                    onChange={(e) => setProject(e.target.value)}
                                    className="py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer"
                                    type='text'
                                    name='projectName'
                                    placeholder='Project Name'
                                    required
                                />
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button type='submit' className='bg-orange-600 px-3 py-2 rounded text-white'>Add Project</button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
