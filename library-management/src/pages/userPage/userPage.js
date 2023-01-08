import { Box, Button, Flex, Heading, ListItem, OrderedList } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsInfoSquare } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const UserPage = () => {
    const navigate = useNavigate()
    const [books, setbooks] = useState([])
    const [user, setUser] = useState('')
    const usertoken = 'usertoken'
    useEffect(() => {
        let username = sessionStorage.getItem('username')
        if (username == '' || username == null) {
            navigate('/signin')
        }
        else {
            setUser(username)
            getBorrowedBooks()
        }
    }, [])

    const getBorrowedBooks = async () => {
        const result = await fetch('http://localhost:3000/borrowed')
        const data = await result.json()
        console.log('data u', data)
        setbooks(data)
    }
    const deleteuser = (id) => {
        fetch(`http://localhost:3000/borrowed/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                // console.log("delete", resp);
                getBorrowedBooks()
            })
        })
    }
    // console.log('token', user)
    return (
        <Flex >
            <Sidebar usertoken={usertoken}/>
            <Box m={10} >
                <Heading m={5}> My Books</Heading>
                <OrderedList>{
                    books.length > 0 &&
                    books.map((book) => {
                        return (
                            user == book.username &&

                            <ListItem key={book.id} width={300} >{book.book_name}
                                <Button size='sm' p={2} ml={10} onClick={() => deleteuser(book.id)} mb={3}> Return</Button>
                            </ListItem>

                        )
                    })

                }
                </OrderedList>

            </Box>

        </Flex>
    )
}

export default UserPage