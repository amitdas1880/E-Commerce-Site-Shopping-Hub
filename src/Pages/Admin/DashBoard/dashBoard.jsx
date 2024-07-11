import React, { useContext } from 'react'
import './Style.css';
import Layout from '../../../Components/Layout/Layout';
import profile from '../../../Components/Navbar/Assets/profile.png';
import DashboardTab from './DashboardTab';
import myContext from '../../../Context/data/myContext';
function DashBoard() {
  const context = useContext(myContext)
    const { mode,productArray ,orderArray, userArray } = context;
  
  return (
    <>
      <Layout>
        <div>
             <div>
                  <div style={{display:'flex',justifyContent:"center",alignItems:"center"}}>
                        <div className='adminUserSetting'>
                            <div className='adminUser'>
                                <img src={profile} className='adminUserImg'/>
                                  <h3>{productArray.length}</h3>
                                  <h5>Total Products</h5>
                            </div>

                            <div className='adminUser'>
                                <img src={profile} className='adminUserImg'/>
                                  <h3>{orderArray.length}</h3>
                                  <h5>Total Orders</h5>
                            </div>

                            <div className='adminUser'>
                                <img src={profile} className='adminUserImg'/>
                                  <h3>{userArray.length}</h3>
                                  <h5>Total Users</h5>
                            </div>


                        </div>
                  </div>


                  <div>
                      <DashboardTab/>
                  </div>



             </div>
        </div>
      </Layout>
    </>
  )
}

export default DashBoard