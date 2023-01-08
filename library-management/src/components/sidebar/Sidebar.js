import React from 'react'
import './sidebar.css'
import { Flex, Heading } from '@chakra-ui/react'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = ({ admin,usertoken }) => {
  return (
    <div>
      <Flex flexDirection='column' className='sidebar' width='20vw'>
        <Heading size='md' mb={5}>{admin} Dashboard</Heading>
        {
          admin &&
          <Flex mt={5} flexDir='column' p={3}>
            
            <span><Link to='/addbook'> Add book</Link>
            </span>
            <span><Link to='/editbooks'> Edit books</Link> </span>
            <span><Link to='/users'> Users</Link> </span>

          </Flex>
        }
        { usertoken &&
            <><span><Link to='/home'> Home</Link> </span>
            <span><Link to='/userpage'> My Books</Link> </span></>

        }
        <span>
          <Link to='/signin'>Logout</Link></span>
      </Flex>
    </div>
  )
}

export default Sidebar