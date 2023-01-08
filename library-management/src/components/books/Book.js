import React, { useEffect } from 'react'
import { Card, CardBody, Image, Stack, Heading, HStack, Text, Button, VStack, useToast, Flex, Popover, PopoverTrigger, PopoverContent, PopoverCloseButton, PopoverHeader, PopoverBody, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import BookFormComponent from '../BookComponent/BookFormComponent'

const Book = ({ prod, admin ,getBooks}) => {
    const toast = useToast()
    const navigate = useNavigate()
  const {  onClose } = useDisclosure()

    
    useEffect(() => {
        let username = sessionStorage.getItem('username')
        console.log('username', username)
    }, [])

    const rentBooks = (prod) => {
        console.log('production', prod)
        let username = sessionStorage.getItem('username')
        const data = {
            book_name: prod.book_name,
            image_url: prod.image_url,
            username: username
        }
        fetch("http://localhost:3000/borrowed", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }).then((res) => {
            console.log('response', res)

            toast({
                title: 'borrowed successfully',
                description: 'book borrowed',
                status: 'success',
                duration: 4000,
                position: 'top',
            })
        }).catch((err) => {
            toast({
                title: 'book not borrowed',
                description: 'something went wrong',
                status: 'error',
                duration: 4000,
                position: 'top',
            })
        })
    }

    const editBooks = (prod) => {

        console.log('edited books', prod)
    }
    const  deleteBooks = (id) => {
        fetch(`http://localhost:3000/books/${id}`, {
          method: 'DELETE'
        }).then((result) => {
          result.json().then((resp) => {
            // console.log("delete", resp);
            toast({
                title: 'book deleted',
                description: 'book is deleted',
                status: 'success',
                duration: 4000,
                position: 'top',
            })
            getBooks()
          })
        })
      }
    return (
        <div>
            <Card width={300} height={400}  >
                <CardBody>
                    <Image
                        src={prod.image_url}
                        alt='Green double'
                        borderRadius='lg'
                        width='250px'
                        height='200px'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>
                            {prod.book_name}
                        </Heading>

                    </Stack>
                    <VStack justifyContent='space-between'>
                        <Text color='blue.600' fontSize='15px'>
                            Author: <b>{prod.author_name}</b>
                        </Text>
                        <Text color='blue.600' fontSize='15px'>
                            Publisher: <b>{prod.publisher_name}</b>
                        </Text>
                        {
                            admin ? (<Flex flexDirection='row' gap={5} >

                                <Popover placement='right'onClose={onClose} >
                                    <PopoverTrigger>
                                        <Button size='md' colorScheme='blue'>Edit</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>

                                        <PopoverCloseButton />
                                        <PopoverHeader>Edit Book!</PopoverHeader>
                                        <PopoverBody><BookFormComponent prod={prod} getBooks={getBooks} onClose={onClose}/></PopoverBody>
                                    </PopoverContent>
                                </Popover>

                                <Button size='md' colorScheme='blue'
                                    onClick={() => deleteBooks(prod.id)}>Delete</Button>
                            </Flex>) : (<Button size='md' colorScheme='blue'
                                onClick={() => rentBooks(prod)}>Rent now</Button>)
                        }

                    </VStack>
                </CardBody>
            </Card>
        </div>
    )
}

export default Book