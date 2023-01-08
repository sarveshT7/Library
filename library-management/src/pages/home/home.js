import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Flex, Box, Heading } from '@chakra-ui/react'
import Book from '../../components/books/Book'
import SearchBox, { searchBooks } from '../../components/searchbox/SearchBox'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [books, setbooks] = useState([])
    const usertoken = 'usertoken'

   
    const navigate = useNavigate()
    useEffect(() => {
        getBooks();
      let username = sessionStorage.getItem('username')
      if (username == '' || username == null) {
          navigate('/signin')
      }
      // else {
      //     setUser(username)
      //     getBorrowedBooks()
      // }
  }, [])

    const getBooks = async () => {
        const result = await fetch('http://localhost:3000/books')
        const data = await result.json()
        console.log('data', data)
        setbooks(data)
    }
    const searchedBooks = searchBooks(books)

    return (
        <Flex>
            <Sidebar usertoken={usertoken} />
            <Flex mt={5} flexDirection='row' width='100%' flexWrap='wrap' justifyContent='space-evenly' alignItems='center'>
                <Flex alignItems='center' justifyContent='center' width={{ base: '350px', lg: '100%', xl: '100%' }} mb={5}>
                    <SearchBox books={books} />
                </Flex>
                {
                    searchedBooks.length > 0 ? (searchedBooks.map((book) => {
                        return (
                            <Book prod={book} />

                        )
                    })) : (
                        <Heading width='700' size={'lg'} textAlign='center' p='60px'>No Books found</Heading >

                    )
                }
            </Flex>
        </Flex>

    )
}

export default Home