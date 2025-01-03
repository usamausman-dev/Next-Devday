import React from 'react'

const OrganizationCards = ({ projectsLength, organizationName }) => {
    return (
        <div className='shadow-lg rounded-lg flex-col flex justify-between border-black-600/20 border-2'>
            <div>
                <img className='rounded' src="https://img.freepik.com/free-vector/geometric-groovy-pattern_23-2148854270.jpg?w=2000" alt="cardImg" srcSet="" />
            </div>
            <div className='flex justify-around py-5 text-bold'>
                <div>{organizationName}</div>
                <div>Projects<span className='ml-1 text-orange-600  text-xs'> - {projectsLength}</span></div>
            </div>

        </div>
    )
}

export default OrganizationCards