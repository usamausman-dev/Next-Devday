import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function JoinProject() {
    const [open, setOpen] = React.useState(false);
    const [project, setProject] = React.useState("")
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setProject("")
    };

    function JoinProjectHandler(e) {
        e.preventDefault();
        console.log("hello", project)
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-orange-500 text-white px-10 py-2 rounded'> <i className="fa-solid fa-plus lg:mr-3"></i>  <span className='sm:hidden md:hidden lg:inline-block'>  Join project </span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl'>Join Project</h1>
                        <button onClick={handleClose}> <i className="fa-solid fa-multiply"></i></button>

                    </div>
                </DialogTitle>
                <form onSubmit={JoinProjectHandler} >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" component="span">
                            <div className='m-5'>Please Enter the Project ID in the below Input Field</div>

                            <div className=" border rounded-xl ">
                                <input value={project} onChange={(e) => setProject(e.target.value)} className=" py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='projectName' placeholder='Project ID' required />
                            </div>

                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <button type='submit' className='bg-orange-600 px-3 py-2 rounded text-white'>Join Project</button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}