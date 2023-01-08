import './App.css';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/home';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import UserPage from './pages/userPage/userPage';
import AdminPage from './pages/adminPage/AdminPage';
import AddBook from './pages/addBook/AddBook';
import Users from './pages/users/Users';
import EditBooks from './pages/editBooks/EditBooks';
import EditForm from './pages/editForm/EditForm';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
let username = sessionStorage.getItem('username')
console.log('username app token',username)
 
  }, [])
  
  return (
    <div className="App">
      {/* <Signin/> */}
      {/* <Signup /> */}
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Signup />} exact />
          <Route path='/home' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/userpage' element={<UserPage />} />
          <Route path='/adminpage' element={<AdminPage />} />
          <Route path='/addbook' element={<AddBook />} />
          <Route path='/users' element={<Users />} />
          <Route path='/editbooks' element={<EditBooks />} />
          <Route path='/editform' element={<EditForm />} />



        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
