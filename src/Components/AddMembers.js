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

export default function AddMember() {
    const [open, setOpen] = React.useState(false);
    const [person, setPerson] = React.useState('');

    var members = [
        'uusman004@gmail.com',
        'babar@gmail.com'
    ]



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    function AddMemberHandler(e) {
        console.log("hello", person)
    }

    return (
        <div>
            <button onClick={handleClickOpen} className='bg-orange-500 text-white px-10 py-2 rounded'> <i className="fa-solid fa-plus lg:mr-3"></i>  <span className='sm:hidden md:hidden lg:inline-block'>Add member</span></button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-xl'>Add Member</h1>
                        <button onClick={handleClose}> <i className="fa-solid fa-multiply"></i></button>

                    </div>
                </DialogTitle>

                <form onSubmit={AddMemberHandler}>

                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description" component="span">
                            <div className='m-5'>Please Enter the Member Email in the below Input Field</div>

                            <select onChange={(e) => setPerson(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 ">
                                {
                                    members.map((val, key) => <option key={key} value={val}>{val}</option>)
                                }
                            </select>

                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <button type='submit' className='bg-orange-600 px-3 py-2 rounded text-white'>Add Member</button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    );
}