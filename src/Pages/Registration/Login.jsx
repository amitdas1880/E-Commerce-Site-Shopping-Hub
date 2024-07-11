import React, { useContext, useState } from 'react'
import './Style.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../Firebase/FirebaseConfig';
import myContext from '../../Context/data/myContext';
import ProfileImg from '../../Components/Navbar/Assets/signin.gif'
import Loader from '../../Components/Loader/Loader';

function Login() {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  
  const navigate = useNavigate();

  const context = useContext(myContext);
  const {loading,setLoading,mode}=context;
  
  const loginUser = async () =>{
    setLoading(true);
    // console.log(email,password);
    if(email!=="" && password!==""){
      
      try{
        const loginData = await signInWithEmailAndPassword(auth, email, password)
        window.localStorage.setItem('localUser',JSON.stringify(loginData));            
        navigate('/')
        toast.success('Successfully Login');
        setLoading(false);
        
      }catch(error){
        toast.error(error.message);
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
    
      <div style={{display:'flex',alignItems:"center",justifyContent:"center",marginTop:'6rem'}}>
    
      <div className='singup-wrapper' style={{backgroundColor:mode==='dark'?'var(--CardBg)':'', color:mode==='dark'?'white':'' }}>
      <p className='title'>
        <img src={ProfileImg} className='signinIcon'/>
        Login on <span style={{color:'blueviolet'}}>Shopping-Hub</span>
      </p>

      <Form>
      <Form.Group className="mb-3" >
        <Form.Label><strong>Email address:</strong></Form.Label>
        <Form.Control type="email" placeholder="JoneDeo@gmail.com" 
        value={email} name='email' onChange={(e)=>setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label><strong>Password:</strong></Form.Label>
        <Form.Control type="password" placeholder="Example@123" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>

      <div className='btn'>
      <Button variant="light"   onClick={loginUser} >
          Continue with Email 
      </Button>
      </div>


        <p className='p-login' >Or Don't Have An Account? <Link to='/signup'>Click Here</Link></p>
    </Form>
    
    </div>
    
      </div>


    }
    
    </>
  )
}

export default Login

//Note : the data comes from  firebase is object format and the localStorage store data in JSON format (string). so, convert it from object into JSON format(string).