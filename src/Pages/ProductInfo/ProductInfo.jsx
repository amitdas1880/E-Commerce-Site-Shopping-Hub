import React, { useContext, useEffect, useState } from 'react'
import './Style.css';
import Layout from '../../Components/Layout/Layout';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../Firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import myContext from '../../Context/data/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';
import BuyDetailModal from '../../Components/Modal/BuyDetailModal';
import Zoom from './Zoom';

function ProductInfo() {
    const [products, setProducts]= useState();

    const context = useContext(myContext);
    const { mode } = context;

    const params = useParams()
    console.log(params.id)

    const getProductData =async()=>{
        try {
            const docRef = doc(fireDB,'List_Of_Products',params.id)
            const productTemp = await getDoc(docRef);
            setProducts(productTemp.data());    
            
            console.log("productinfo data", products)
        } catch (error) {
            toast.error(error.message)
            
        }        
    }

    // Get User Data from Local Storage and check User is available or not
    const user = JSON.parse(localStorage.getItem('localUser'));

    useEffect(()=>{
        getProductData()
    },[])

    console.log("productinfo data => ", products)

    // Create add to cart

    const cartData = useSelector((state)=>state.CART);
    const dispatch = useDispatch()

    function addTCartFunction(item){
            dispatch(addToCart(item))
            toast.success('Product Added To Cart')
    }
     // Add to cart data store in local storage , so when we refresh the page cart data are not removed.
     useEffect(()=>{
        localStorage.setItem("Add_To_Carts", JSON.stringify(cartData))
    },[cartData]);


    
    
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
            })
        }
    

    //razorpay option
    var options = {
        key: "rzp_test_8DwQYRuTSoPzgp",
        key_secret: "TltD3J9FB5WdDM1Chj4b8yhA",
        amount: parseInt((parseInt(products.price)+parseInt(50))*100),
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
    
    <div className='productInfoPage' style={{color:mode=='dark'?'#fff':""}}>
    {products &&  
                    <>                   
                    <div className="zoom-img-div">
                        <Zoom image={products.imageUrl} />
                    </div>
                    <div className='productDetail'>
                        <p style={{color:'var(--CardBg)',marginBottom:"0rem"}}>BRAND NAME</p>
                        <h4>{products.title}</h4>                                                  
                        <p className='review'> 4 Reviews</p>                       
                        <div className='productDesc'>
                            {products.description}
                        </div>
                        <p className='line-4'></p>
                        <p className='price'> Price : <strong>₹{products.price}</strong> </p>
                        <div style={{display:"flex",columnGap:'1rem'}}>
                            {user ?                                              
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
                              />:
                               <Button variant="success" style={{color:'#fff',padding:"0.2rem 3.2rem",cursor:'not-allowed',opacity:"0.6"}} 
                                    onClick={()=>window.location.href = `/login`}>
                                    Buy Now
                               </Button>
                            }

                            {user ?
                            <Button variant="warning" 
                                onClick={()=>addTCartFunction(products)} >
                                Add To Cart
                            </Button>
                            :
                            <Button variant="warning" style={{cursor:'not-allowed',opacity:"0.6"}} 
                                onClick={()=>window.location.href = `/login`}>
                                Add To Cart
                            </Button>
                            }

                        </div>
                    </div>                   
                    </>
               
                   }
           
        </div>
    
        
    </Layout>
    </>
  )
}

export default ProductInfo