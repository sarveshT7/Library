import React, { createContext, useContext, useState } from 'react'
 const BookContext = createContext()
export const Context = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearch, setIsSearch] = useState(false)

    return (
        <BookContext.Provider value={{ searchTerm, setSearchTerm, isSearch, setIsSearch }}>
            {children}
        </BookContext.Provider>
    )
}

export default Context
export const BookState = () => {
    return useContext(BookContext)
}