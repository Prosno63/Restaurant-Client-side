import React, { useEffect, useState } from 'react';
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';
import MenuStyle from '../../components/MenuStyle/MenuStyle';

const PopularMenu = () => {

    const [menu, setMenu] = useState([]);
    useEffect( ()=>{
        fetch('menu.json')
        .then(res=>res.json())
        .then(data=>{
            
            const popularItems = data.filter(item => item.category === 'popular');
            setMenu(popularItems)})
    },[])
    return (
        <section>
            <SectionHeader 
            heading = "From Our Menu"
            subHeading = "Popular Items">
            </SectionHeader>

            <div className='grid md:grid-cols-2 mt-6 mb-6 gap-10'>
            {
                menu.map(item=> <MenuStyle
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