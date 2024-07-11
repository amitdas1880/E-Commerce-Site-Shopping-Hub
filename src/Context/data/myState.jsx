import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import {  toast } from 'react-toastify';

import { collection, addDoc ,Timestamp, getDocs } from "firebase/firestore"; 
import { query, orderBy, onSnapshot, limit } from "firebase/firestore"; 
import { doc, updateDoc, setDoc, deleteDoc } from "firebase/firestore"; 
import {fireDB} from '../../Firebase/FirebaseConfig';

function MyState(props) {
    const [mode,setMode]=useState("light");
    const [loading,setLoading] = useState(false);

    const toggle=()=>{
        if(mode=="light"){
            setMode("dark");
            document.body.style.backgroundColor='rgb(53, 53, 51)';
        }else{
            setMode("light");
            document.body.style.backgroundColor='white';
        }
    }





    // Product Object
    const [productObject, setProductObject] = useState({
      title: null,
      price: null,
      imageUrl: null,
      category: null,
      description: null,
      time: Timestamp.now(),
      date :new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    })

    // Add Product data in firebase Database (List_Of_Products)
    const addProduct=async()=>{
      setLoading(true);
      if(productObject.title==null || productObject.imageUrl==null || productObject.price==null ||
         productObject.description==null || productObject.category==null){
          toast.error("Please fill all the fields");
        
      }
        try{
            const productRef = collection(fireDB,'List_Of_Products');
            await addDoc(productRef,productObject);
            toast.success("Product added successfully")
            getProductData();
            setLoading(false);
            window.location.href='/dashboard';
          }
          catch(e){
            toast.error(e.message);
            setLoading(false);
          }
          setProductObject("");
      }
    
    




    // get product data from firebase (List_Of_Products ) and display it inside Admin Panel (Product Details)
    const [productArray, setProductArray] = useState([]);

    const getProductData = async()=>{
      try{
        const getProductRef = collection(fireDB,'List_Of_Products');
        const q =  query(getProductRef,
                  orderBy('time'),
                   limit(100)
                  );
        
        const info = onSnapshot(q, (querySnapshot)=>{
          let array =[];
          querySnapshot.forEach((ele)=>{
            array.push({...ele.data(),id:ele.id});
            // console.log(array);
          })
          setProductArray(array);
          console.log(productArray);
          
        })  
        
        return ()=> info ;

      }catch(error){
        toast.error(error.message);
      }
    }

   




    // Update product 
    const edithandle = (item)=>{
      setProductObject(item);
    }


    const updateProductData = async()=>{
      setLoading(true);  
      try {
          const document = doc(fireDB, 'List_Of_Products', productObject.id);
          await updateDoc(document,productObject);
          
          toast.success("Product updated successfully")
          
          getProductData();
          window.location.href = '/dashboard';
          setLoading(false);

        } catch (error) {
          toast.error(error.message);      
          setLoading(false);
        }
    }




    // Delete Product 
    const deleteProductData= async(item) => {
        try {
          const document = doc(fireDB, 'List_Of_Products', item.id);
          await deleteDoc(document);

          toast.success('Product Deleted successfully')
          getProductData();

        } catch (error) {
          toast.error(error.message);
        }
    }




    // get data from firebase (List_Of_Order ) and display it inside order Details
    const [orderArray,setOrderArray] =useState([]);
    
    const getOrderData = async()=>{
      setLoading(true)
      try {
        const document=collection(fireDB, "List_Of_Orders")
        const result = await getDocs(document);
      
        const array =[]
        result.forEach((item)=>{
          array.push(item.data())
        }) ;
        setOrderArray(array);
        setLoading(false)
        
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    }




     // get data from firebase (List_Of_Users ) and display it inside User Details
     const [userArray,setUserArray] =useState([]);
    
     const getUserData = async()=>{
       setLoading(true)
       try {
         const document=collection(fireDB, "List_Of_Users")
         const result = await getDocs(document);
       
         const array =[]
         result.forEach((item)=>{
           array.push(item.data())
         }) ;
         setUserArray(array);
         
         setLoading(false)
         
       } catch (error) {
         toast.error(error.message);
         setLoading(false);
       }
     }

    useEffect(()=>{
      getOrderData();
      getProductData();
      getUserData();
    },[]);


    
    // For filtering the Product

    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')


   

    
  return (
    <MyContext.Provider value={{mode,toggle,loading,setLoading,
      productObject, setProductObject,addProduct,productArray,
       edithandle,updateProductData,deleteProductData,
       orderArray ,userArray,
       searchkey,setSearchkey,   filterType,setFilterType,   filterPrice,setFilterPrice  
    }}>
       {props.children}
    </MyContext.Provider>
  )
}

export default MyState


// Note :- for update in firebase data you can use updateDoc OR setDoc method (Both are Supported).