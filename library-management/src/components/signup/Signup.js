import React from 'react'
import { useState } from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import { BsInfoSquare } from 'react-icons/bs';


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [id, setUserid] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const navigate = useNavigate()


    const handleShowClick = () => setShowPassword(!showPassword);
    const isValidate = () => {
        console.log('id', id, password, name)
        let proceed = true
        if (id == '' || id == null) {
            proceed = false
            toast({
                title: 'Fill the fields',
                description: 'please enter the username',
                status: 'warning',
                duration: 4000,
                position: 'top',
                isClosable: true,
            }) 
        }
        if (password == '' || password == null) {
            proceed = false
            toast({
                title: 'Fill the fields',
                description: 'please enter the password',
                status: 'warning',
                duration: 4000,
                position: 'top',

            }
            )
        }
        return proceed

    }
    const userData = (e) => {
        e.preventDefault();
        let userObject = { id, name, password }
        console.log(userObject)
        if (isValidate()) {
            fetch("http://localhost:3000/users", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userObject)
            }).then((resp) => {
                toast({
                    title: 'account created',
                    description: 'account created',
                    status: 'success',
                    duration: 4000,
                    position: 'top',
                })
                navigate('/signin')
            }).catch((err) => {
                toast({
                    title: 'account not created',
                    description: 'something went wrong',
                    status: 'error',
                    duration: 4000,
                    position: 'top',
                })
            })

        }

    }

    return (
        <div>
            <Flex
                flexDirection="column"
                // width="100vw"
                height="87vh"
                backgroundColor="gray.200"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Avatar bg="teal.400" />
                    <Heading color="teal.400">Welcome</Heading>
                    <Box minW={{ base: "90%", md: "500px" }} >
                        <form onSubmit={userData}>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                                height='260px'
                                borderRadius={5}
                            >
                                <FormControl mt={5}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color='gray.300'
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input type="text" placeholder="enter name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color='gray.300'
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input type="text" placeholder="enter username" value={id} onChange={(e) => setUserid(e.target.value)} />
                                    </InputGroup>
                                </FormControl>
                                <FormControl isRequired>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color="gray.300"
                                            children={<FaLock color="gray.300" />}
                                        />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password} onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? "Hide" : "Show"}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>


                                <Button
                                    borderRadius={0}
                                    type="submit"
                                    variant="solid"
                                    colorScheme="teal"
                                    width="full"
                                >
                                    Signup
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    <Link color="teal.500" to='/signin'>
                        Login
                    </Link>
                </Box>
            </Flex>
        </div>
    )
}

export default Signup