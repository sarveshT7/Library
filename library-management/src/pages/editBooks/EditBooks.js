import { Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Book from '../../components/books/Book'
import SearchBox, { searchBooks } from '../../components/searchbox/SearchBox'
import Sidebar from '../../components/sidebar/Sidebar'

const EditBooks = () => {
    const admin = 'Admin'
    const [books, setbooks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        let username = sessionStorage.getItem('username')
        if (username == '' || username == null) {
            navigate('/signin')
        }

        getBooks();
        //  username = sessionStorage.getItem('username')
    }, [])

    const getBooks = async () => {
        const result = await fetch('http://localhost:3000/books')
        const data = await result.json()
        console.log('data', data)
        setbooks(data)
    }

    const searchedBooks = searchBooks(books)

    return (
        <Flex >
            <Sidebar admin={admin} />
            <Flex mt={5} flexDirection='row' width='100%' flexWrap='wrap' justifyContent='space-evenly' alignItems='center'>
                <Flex alignItems='center' justifyContent='center' width={{ base: '350px', lg: '100%', xl: '100%' }} mb={5}>
                    <SearchBox books={books} />
                </Flex>
                {
                    searchedBooks.length > 0 ? (searchedBooks.map((book) => {
                        return (
                            <Book prod={book} admin={admin} getBooks={getBooks} />

                        )
                    })) :
                        <Heading width='700' size={'lg'} textAlign='center' p='60px'>No Books found</Heading >

                }
            </Flex>
        </Flex>
    )
}

export default EditBooks