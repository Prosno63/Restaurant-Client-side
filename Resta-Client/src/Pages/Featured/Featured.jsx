import React from 'react';
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';
import featureImg from '../../assets/home/featured.jpg'
import '../Featured/style.css'
const Featured = () => {

    
    return (
        <div className='mb-4 featureImg mt-6 bg-fixed'>

            <SectionHeader
                heading="featured items"
                subHeading="check it Out"
            ></SectionHeader>

            <div
                className='md: flex justify-center items-center space-x-10 p-10'>
                <div>
                    <img className='w-[400px]' src={featureImg} alt="" />
                </div>

                <div className='space-y-2'>
                    <p className='text-white'>Dec 20,2023</p>
                    <p className='text-lg uppercase text-red-700'>Where can i Get Some?</p>
                    <button className='btn btn-outline border-0 border-b-4'>Order now</button>
                </div>
            </div>


        </div>
    );
};

export default Featured;