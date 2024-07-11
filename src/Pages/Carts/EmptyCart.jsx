import React, { useContext } from 'react'
import Shopping from '../../Components/Navbar/Assets/shopping.png';
import './Style.css';
import myContext from '../../Context/data/myContext';

function EmptyCart() {
  const context = useContext(myContext)
  const {mode} =context;
    
  return (
    <>
        <div className='EmptyCard' >
                    <div>
                        
                        <img src={Shopping} className='NoShoping'/>
                        <h3 style={{paddingRight:"1rem", color:mode=='dark'?"#fff":""}}>Your Cart is Empty</h3>
                    </div>
                </div>
        
    </>
  )
}

export default EmptyCart