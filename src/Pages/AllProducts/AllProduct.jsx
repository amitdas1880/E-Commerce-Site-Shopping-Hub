import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout';
import myContext from '../../Context/data/myContext';
import Filter from '../../Components/Filter/Filter';
import ProductCard from '../../Components/productCard/ProductCard';

function AllProduct() {
  const context = useContext(myContext)
  console.log(context) 

  return (
    <Layout>
    <div style={{paddingTop:"6rem"}}>
      <Filter/>
    </div>      
      <ProductCard/>      
    </Layout>
    
  )
}

export default AllProduct