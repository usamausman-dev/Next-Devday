import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddMember({ projectdataid }) {
    const [open, setOpen] = React.useState(false);
    const [person, setPerson] = React.useState('');
    const [members, setMembers] = React.useState([])

    React.useEffect(() => {
        axios.get('/api/getusers')
            .then(function (response) {
                setMembers(response.data.users)
            }).catch((e) => {
                console.log(e)
            })



    }, [])

    // var members = [
    //     'uusman004@gmail.com',
    //     'babar@gmail.com'
    // ]



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    function AddMemberHandler(e) {
        e.preventDefault();

        const payload = {
            person, projectdataid
        }


        axios.post('/api/addmembers', payload)
            .then(function (response) {
                if (response.status === 201) {
                    setOpen(false)
                    alert('added Successfully')
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log("while getting", error.response);
            });
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