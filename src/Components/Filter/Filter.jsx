import React, { useContext } from 'react'
import './Style.css';
import myContext from '../../Context/data/myContext';

import { IoSearchOutline } from "react-icons/io5";

function Filter() {
    const context = useContext(myContext);

    const {mode, productArray, searchkey, setSearchkey, filterType, setFilterType,  setFilterPrice} = context;

    //Filter category data from productArray
    let duplicateArr =[]
    function filterCategory(duplicateArr) {
        return productArray.forEach(item=>
            duplicateArr.push(item.category)  
          )
    }
    filterCategory(duplicateArr)
    console.log("Get Category data  from Product Array",duplicateArr);

    // Remove duplicates data
    let array=[]
    function removeDuplicates(duplicateArr) {
        return (duplicateArr.filter((item,
            index) => duplicateArr.indexOf(item) === index));
        
    }
    array=removeDuplicates(duplicateArr)

    console.log("Remove Duplicate array ",array);


    //Clear Filter Function
        const clearFilter = () =>{
            setSearchkey("");
            setFilterType("");
            setFilterPrice("");
        }    
    return (
        <>
        <div style={{display:"flex",justifyContent:"center"}}>
           <div className='mainContainer' style={{backgroundColor:mode==='dark'?"var(--CardBg)":''}}>
                <div className='topPart'>
                    <div className='searchBar'>
                        <div><IoSearchOutline /></div>
                        <input type='text' 
                        placeholder='Search here'
                        name='searchkey'
                        value={searchkey}
                        onChange={(e)=>setSearchkey(e.target.value)} 
                        style={{border:"none",outline:"none",width:"95%"}}/>                       
                    </div>

                            <select className="dropdown"                                
                                value={filterType}
                                onChange={(e)=>setFilterType(e.target.value)}>
                                <option value="">--Select Product--</option>
                                {array.map((item)=>{                                    
                                    return(
                                        <option value={item}>{item}</option>
                                    )
                                })}                               
                            </select>

                </div>
                
                <div className='middlePart' >
                    <p ><strong>Filter</strong></p>
                    <button className='filterBtn' onClick={clearFilter}><strong>Reset Filter</strong></button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Filter