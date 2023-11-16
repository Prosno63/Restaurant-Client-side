import React from 'react';

const FoodCard = ({item}) => {

    const {image, price, name, recipe }= item;
    
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image}alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <p className='text-red-700 text-lg'>${price}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;