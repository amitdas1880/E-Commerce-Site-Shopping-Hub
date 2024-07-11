import React, { useContext, useEffect, useState } from 'react'
import './Style.css';
import Layout from '../../Components/Layout/Layout';
import BuyDetailModal from '../../Components/Modal/BuyDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import {decrementQuantity, deleteFromCart, incrementQuantity} from '../../Redux/cartSlice';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import EmptyCart from './EmptyCart';
import { collection, addDoc, increment  } from "firebase/firestore"; 
import {fireDB} from '../../Firebase/FirebaseConfig';
import myContext from '../../Context/data/myContext';



function Carts() {
  const context = useContext(myContext)
  const {mode} =context;
  const cartData = useSelector((state)=>state.CART);
  const dispatch = useDispatch();


  
  //Update local Storage
  useEffect(()=>{
    localStorage.setItem("Add_To_Carts",JSON.stringify(cartData));
  },[cartData]);

  


  function deleteCartItem (item){
    dispatch(deleteFromCart(item));
  }
  
  // Calculation of Total price and Shipping charges
  //For SubTotal 
  const [amount,setAmount] = useState(0);

  useEffect(()=>{
    let temp =0;
    cartData.forEach(element => {
      temp = temp + parseInt(element.price)*parseInt(element.qty);
    });
    setAmount(temp);
    // console.log("Amount",amount);
  },[cartData])


  //For Shipping charges
  const [shipping,setShipping] = useState(0);

  useEffect(()=>{
    let tempShipping =0;
    cartData.forEach(() => {
      tempShipping = parseInt(cartData.length)*parseInt(50);
    });
    setShipping(tempShipping);
    // console.log("Shipping",shipping);
  },[cartData]);

  //Total calculation
  const total= amount + shipping;

  
  
  // Increase & Decrease Quantity
  const [Quantity,setQuantity]=useState(0);

  const IncreaseQty =(element)=>{
    dispatch(incrementQuantity(element));
  }

  const DecreaseQty =(element)=>{
    dispatch(decrementQuantity(element));
  }






  // Buy Now Option

  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")  


  const Buy_Now_Function = ()=>{
    if(name==='' || address==='' || pincode==='' || phoneNumber===''){
        toast.error('All fields are required')
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }

    //razorpay option
    var options = {
      key: "rzp_test_8DwQYRuTSoPzgp",
      key_secret: "TltD3J9FB5WdDM1Chj4b8yhA",
      amount: parseInt(total * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "Shopping-Hub",
      description: "for testing purpose",
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          cartData,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("localUser")).user.email,
          userid: JSON.parse(localStorage.getItem("localUser")).user.uid,
          paymentId
        }

        try {
          const dataBaseRef = collection(fireDB, "List_Of_Orders");
          const result = addDoc(dataBaseRef, orderInfo);
          toast.success('Order Placed Successfully')
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)

  }

  return (
    <>
      <Layout>
        <div>
        {cartData.length ? (
            <div  style={{paddingTop:'6rem'}}>
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center",color:mode==='dark'?'white':'' }}>
                      <h3>Cart Items</h3>
                  </div>
                  <div style={{display:"flex",columnGap:"1.5rem", flexWrap:"wrap"}} className='responsive'>

                      <div className='allCartsData'>

                          {cartData.map((item)=>{
                              return(
                                <div className='cartDetail' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':'' }}>
                                <img src={item.imageUrl} className='cartImg'/>
                                <div className='cartInfo'>
                                    <h4 >{item.title}</h4>

                                    <p>{item.description}</p>

                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <p>Price:<strong> ₹ {item.price}</strong></p>
                                        <div style={{marginTop:"-0.5rem"}}>
                                            <MdDelete className='deleteBtn-1' onClick={()=>deleteCartItem(item)} />
                                        </div>
                                    </div>

                                    <div className='qtyIncDec'>
                                      <p onClick={ item.qty >1 ? ()=>DecreaseQty(item): ()=>deleteCartItem(item)}>-</p>
                                      <input type="text" className='qty-input-box' value={item.qty} disabled name=""  />
                                      <p onClick={()=>IncreaseQty(item)}>+</p>
                                    </div>

                                </div>  
                              </div>
                              )
                          })}
                             

                      </div>

                      <div className='buyingDetail' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':'' }}>

                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <p>Subtotal</p>
                            <p>₹{amount}</p>
                          </div>

                          <div style={{display:"flex",justifyContent:"space-between"}}>
                            <p>Shipping</p>
                            <p>₹{shipping}</p>
                          </div>

                          <p className='line-5'></p>

                          <div style={{display:"flex",justifyContent:"space-between"}} >
                            <p style={{fontWeight:"700"}}>Total</p>
                            <p><strong>₹{total}</strong></p>
                          </div>
                          
                          <div style={{display:"flex",justifyContent:"center"}} >
                                                    
                              <BuyDetailModal                             
                                name={name} 
                                address={address} 
                                pincode={pincode} 
                                phoneNumber={phoneNumber} 
                                setName={setName} 
                                setAddress={setAddress} 
                                setPincode={setPincode} 
                                setPhoneNumber={setPhoneNumber} 
                                Buy_Now_Function={Buy_Now_Function}
                              />                                                                
                          </div>
                      </div> 


                  </div>
                 
                          
            </div>
            ) : <EmptyCart/>}
        </div>
      </Layout>
    </>
  )
}

export default Carts


