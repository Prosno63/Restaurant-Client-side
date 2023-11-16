import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';
import MenuStyle from '../../components/MenuStyle/MenuStyle';
import useMenu from '../../Hooks/useMenu';

const PopularMenu = () => {

   const [menu] = useMenu([]);
   const popular =  menu.filter(item => item.category === 'popular');
        
    return (
        <section>
            <SectionHeader 
            heading = "From Our Menu"
            subHeading = "Popular Items">
            </SectionHeader>

            <div className='grid md:grid-cols-2 mt-6 mb-6 gap-10'>
            {
                popular.map(item=> <MenuStyle
                key={item._id}
                item = {item}
                ></MenuStyle>)
            }
            </div>
            
          <div className='mt-2 ' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className='btn btn-outline border-0 border-b-4 justify-center'>View Full Menu</button>
          </div>
           
            
        </section>
    );
};

export default PopularMenu;