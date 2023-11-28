import React from 'react';
import { useForm } from "react-hook-form"
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';
import { FaSpoon, FaUtensils } from 'react-icons/fa6';

import useAxiosHook from '../../Hooks/UseAxiosHook'


import UseAxiosPublic from './../../Hooks/UseAxiosPublic';
import Swal from 'sweetalert2';


const AddItemsPage = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = UseAxiosPublic();
    const axiosHook = useAxiosHook();

    const image_hosting_key = import.meta.env.VITE_imageHostingKey;

    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        
        if(res.data.success){
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url


            }

            const menuRes = await axiosHook.post('/menu', menuItem);
            if(menuRes.data.insertedId){
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been added`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    };
    return (
        <div>

            <SectionHeader heading="Add an Item" subHeading="What's New"></SectionHeader>
            <div className='ml-4'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe name</span>
                        </label>
                        <input type="text" placeholder="RecipeName"
                            {...register('name', { require: true })} className="input input-bordered w-full" />

                    </div>
                    <div className='flex gap-x-2 justify-around'>
                        <div>
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register("category", { require: true })} className="select select-info bg-red-500 w-full max-w-xs">
                                <option disabled value="default" className='font-bold'>Select Category</option>
                                <option value="salad">Salad</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="pizza">Pizza</option>
                            </select>

                        </div>
                        <div>

                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="text" placeholder="price"
                                {...register('price', { require: true })} className="input input-bordered w-full" />



                        </div>

                    </div>
                    <div className='mb-2'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Details</span>
                                <span className="label-text-alt">Alt label</span>
                            </label>
                            <textarea {...register('recipe', { require: true })} className="textarea textarea-bordered h-24" placeholder="Write Here........"></textarea>
                        </div>
                    </div>
                    <input type="file" {...register('image', { require: true })} className="file-input file-input-bordered w-full max-w-xs" />

                    <div>
                        <button className='btn mt-2 bg-blue-700 text-white '>Add Items <FaUtensils></FaUtensils> </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemsPage;