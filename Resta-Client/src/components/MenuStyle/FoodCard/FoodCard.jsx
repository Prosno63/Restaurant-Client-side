import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodCard = ({ item }) => {

    const { image, price, name, recipe, _id } = item;

    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const handelAddToCart = food => {

        if (user && user.email) {

            const cartItem = {
                menuID: _id,
                email: user.email,
                name,
                image,
                price
            }
            axios.post('http://localhost:5000/carts', cartItem )
            .then(res=>{
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${name} is added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })

        }

        else {
            Swal.fire({
                title: "You are not logged In",
                text: "Want to Log in",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Want to Log in"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        }

    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <p className='text-red-700 text-lg'>${price}</p>
                <div className="card-actions">
                    <button onClick={() => handelAddToCart(item)} className="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;