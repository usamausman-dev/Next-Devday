import React, { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { deepOrange } from '@mui/material/colors';
// import { Workitems, Backlog, Board } from '../pages'
// import AddMembers from '../components/AddMembers'
import AddMember from '@/Components/AddMembers';
import Workitems from '@/Components/WorkItems';
import Backlog from '@/Components/Backlog';


import Layout from '@/Layout/layout'
import Head from 'next/head'
import { useRouter } from 'next/router'



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component="span" >{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const projectId = () => {
    const router = useRouter()

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let members = [
        'uusman004@gmail.com',
        'babar@gmail.com',
        'usmanali@gmail.com',
        'shahbaz@gmail.com',
        'anas@gmail.com'
    ]


    return (
        <Layout>
            <Head>
                <title>Projects - {router.query.projectId}</title>
            </Head>

            <div className='p-10 w-full'>
                <div className='flex justify-between mb-5'>
                    <div className='flex items-center '>
                        <div className='text-bold text-3xl mr-6'>Project -  {router.query.projectId} </div>
                        <AvatarGroup max={4}>
                            {
                                members.map((val, key) => <Avatar key={key} sx={{ bgcolor: deepOrange[500] }}>{val.charAt(0).toUpperCase()}</Avatar>)
                            }
                        </AvatarGroup>
                    </div>
                    <AddMember />
                </div>


                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} textColor="inherit" aria-label="basic tabs example" TabIndicatorProps={{ style: { backgroundColor: "#f97316", } }}>
                            <Tab label="Work Items"  {...a11yProps(0)} />
                            <Tab label="Backlogs" {...a11yProps(1)} />
                            {/* <Tab label="Board" {...a11yProps(2)} /> */}


                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Workitems />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Backlog />
                    </TabPanel>
                    {/* <TabPanel value={value} index={2}>
                        <Board />
                    </TabPanel> */}
                </Box>
            </div>

        </Layout>
    )
}

export default projectId