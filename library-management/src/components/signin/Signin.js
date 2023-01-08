import { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react'
import { BsInfoSquare } from "react-icons/bs";



const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.clear()
    }, [])



    const handleShowClick = () => setShowPassword(!showPassword);
    const isValidate = () => {
        let proceed = true
        if (username === '' || username === null) {
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
        if (password === '' || password === null) {
            proceed = false
            toast({
                title: 'Fill the fields',
                description: 'please enter the password',
                status: 'warning',
                duration: 4000,
                position: 'top',

            })
        }
        return proceed

    }
    const handleLogin = (e) => {
        e.preventDefault()
        if (isValidate()) {
            // console.log('signin success')
            if (username == 'admin' && password == '12345') {
                sessionStorage.setItem('username', username)
                navigate('/adminpage')
            }
            else {
                fetch('http://localhost:3000/users/' + username).then((res) => {
                    return res.json()
                }).then((resp) => {
                    console.log('resp', resp)
                    if (Object.keys(resp).length === 0) {
                        toast({
                            title: 'Fill the fields',
                            description: 'please enter the username',
                            status: 'warning',
                            duration: 4000,
                            position: 'top',

                        })
                    }
                    else if (resp.password === password) {
                        toast({
                            title: 'login successful',
                            description: 'success',
                            status: 'success',
                            duration: 4000,
                            position: 'top',

                        })
                        sessionStorage.setItem('username', username)
                        navigate('/userpage')
                    } else {
                        toast({
                            title: 'Fill the fields',
                            description: 'please enter the valid credentials',
                            status: 'warning',
                            duration: 4000,
                            position: 'top',

                        })
                    }
                }).catch((err) => {
                    toast({
                        title: 'login failed',
                        description: 'login failed',
                        status: 'warning',
                        duration: 4000,
                        position: 'top',

                    })
                })
            }
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
                        <form onSubmit={handleLogin}>
                            <Stack
                                spacing={4}
                                p="1rem"
                                backgroundColor="whiteAlpha.900"
                                boxShadow="md"
                                height='230px'
                                borderRadius={5}
                            >
                                <FormControl mt={5} isRequired>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            color='gray.300'
                                            children={<FaUserAlt color="gray.300" />}
                                        />
                                        <Input type="text" placeholder="enter username"
                                            value={username} onChange={(e) => setUsername(e.target.value)} />
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
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
                <Box>
                    New to us?{" "}
                    <Link color="teal.500" to='/signup'>
                        Sign Up
                    </Link>
                </Box>
            </Flex>
        </div>
    )
}

export default Signin