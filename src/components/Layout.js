import React from 'react'
import { Icon } from '@iconify/react';


const LayoutComponent = ({children, country, setCountry, countries, AddCountry}) => {
  return (
    <div className='w-full h-full'>
      {/* Navbar */}
      <div className='navbar w-full bg-app-black h-1/10 text-white flex items-center justify-between'>
         <div className='w-1/3 text-xl lg:w-2/3 lg:text-3xl font-semibold p-8'>Country Visualizer</div>
         <div className='w-2/3 lg:w-1/3 h-full flex items-center justify-center '>
              <div className='w-3/4 search flex items-center justify-center'>
                <div className=' w-full flex items-center justify-start bg-app-brown text-white rounded-full p-2'>
                  <Icon icon="ic:baseline-search" className='w-1/6' fontSize={25} />
                  <input type='text' placeholder='Enter Country' 
                  className=' w-5/6 bg-app-black p-2 rounded-full' 
                  value={country} 
                  onChange={(e)=>{setCountry(e.target.value);}} 
                  onKeyDown={(e)=>{
                    if(e.key === 'Enter')
                    {
                      // SearchCountry();
                      if(countries.includes(country))
                      {
                        alert("Country already exists");
                      }
                      else
                      {
                        AddCountry();
                      }
                      
                    }
                  }}></input>
                </div>
                

              </div>

            </div>
 
      </div>
      {/* overflow auto was here */}
      <div className='content w-full h-9/10 bg-black overflow-auto'>  
           {children}
      </div>
     
    </div>
  )
}

export default LayoutComponent
