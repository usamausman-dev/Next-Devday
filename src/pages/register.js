import React, { useState } from 'react'
import { register_validation } from '../../lib/validation'
import { useFormik } from 'formik';
import { HiAtSymbol, HiFingerPrint, HiUser } from 'react-icons/hi'
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react'

const Register = () => {

    const [show, setShow] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        },
        onSubmit,
        validate: register_validation
    });

    async function onSubmit(values) {
        
        console.log(values)

    }
    return (
        <div className='flex h-screen bg-orange-500'>
            <div className='m-auto bg-slate-50 rounded-md w-3/5  grid lg:grid-cols-2'>

                <div className='sm:hidden rounded  lg:block bg-[url("https://www.systemsltd.com/wp-content/uploads/2019/10/systems-limited-first-half-of-2019-img.jpg")] '>
                </div>

                <div className='right flex flex-col justify-evenly'>
                    <div className='text-center py-10'>
                        <section className='w-3/4 mx-auto flex flex-col gap-5'>
                            <div className='title'>
                                <h1 className='text-gray text-4xl font-bold py-4'>Register</h1>
                                <p className='w-3/4 mx-auto text-gray-400'>lorem ipsum text goes from here</p>
                            </div>
                            <form className='flex flex-col gap-3' onSubmit={formik.handleSubmit}>


                                <div className={formik.errors.firstName && formik.touched.firstName ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='firstName' placeholder='First Name'
                                        {...formik.getFieldProps('firstName')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-orange-500'>  <HiUser size={25} /></span>
                                </div>

                                <div className={formik.errors.lastName && formik.touched.lastName ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='text' name='lastName' placeholder='Last Name'
                                        {...formik.getFieldProps('lastName')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-orange-500'>  <HiUser size={25} /></span>
                                </div>

                                <div className={formik.errors.email && formik.touched.email ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6 rounded-xl bg-transparent focus:outline-none border-none peer" type='email' name='email' placeholder='Email'
                                        {...formik.getFieldProps('email')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-orange-500'>  <HiAtSymbol size={25} /></span>
                                </div>

                                <div className={formik.errors.password && formik.touched.password ? "flex border rounded-xl relative border-red-700 " : "flex border rounded-xl relative"}>
                                    <input className="w-full py-4 px-6  rounded-xl bg-slate-50 focus:outline-none border-none peer" type={`${show ? "text" : "password"}`} name='password' placeholder='Password'
                                        {...formik.getFieldProps('password')}
                                    />
                                    <span className='icon flex items-center px-4 peer-focus:text-orange-500 hover:cursor-pointer hover:text-orange-500' onClick={() => setShow(!show)}> <HiFingerPrint size={25} /> </span>
                                </div>

                                <div>
                                    <button className='w-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-md py-3 text-gray-50 text-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-orange-500 hover:border-orange-500  hover:border' type='submit'>Sign Up</button>
                                </div>
                            </form>
                            <p className='text-center text-gray-400'>
                                Already have an Account?
                                <Link className='ml-2 text-orange-500' href="/login">Sign In</Link>
                            </p>
                        </section>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Register