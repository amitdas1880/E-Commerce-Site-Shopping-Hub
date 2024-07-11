import React from 'react'
import Navbar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
function Layout({children}) {
  return (
    <>
    <Navbar/>
    <div className='contant'>
            {children}
    </div>
    <Footer/>
    </>
  )
}

export default Layout