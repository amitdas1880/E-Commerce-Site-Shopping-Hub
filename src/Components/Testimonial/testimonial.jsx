import React, { useContext } from 'react';
import './Style.css';
import myContext from '../../Context/data/myContext';
import SlideShow from './SlideShow';
function testimonial() {
    const context = useContext(myContext);
    const { mode } = context
  return (
    <>
        <section>
            <div>

                <div>
                    <div className='testimonialHeading' style={{color:mode==='dark'?'white':''}}>
                        <p className='heading-2'>Testimonial</p>

                        <p className='subHeading-1'>What Our  
                        <span className='customerstext' style={{color:mode==='dark'?'coral':''}} > Customers</span> are Saying</p>

                    </div>
                </div>

                <div className='allTestimonial' style={{color:mode==='dark'?'white':''}}>
                                       
                    <SlideShow Post="Ceo of Twiter"
                     title="Node.Js" 
                    ShowCustomerImage="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"                        
                    />


                    <SlideShow Post="Ceo of Microsoft"
                        title="React.Js" 
                        ShowCustomerImage="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"                        
                    />


                    <SlideShow Post="Ceo of Google"
                     title="Angular.Js" 
                    ShowCustomerImage="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"                        
                    />
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default testimonial