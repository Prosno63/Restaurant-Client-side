import React from 'react';
import MenuStyle from '../../../components/MenuStyle/MenuStyle';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items }) => {
    return (
        <div>
            <div className='grid md:grid-cols-2 mt-6 mb-6 gap-10'>
                {
                    items.map(item => <MenuStyle
                        key={item._id}
                        item={item}
                    ></MenuStyle>)
                }
            </div>
            <Link to='/order'>

                <div className='mt-2 mb-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button className='btn btn-outline border-0 border-b-4 justify-center'>Order Now</button>
                </div>

            </Link>
        </div>
    );
};

export default MenuCategory;