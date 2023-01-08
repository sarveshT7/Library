import { Button, Flex, FormControl, FormLabel, Input, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BookComponent = ({ prod, getBooks, onClose }) => {
    const toast = useToast()
    const navigate = useNavigate()

    const [bookname, setBookname] = useState('')
    const [authorname, setAuthorname] = useState('')
    const [publishername, setPublishername] = useState('')
    const [imgageurl, setImgageurl] = useState('')
    console.log('booksss', bookname, authorname, publishername, imgageurl)

    const handleAddBook = (e) => {
        e.preventDefault();
        let userObject = { book_name: bookname, author_name: authorname, publisher_name: publishername, image_url: imgageurl }
        console.log(userObject)
        // if (isValidate()) {
        fetch("http://localhost:3000/books", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userObject)
        }).then((resp) => {
            toast({
                title: 'book inserted',
                description: 'book inserted',
                status: 'success',
                duration: 4000,
                position: 'top',
            })
            setBookname('')
            setAuthorname('')
            setPublishername('')
            setImgageurl('')
            // navigate('/')
        }).catch((err) => {
            toast({
                title: 'book not inserted',
                description: 'something went wrong',
                status: 'error',
                duration: 4000,
                position: 'top',
            })
        })

        // }

    }
    useEffect(() => {
        if (prod) {
            console.log('prooood', prod)
            setBookname(prod.book_name)
            setAuthorname(prod.author_name)
            setPublishername(prod.publisher_name)
            setImgageurl(prod.image_url)
        }


    }, [])
    const handleUpdate = () => {
        const data = {
            book_name: bookname,
            author_name: authorname,
            publisher_name: publishername,
            image_url: imgageurl
        }
        console.log('data bkc', data)
        fetch(`http://localhost:3000/books/${prod.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.log("put resp", resp);
                // setemployee(resp) 
                toast({
                    title: 'book updated',
                    description: 'book updated',
                    status: 'success',
                    duration: 4000,
                    position: 'top',
                })

                getBooks()
               navigate('/users')


            })
        }).catch((err) => {
            toast({
                title: 'book not inserted',
                description: 'something went wrong',
                status: 'error',
                duration: 4000,
                position: 'top',
            })
        })
    }

    return (
        <div>
            <Flex flexDir='column'>

                <form onSubmit={handleAddBook}>
                    <FormControl isRequired >
                        <FormLabel>Book name</FormLabel >
                        <Input placeholder='book' mb={5}
                            value={bookname} onChange={(e) => setBookname(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired >
                        <FormLabel>Author name</FormLabel>
                        <Input placeholder='author' mb={5}
                            value={authorname} onChange={(e) => setAuthorname(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired >
                        <FormLabel>Publisher name</FormLabel>
                        <Input placeholder='publisher' mb={5}
                            value={publishername} onChange={(e) => setPublishername(e.target.value)} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Image Url</FormLabel>
                        <Input placeholder='url' mb={5}
                            value={imgageurl} onChange={(e) => setImgageurl(e.target.value)} />
                    </FormControl>
                    {
                        !prod && (<Button size='md' type='submit'> Add</Button>)

                    }
                </form>
                {
                    prod && (<Button size='md' type='submit' onClick={handleUpdate}> Save</Button>)
                }

            </Flex >
        </div>
    )
}

export default BookComponent
