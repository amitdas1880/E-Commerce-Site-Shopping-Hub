import React, { useContext, useEffect } from 'react'
import './Style.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import myContext from '../../Context/data/myContext';
import { useDispatch, useSelector } from 'react-redux'
import {addToCart} from '../../Redux/cartSlice';
import { toast } from 'react-toastify'
function ProductCard() {
    const context = useContext(myContext);
    const { mode ,productArray, searchkey, filterType, filterPrice} = context;
    
    const cartItem = useSelector((state)=>state.CART);
    const dispatch = useDispatch()

    function addTCartFunction(item){
            dispatch(addToCart(item))
            toast.success('Product Added To Cart')
    }

    // Add to cart data store in local storage , so when we refresh the page cart data are not removed.
    useEffect(()=>{
        localStorage.setItem("Add_To_Carts", JSON.stringify(cartItem))
    },[cartItem]);
  return (
    <>
        <section>

        <div className='heading' style={{color:mode==='dark'?'white':''}}>
        <p>Our Latest Collection</p>
        <p className='line' style={{borderBottomColor:mode==='dark'?'coral':''}}></p>
        </div>

        <div className='container'>
            {productArray.filter(ele=>ele.title.toLowerCase().includes(searchkey))
                .filter(ele=>ele.category.toLowerCase().includes(filterType))
                .filter(ele=>ele.price.toLowerCase().includes(filterPrice))
                .map((item,index)=>{
                return(
                    <div style={{marginBottom:"1.5rem" }} key={index}>
                        <Card style={{ width: '18rem',height:"28rem", backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':'' }}>
                            <div style={{display:"flex",alignItems:"center",justifyContent:"center",paddingTop:"0.5rem"}}>
                            <Card.Img variant="top" src={item.imageUrl} className='CardImg'
                                onClick={()=> window.location.href = `/productInfo/${item.id}`}/>
                            </div>
                            <Card.Body>
                            
                                <p style={{fontSize:"13px",color:mode==='dark'?'white':'rgb(192, 185, 180)'}}><strong>Shopping Hub</strong></p>
                                <Card.Title style={{fontSize:"1rem"}}>{item.title}</Card.Title>
                                <Card.Text> ₹{item.price}</Card.Text>
                                <div className='btn'>
                                <Button variant="info" style={{padding:"8px 50px",color:mode==='dark'?'white':''}}
                                onClick={()=>addTCartFunction(item)}>Add To Cart</Button>
                                </div>
                                
                            </Card.Body>
                        </Card>
                    </div>        
                )
            })}
            


           


        </div>
        </section>
    </>
  )
}

export default ProductCard