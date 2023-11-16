import React from 'react';
import MenuStyle from '../../../components/MenuStyle/MenuStyle';

const MenuCategory = ({items}) => {
    return (
        <div>
            <div className='grid md:grid-cols-2 mt-6 mb-6 gap-10'>
            {
                items.map(item=> <MenuStyle
                key={item._id}
                item = {item}
                ></MenuStyle>)
            }
            </div>
        </div>
    );
};

export default MenuCategory;