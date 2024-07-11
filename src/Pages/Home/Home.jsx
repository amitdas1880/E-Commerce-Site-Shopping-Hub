import React, { useContext } from 'react'
import Layout from '../../Components/Layout/Layout';
import myContext from '../../Context/data/myContext';
//import Filter from '../../Components/Filter/Filter';
import CartInHome from '../../Components/productCard/CartInHome';
import Track from '../../Components/Track/track';
import Testimonial from '../../Components/Testimonial/testimonial';
import ImgSlider from '../../Components/ImageSlider/ImgSlider';
function Home() {
  const context = useContext(myContext)
  console.log(context) 

  return (
    <Layout>
      <ImgSlider/>
      <CartInHome/>
      <Track/>
      <Testimonial/>
    </Layout>
    
  )
}

export default Home