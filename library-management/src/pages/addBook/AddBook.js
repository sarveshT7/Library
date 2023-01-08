import { Button, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BookFormComponent from '../../components/BookComponent/BookFormComponent'
import Sidebar from '../../components/sidebar/Sidebar'

const AddBook = () => {
    const admin = 'Admin'
    const navigate = useNavigate()
    useEffect(() => {
      let username = sessionStorage.getItem('username')
      if (username == '' || username == null) {
          navigate('/signin')
      }
  }, [])
    return (
        <Flex flexDir='row' >
            <Sidebar admin={admin} />
            <Flex margin='auto'> 
            <BookFormComponent/>
            </Flex>
        </Flex >
    )
}

export default AddBook