import React, { useEffect, useState } from 'react'
import { Text, Flex } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { BsCart4, BsInfoSquare } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Header = () => {

    // const [username, setUsername] = useState('')
    useEffect(() => {
        // setUsername(user)

    }, [])
    let user = sessionStorage.getItem('username')

    console.log('user token', user)

    return (
        <div>
            <Flex flexDirection='row' alignItems='center' p={6} color='white' bg='teal.700' justifyContent='space-between' width='100%'>
                <Text width={{ base: '40%' }} fontSize={{ base: 20, xl: 25, lg: 25 }}>Library Management</Text>
                <Flex >
                    <Flex justifyContent='space-between' alignItems='center' width='150px' >
                       
                        {/* {
                            user && user != 'admin' &&< Link to='/userpage' >Dashboard</Link>
                        } */}
                </Flex>

            </Flex>
        </Flex>
        </div >
    )
}

export default Header