import React, { useContext } from 'react'
import './Style.css';

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

import myContext from '../../Context/data/myContext'

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <>
      <div style={{color:mode==='dark'?'white':''}}>
        <div className="footer-top" style={{background:mode==='dark'?'rgb(110, 109, 109)':''}}>
        
          <div className='footerPoint'>
              <h5>categories</h5>
              <p>Home</p>
              <p>Order</p>
              <p>Local For Vocal</p>
              <p>Cart</p>
          </div>
          <div className='footerPoint'>
              <h5>customer service</h5>
              <p>Return Policy</p>
              <p>About</p>
              <p>Contect Us</p>              
          </div>
          <div className='footerPoint'>
            <h5>service</h5>
            <p>Privacy</p>
          </div>
        
          <div className=''>
            <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" className='imgPaymentType' />
          </div>
        </div>

        <div className="footer-bottom" style={{backgroundColor:mode==='dark'?'var(--CardBg)':''}}>
            <div style={{display:"flex", columnGap:"1.4rem", flexWrap:"wrap"}}>
              <h5 style={{fontSize:"1.3rem",fontWeight:"700" }}>Shopping-Hub</h5>
              <p style={{fontSize:"0.8rem",fontWeight:"500"}}>&copy; 2024 Shopping-Hub - www.shoppinghub@gmail.com</p>
            </div>
            <div className='allLogos'>
                <FaFacebookF/>
                <FaTwitter/>
                <FaInstagram/>
                <FaLinkedinIn/>
            </div>
        </div>

      </div>
    </>
  )
}

export default Footer