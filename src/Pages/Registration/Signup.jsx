import React, { useContext, useState } from 'react'
import './Style.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {  toast } from 'react-toastify';

import Loader from '../../Components/Loader/Loader';
import myContext from '../../Context/data/myContext';

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore"; 
import {auth,fireDB} from '../../Firebase/FirebaseConfig';

import ProfileImg from '../../Components/Navbar/Assets/signin.gif'

function Signup() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");

  const context = useContext(myContext)
  const {loading , setLoading,mode}= context;

  const singup= async()=>{
    // e.preventDefault();
    setLoading(true);
    console.log(name,email,password,confirmPassword);
    
    
    if(email!==""&& name!==""&& password!==""&& confirmPassword!==""){
      if(password===confirmPassword){
          try{
            //create user email & password (signup) and store it into Authentication.
            const users = await createUserWithEmailAndPassword(auth, email, password);
            console.log(users);
            toast.success('Successfully Registered');
            // Add Document in firebase Database.
            const myUser ={
                name:name,
                email:users.user.email,
                uid:users.user.uid,
                time : Timestamp.now()
            }
            //console.log(myUser);
            const userRef = doc(fireDB, 'List_Of_Users',users.user.uid);
            await setDoc(userRef,myUser);
            
            setName("")
            setPassword("")
            setConfirmPassword("")
            setEmail("")

            setLoading(false);
            window.location.href='/login';
            
          }
            catch(error){
              console.log(error);
              toast.error(error.message);
              setLoading(false);
            }
      }else{
        toast.error("Passwords and ConfirmPassword don't match");
        setLoading(false);
      }
    }else{
      toast.error('All fields are required');
      setLoading(false);
    }
          
  }

  return (
    <>
    {loading ? <Loader/>:
            
            <div style={{display:'flex',alignItems:"center",justifyContent:"center",marginTop:'0.3rem' }}>
            <div className='singup-wrapper' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':'' }}>
            <p className='title'>
                <img src={ProfileImg} className='signinIcon'/>
                Login on <span style={{color:'blueviolet'}}>Shopping-Hub</span>
            </p>

            <Form >

            <Form.Group className="mb-3" >
              <Form.Label><strong>Name:</strong></Form.Label>
              <Form.Control type="text" placeholder="Jone Deo" name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label><strong>Email address:</strong></Form.Label>
              <Form.Control type="email" placeholder="JoneDeo@gmail.com" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label><strong>Password:</strong></Form.Label>
              <Form.Control type="password" placeholder="Example@123"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label><strong>Confirm Password:</strong></Form.Label>
              <Form.Control type="password" placeholder="Example@123"  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
            </Form.Group>

            <div className='btn'>
            <Button variant="light"  
              onClick={singup}  >
                <span>Singup Using Email</span>
            </Button>
            </div>
            
              <p className='p-login' >Or Have An Account Already? <Link to='/login'>Click Here</Link></p>
          </Form>  
            </div>
        </div>

    }

    </>
  )
}

export default Signup