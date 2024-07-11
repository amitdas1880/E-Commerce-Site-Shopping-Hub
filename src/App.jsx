import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/Home/Home';
import Order from './Pages/Order/Order';
import NoPage from './Pages/NoPage/NoPage';
import Carts from './Pages/Carts/Carts';
import DashBoard from './Pages/Admin/DashBoard/dashBoard';
import MyState from './Context/data/myState';
import Login from './Pages/Registration/Login';
import Signup from './Pages/Registration/Signup';
import ProductInfo from './Pages/ProductInfo/ProductInfo';
import AddProduct from './Pages/Admin/Pages(Add&Update)/AddProduct';
import UpdateProduct from './Pages/Admin/Pages(Add&Update)/UpdateProduct';
import AllProduct from './Pages/AllProducts/AllProduct';
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = JSON.parse(localStorage.getItem('localUser'));

  return (
    <>
      <MyState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProduct />} />
          
          <Route path="/order" element={
          <ProtectedRoutesForUser>
            <Order />
          </ProtectedRoutesForUser>
          } />
          
          <Route path="/cart" element={<Carts />} />
          
          {!user ?
          <Route path="/login" element={<Login />} />
          :<Route path="/*" element={<NoPage />} />}
          
          {!user ?
          <Route path="/signup" element={<Signup />} />
          :<Route path="/*" element={<NoPage />} />}
          

          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin>
              <DashBoard />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/addProduct" element={
          <ProtectedRoutesForAdmin>
            <AddProduct />
          </ProtectedRoutesForAdmin>
          } />
          <Route path="/updateProduct" element={
          <ProtectedRoutesForAdmin>
            <UpdateProduct />
          </ProtectedRoutesForAdmin>
          } />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
      </MyState>
    </>
  )
}

export default App

//User
export const ProtectedRoutesForUser = ({children})=>{
  const getUserData = localStorage.getItem('localUser');
  if(getUserData){
    return children ;
  }else{
    return <Navigate to="/login"/> ;
  }
}



//Admin 
export const ProtectedRoutesForAdmin =({children})=>{
  const getUserData = JSON.parse(localStorage.getItem('localUser'));
  if( getUserData.user.email === "amitdas1880@gmail.com"){
      return children ;
  }else{
    return <Navigate to='/login'/> ;
  }
  
}

//Note : the data comes from  local-storage is JSON(string) format  and the firebase store data in object format. so, convert it from JSON(string) format into object format .