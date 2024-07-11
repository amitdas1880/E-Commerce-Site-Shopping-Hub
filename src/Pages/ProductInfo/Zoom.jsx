import React from 'react'
import './Style.css';
import ReactImageMagnify from 'react-image-magnify';
function ImageZoom(props) {
  const{image} = props;
  return (
    <div style={{width:"350px", height:"350px" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
          <div style={{}}>
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: image,
                        width:140,
                        height:180
                    },
                    largeImage: {
                        src: image,
                        width: 836,
                        height: 1400
                },
                //enlargedImagePosition:'over',
                lensStyle:{backgroundColor:'rgba(0,0,0,0.3)'}
                }} />

          </div>
      
    </div>
  )
}

export default ImageZoom


//    npm i react-image-magnify --save --force