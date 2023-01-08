import { IconButton, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { SearchIcon } from "@chakra-ui/icons";
import { BookState } from '../../context/Context';

function SearchBox() {
    const { searchTerm, setSearchTerm, isSearch, setIsSearch } = BookState()
    console.log('sbox', searchTerm)
    return (
        <>
            <Input placeholder='Search books' width={{ base: 'lg' }} color='black' bg='white'
                onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}
            />
            <IconButton aria-label='Search database' icon={<SearchIcon />} colorScheme='blue' ml='5px' onClick={setIsSearch(true)} />
        </>
    )
}

export default SearchBox

export const searchBooks = (books) => {
    const { searchTerm, isSearch } = BookState()

    if (isSearch && searchTerm) {
        const searchArray = searchTerm.split(" ").map((item) => item.toLowerCase())
        books = books.filter((item) => {
            if (searchArray.includes(item.book_name.toLowerCase()) && searchArray.includes(item.author_name.toLowerCase())) {
                return item
            }
            else if (searchArray.length <= 1) {
                return searchArray.includes(item.book_name.toLowerCase()) ||
                    searchArray.includes(item.author_name.toLowerCase()) ||
                    searchArray.includes(item.publisher_name.toLowerCase())
            }
        })
        return books
    }
    return books
}