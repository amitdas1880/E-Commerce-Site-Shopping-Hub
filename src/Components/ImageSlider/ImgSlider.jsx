import React from 'react';
import './Style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


import Img1 from './Image/page1.jpg';
import Img2 from './Image/page2.avif';
import Img3 from './Image/page3.webp';
import Img5 from './Image/page5.png';
import Img4 from './Image/page4.jpg';
import Img6 from './Image/page6.jpg';
import Img7 from './Image/page7.jpg';
function ImgSlider() {
  return (
    <>
    <div className='imageSlider'>
     <Swiper
        modules={[Pagination, Navigation,Autoplay]}
        slidesPerView={1}
       
        loop={true}
        autoplay={
            {
                delay: 6000,
                disableOnInteraction: false,
            }
        }
        pagination={{
          clickable: false,
        }}
        navigation={true}
        className="mySwiper"
      >
        <SwiperSlide><img src={Img6} className='images'/></SwiperSlide>
        <SwiperSlide ><img src={Img7} className='images'/></SwiperSlide>
        <SwiperSlide><img src={Img1} className='images' /></SwiperSlide>
        <SwiperSlide><img src={Img2} className='images' /></SwiperSlide>
        <SwiperSlide><img src={Img3} className='images' /></SwiperSlide>
        <SwiperSlide><img src={Img4} className='images' /></SwiperSlide>
        <SwiperSlide><img src={Img5} className='images' /></SwiperSlide> 
      </Swiper>
      </div>
    </>
  )
}

export default ImgSlider

//Vedio Link : https://www.youtube.com/watch?v=adNMCxDOd_A
//vedio link : https://www.youtube.com/watch?v=tmNtM0Gin-E (AutoPlay)