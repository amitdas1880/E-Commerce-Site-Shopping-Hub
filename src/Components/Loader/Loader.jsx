import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
function Loader() {
  return(
  <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingTop:"17rem"}}>
    <Spinner animation="border" variant="primary" style={{width:"3rem",height:'3rem'}}/>
  </div>
  )
}

export default Loader