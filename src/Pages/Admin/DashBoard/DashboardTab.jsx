import React, { useContext, useEffect, useState } from 'react'
import './Style.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../Context/data/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link , NavLink} from 'react-router-dom';

function DashboardTab() {
    const context = useContext(myContext)
    const { mode , productArray , edithandle, deleteProductData ,orderArray, userArray } = context;
    console.log("This is User Data ",userArray.length)

    function addProductForm (){
        window.location.href='/addProduct'
    }
    return (
        <>
            <div className="">
                <div className=" ">
                    <Tabs defaultIndex={0} className=" " >
                        <TabList className="tablist">
                            <Tab className="tab">
                                <Button variant="outline-primary" type="button" className="tabBtn" style={{border:"2px solid blue"}}>                                       
                                    <MdOutlineProductionQuantityLimits />Products
                                 </Button>
                            </Tab>
                            <Tab className="tab">
                                <Button variant="outline-warning" type="button" className="tabBtn" style={{border:"2px solid yellow"}}>
                                     <AiFillShopping size={20}/> Order
                                </Button>
                            </Tab>
                            <Tab className="tab">
                                <Button variant="outline-success" type="button" className="tabBtn" style={{border:"2px solid green"}}>
                                     <FaUser /> Users
                                </Button>
                            </Tab>
                        </TabList>
                        {/* product  */}   
                        <TabPanel>
                            <div className=' '>
                                <h1 className='headingH1' style={{ color: mode === 'dark' ? 'white' : '' }}>Product Details</h1>
                                <div className="tabAddProductBtn" >
                                    <Button variant="danger"
                                        type="button"
                                        className="addproductBtn" style={{ color: mode === 'dark' ? 'white' : '', }} 
                                        onClick={addProductForm}> 
                                        Add Product <FaCartPlus size={20} />
                                    </Button>
                                </div>
                                <div className="product_detail_table">
                                    <Table striped bordered hover variant="light" >
                                        <thead  style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th>SI.No</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                        {productArray.map((item,index) =>{
                                            return(

                                            <tr>
                                                <td> {index+1}. </td>
                                                <th>
                                                    <img className='productDetailImg' src={item.imageUrl} alt="img" />
                                                </th>
                                                <td> {item.title}</td>
                                                <td>₹{item.price}</td>
                                                <td> {item.category}</td>
                                                <td>{item.date}</td>
                                                <td className="">                            
                                                        <div className="actionContainer">                                                        
                                                            <div onClick={()=>deleteProductData(item)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="deleteBtn">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </div>
                                                        
                                                            <Link to='/updateProduct'  >
                                                                <div onClick={()=>edithandle(item)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="editBtn">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                    </svg>
                                                                </div>
                                                            </Link>
                                                        </div>                                                    
                                                </td>
                                            </tr>


                                            )
                                        })}
                                        </tbody>
                                    </Table>

                                </div>
                            </div>
                        </TabPanel>

                         {/* order  */}   
                         <TabPanel>
                            <div className=' '>
                                <h1 className='headingH1' style={{ color: mode === 'dark' ? 'white' : '',marginBottom:"2.5rem" }}>Order Details</h1>
                                
                                <div className=" ">
                                    <Table striped bordered hover variant="light" >
                                        <thead  style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th>S.No</th>
                                                <th>Payment Id</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Category</th>
                                                <th>Price</th>
                                                <th>Qty</th>
                                                <th>Total</th>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Pincode</th>
                                                <th>Mobile No</th>
                                                <th>Email</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                        {orderArray.map((ele, index)=>{
                                            return(<>

                                            <tr>
                                                <td>{index+1}. </td>
                                                <td>{ele.paymentId}</td>
                                                <td>
                                                    <img  src={ele.cartData[0].imageUrl} alt="img"className='productDetailImg' />
                                                </td>
                                                <td> {ele.cartData[0].title}</td>
                                                <td> {ele.cartData[0].category}</td>
                                                <td>₹{ele.cartData[0].price}</td>
                                                <td> {ele.cartData[0].qty}</td>
                                                <td>₹{ele.cartData[0].price*ele.cartData[0].qty}</td>
                                                <td> {ele.addressInfo.name}</td>
                                                <td> {ele.addressInfo.address}</td>
                                                <td> {ele.addressInfo.pincode}</td>
                                                <td>{ele.addressInfo.phoneNumber} </td>
                                                <td> {ele.email}</td>
                                                <td>{ele.date}</td>
                                               
                                            </tr>

                                            </>)
                                        })}
                                            
                                        </tbody>
                                    </Table>

                                </div>
                            </div>
                        </TabPanel>


                         {/* user  */}   
                         <TabPanel>
                            <div className=''>
                                <h1 className='headingH1' style={{ color: mode === 'dark' ? 'white' : '',marginBottom:"2.5rem" }}>User Details</h1>
                               
                                <div className="">
                                    <Table striped bordered hover variant="light" >
                                        <thead  style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <tr>
                                                <th>S.No</th>
                                                <th>Name</th>                                                
                                                <th>Email</th>
                                                <th>User id</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                        {userArray.map((item,index)=>{
                                            return(<>

                                                <tr>
                                                    <td>{index+1}. </td>
                                                    <td> {item.name}</td>
                                                    <td> {item.email}</td>
                                                    <td> {item.uid}</td>
                                                    
                                                </tr>

                                            </>)
                                        })}
                                          
                                        </tbody>
                                    </Table>

                                </div>
                            </div>
                        </TabPanel>



                    </Tabs>
                </div>
            </div>
        </>
    )
}


export default DashboardTab