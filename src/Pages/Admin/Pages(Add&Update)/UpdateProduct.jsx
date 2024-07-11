import React, { useContext } from 'react'
import './Style.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import myContext from '../../../Context/data/myContext';
import Loader from '../../../Components/Loader/Loader';

function UpdateProduct() {
    const context = useContext(myContext);
  const {loading,productObject, setProductObject,updateProductData}=context;
  return (
    <>
            {loading ? <Loader/>:
            <div style={{display:'flex',alignItems:"center",justifyContent:"center",marginTop:'4rem'}}>
                
                <div className='singup-wrapper'>
                <h2 className='title'>
                Update Product
                </h2>

                <Form>

                <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Product Title" 
                  value={productObject.title} onChange={(e)=>setProductObject({...productObject, title: e.target.value})}
                />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Product Price" 
                  value={productObject.price} onChange={(e)=>setProductObject({...productObject, price: e.target.value})}
                />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Product Image-Url" 
                    value={productObject.imageUrl} onChange={(e)=>setProductObject({...productObject, imageUrl: e.target.value})}
                />
                </Form.Group>

                <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Product Category" 
                    value={productObject.category} onChange={(e)=>setProductObject({...productObject, category: e.target.value})}
                />
                </Form.Group>

                <FloatingLabel controlId="floatingTextarea2" label="Comments" className="mb-3" >
                <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    value={productObject.description} onChange={(e)=>setProductObject({...productObject, description: e.target.value})}
                />
                </FloatingLabel>

                <div className='btn' >
                <Button variant="warning"  className='AddUpdate-2' onClick={updateProductData} >
                    Update Product
                </Button>
                </div>

            </Form>
            
        </div>
    
        </div>

        }
    </>
    )
}

export default UpdateProduct