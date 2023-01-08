import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { DeleteIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const admin = 'Admin'
    const [users, setusers] = useState([])
    const [borrowedBooks, setBorrowedBooks] = useState([])
    const [username, setUsername] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let user = sessionStorage.getItem('username')
        if (user == '' || user == null) {
            navigate('/signin')
        }
        setUsername(user)
        if (username) {
            getUsers()
            getBorrowedBooks()
        }

    }, [])

    console.log('uuuu', username)
    const getUsers = async () => {
        const result = await fetch('http://localhost:3000/users')
        const data = await result.json()
        console.log('data users', data)
        setusers(data)
    }

    const getBorrowedBooks = async () => {
        const result = await fetch('http://localhost:3000/borrowed')
        const data = await result.json()
        console.log('borrowed users', data)
        setBorrowedBooks(data)
    }
    const  deleteUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE'
        }).then((result) => {
          result.json().then((resp) => {
            // console.log("delete", resp);
            getUsers()
          })
        })
      }
    return (
        <Flex margin='auto'>
            <Sidebar admin={admin} />
            <Flex flexDirection='column' m={5}>
                <Heading size='lg'> Users</Heading>
                {users.length > 0 ? (
                    users.map((user, index) => {
                        return (
                            <Box width='500px' height='200px' bg='gray.200' border='1px solid white' flexDir='column' textAlign='left' justifyContent='space-around'
                                borderRadius={5} p={5}>
                                <Flex justifyContent='space-between'> <span> {index + 1}  .<b>{user.name}</b> </span>
                                    <span><DeleteIcon onClick={()=>deleteUser(user.id)} /></span></Flex>
                                <Flex justifyContent='center' alignItems='center' flexDirection='column'>
                                    <Heading size='sm'>Borrowed Books</Heading>
                                    <OrderedList>{borrowedBooks.length > 0 && borrowedBooks.map((book) => {
                                        return (
                                            user.id == book.username &&
                                            <ListItem key={book.id}>{book.book_name}
                                            </ListItem>
                                        )
                                    })}
                                    </OrderedList>
                                </Flex>


                            </Box>
                        )
                    })
                    ) : (
                        <span> No users </span>
                    )
                }
            </Flex>



        </Flex>
    )
}

export default Users