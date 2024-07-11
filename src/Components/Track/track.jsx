import React, { useContext } from 'react'
import './Style.css';
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalShipping } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import myContext from '../../Context/data/myContext';

function track() {
    const context = useContext(myContext);
    const { mode } = context
  return  (
    <>
        <section>
            <div className='memo-container' style={{color:mode==='dark'?'white':'',}}>
                <div className='memo' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', marginBottom:"20px"}}>
                    <div className='memologocontainer'><BsHandbag className='memologo'/></div>
                    <h5>Premium Product</h5>
                    <p style={{fontSize:"1rem",marginTop:"-0.5rem"}}>Our collection are 100% made of cotton.</p>
                </div>

                <div className='memo' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'',marginBottom:"20px"}}>
                    <div className='memologocontainer'><MdOutlineLocalShipping className='memologo'/></div>
                    <h5>Free Shipping</h5>
                    <p style={{fontSize:"1rem",marginTop:"-0.5rem",padding:"0rem 2rem"}}>We ship all over India for FREE.</p>
                </div>

                <div className='memo' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'',marginBottom:"20px"}}>
                    <div className='memologocontainer'><HiOutlineCurrencyRupee className='memologo'/></div>
                    <h5>Exclusive Offers</h5>
                    <p style={{fontSize:"1rem",marginTop:"-0.5rem"}}>We provide amazing offers & discounts.</p>
                </div>


            </div>
        </section>
    </>
  )
}

export default track