import React from 'react';

const MenuStyle = ({item}) => {

    const {image, price, name, recipe }= item;
    return (
        <div className='flex space-x-4'>

            <img className='w-[110px]' style={{borderRadius: '0 200px 200px 200px'}} src={image} alt="" />

            <div>
                <h3 className='uppercase'>{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-red-600'>${price}</p>


            
        </div>
    );
};

export default MenuStyle;