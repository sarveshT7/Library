import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const AdminPage = () => {
    const admin = 'Admin'
    const navigate = useNavigate()
    useEffect(() => {
      let username = sessionStorage.getItem('username')
      if (username == '' || username == null) {
          navigate('/signin')
      }
      // else {
      //     setUser(username)
      //     getBorrowedBooks()
      // }
  }, [])
  return (
    <div>
        <Sidebar admin={admin}/>
    </div>
  )
}

export default AdminPage