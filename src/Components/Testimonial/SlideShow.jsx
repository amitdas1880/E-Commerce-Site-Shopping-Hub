import React, { useContext } from 'react'
import myContext from '../../Context/data/myContext';
import './Style.css';

function SlideShow(props) {
    const context = useContext(myContext);
        const { mode } = context
  return (
    <>
            <div className='testimonialCard'>
                <img src={props.ShowCustomerImage} className='img'/>
                <p>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 
                kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut 
                adaptogen squid fanny pack vaporware
                </p>
                <p className='line-1' style={{borderBottomColor:mode==='dark'?'coral':''}}></p>
                <p className='heading-3'>{props.title}</p>
                <p className='partyPost'>{props.Post}</p>
            </div>
    </>
  )
}

export default SlideShow