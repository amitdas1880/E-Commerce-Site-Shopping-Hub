import React, { useContext, useState } from 'react'
import './Style.css';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FaSun } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom'
import {NavLink} from 'react-router-dom';
import myContext from '../../Context/data/myContext';


import cart from '../Navbar/Assets/cart.png';
import women from '../Navbar/Assets/woman.png';
import { CgProfile } from "react-icons/cg";
import { useSelector } from 'react-redux';
import { IoReorderThreeOutline } from "react-icons/io5";



function NavBar() {
  const context = useContext(myContext)
  const {mode,toggle,userArray} =context;

  const data = useSelector((state)=>state.CART);

  const user = JSON.parse(localStorage.getItem('localUser'));
  // console.log("My user data ",userArray[0].uid)
  // console.log("My Local user data ",user.user.uid)
  
  
  
  const logout = () =>{
      localStorage.clear('localUser');
      window.location.href='/';
  }

  const [showManu, setShowManu]=useState(false);
  const handleShowManu = () =>{
    setShowManu(prev=> !prev);
  }

  return (
    <div className='navbar-container'>
      
        <div className='navbarHeading' style={{ backgroundColor: mode === 'dark' ? 'coral' : '' }}>
          <p>Get free delivery on orders over ₹300</p>
        </div>
        <div>
          <div className='navbar' style={{ backgroundColor: mode === 'dark' ? 'var(--lightBlack)' : '' }}>


              
              <div className='shoppingLogo'>
                <img src={women} className='womenLogo'/>
                <div style={{paddingTop:'0.3rem'}}>
                  <h3 style={{color:mode==='dark'?'white':''}}>Shopping-Hub</h3>
                  <p className='line-3' style={{borderBottomColor:mode==='dark'?'coral':''}}></p>
                </div>
              </div>
              

            <div className='navbar-all-element'>
                
                  <div className='navLinkText'>
                    <NavLink to="/" className='linkText' style={{color:mode==='dark'?'white':''}}>Home</NavLink>
                  </div>
                {user ?
                  <div className='navLinkText'>
                    <NavLink to="/allproducts" className='linkText' style={{color:mode==='dark'?'white':''}}>All Products</NavLink>
                  </div>:""}

                
                {user?.user?.email === 'amitdas1880@gmail.com'  ?
                <div className='navLinkText'>
                  <NavLink to='/dashboard' className='linkText' style={{color:mode==='dark'?'white':''}}>Admin</NavLink>
                </div> : "" 
                }

                {user?.user?.email !== 'amitdas1880@gmail.com'  ?
                <div className='navLinkText'>
                  <NavLink to='/order' className='linkText' style={{color:mode==='dark'?'white':''}}>Order</NavLink>
                </div> : ""
                }                                     
               
                

               <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Badge badgeContent={data.length} color="success">
                      <NavLink to='/cart'><img src={cart} className='carticon'/></NavLink>
                  </Badge>
                </div>



                <div className='dayNight'>
                    <button style={{border:"none",backgroundColor:"transparent"}} onClick={toggle}>
                        {mode==='light' ? (<BsFillCloudSunFill style={{fontSize:"1.5rem"}}/>)
                        :'dark' ?(<FaSun style={{fontSize:"1.5rem",color:"white"}}/>):"light" }
                    </button>  
                </div>

                  
                  <div onClick={handleShowManu}>
                    <div style={{backgroundColor:"transparent"}}>
                      <CgProfile  className='userIcon'/>
                    </div>
                    {showManu && 
                    (<div className="NavBarManu" style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':''}}>

                      {userArray.filter(item=>item.uid===user?.user?.uid).map(ele=> 
                          <p className='user-name' style={{color:mode==='dark'?'blue':''}}>
                              {ele.name}
                          </p>
                      )}

                      {user ?
                            <Link to='/' className='Log-In-Out' style={{color:mode==='dark'?'white':''}} onClick={logout}>
                              Logout
                            </Link>
                              :
                            <Link to='/login' className='Log-In-Out' style={{color:mode==='dark'?'white':''}}>
                              Login
                            </Link>
                        }
                        </div>)
                        }
                     </div>
                  </div>

                      

                {/* For Mobile Only */}

                  <div onClick={handleShowManu} className='mobile-screen'>
                    <div style={{backgroundColor:"transparent"}}>
                      <IoReorderThreeOutline  className='userIcon'/>
                    </div>
                    {showManu && 
                    (<div className="NavBarManu" style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':''}}>


                      {user?.user?.email === 'amitdas1880@gmail.com'  ?                    
                        <NavLink to='/dashboard' className='linkText' style={{color:mode==='dark'?'white':''}}>Admin</NavLink>
                        : "" 
                      } 


                    
                    <NavLink to="/" className='linkText' style={{color:mode==='dark'?'white':''}}>
                        Home
                    </NavLink>
                    

                    {user ?                      
                        <NavLink to="/allproducts" className='linkText' style={{color:mode==='dark'?'white':''}}>All Products</NavLink>
                      :""}


                  {user?.user?.email !== 'amitdas1880@gmail.com'  ?                    
                      <NavLink to='/order' className='linkText' style={{color:mode==='dark'?'white':''}}>Order</NavLink>
                     : ""
                  }   

                  {user ? 
                    <NavLink to='/cart' className='linkText addcart' style={{color:mode==='dark'?'white':''}}>
                        Add to Cart
                    </NavLink> :""}                     
                      
                          
                      <p className='linkText' onClick={toggle}>
                        {mode==='light' ? "Dark-mode"
                        :'dark' ?"Light-mode":"light" }
                      </p>
                          
                  



                      {user ?
                            <Link to='/' className='Log-In-Out' style={{color:mode==='dark'?'white':''}} onClick={logout}>
                              Logout
                            </Link>
                              :
                            <Link to='/login' className='Log-In-Out' style={{color:mode==='dark'?'white':''}}>
                              Login
                            </Link>
                        }
                        </div>)
                      }

                   </div>

             </div>
        </div>      
    </div>
  )
}

export default NavBar

