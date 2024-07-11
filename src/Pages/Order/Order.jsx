import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout';
import myContext from '../../Context/data/myContext';
import Loader from '../../Components/Loader/Loader';
import './Style.css';
function Order() {
  const Context = useContext(myContext);
  const {loading,orderArray,mode}=Context;

  console.log(orderArray.length)
  
  //get Uid from loacal storage and convert it in to object through JSHON.Parse method.
  const uid =JSON.parse(localStorage.getItem('localUser')).user.uid;
  console.log("localStore ",uid)
 

  console.log(orderArray)

  return (
    <>
     <Layout>
      {loading ? <Loader/>:
      <>
      {orderArray.length>0 ?
      <div  style={{paddingTop:'6rem'}}>
              <div style={{display:"flex",justifyContent:"center",alignItems:"center", paddingBottom:'1rem',
                  color:mode==='dark'?'white':'' }}>
                        <h3>Order Items</h3>
              </div>
              {orderArray.filter((obj)=> obj.userid === uid).map((ele)=>{
                
                      return (<>
                        
                        <div className='allCartsDetail'>
                        
                        {ele.cartData.map((item)=>{                 // Note: "cartData" comes from List_Of_Orders.                                     
                          console.log(item)               
                          return  (
                            <>

                            <div className='singleCartDetail' key={item.id} 
                            style={{backgroundColor:mode==='dark'?'var(--CardBg)':'',color:mode==='dark'?'white':'' }}>
                                  
                                  <img src={item.imageUrl} className='cartImg'/>
                                  <div className='cartInfo'>
                                      <h4 >{item.title}</h4>

                                      <p>{item.description}</p>                              
                                      <div style={{display:"flex", columnGap:"0.6rem"}}>                                          
                                          <p>Quantity: <strong>{item.qty}</strong></p>
                                          <p>Price:<strong> ₹ {item.price*item.qty}</strong></p>
                                      </div>

                                  </div>  
                              </div> 


                            </>)})}
                            
                        </div>
                       

                        

                      </>)

                    })}

      </div>
      :<div className='noOrder'> 
          <img src='https://cdn.dribbble.com/users/1555425/screenshots/4811660/media/1965aabe4e0d22814004ac2c9dd96d51.jpg?resize=400x0' style={{borderRadius:"8px"}}/>
        </div>
      }
        
        </> }
      </Layout>
    </>
  )
}

export default Order

