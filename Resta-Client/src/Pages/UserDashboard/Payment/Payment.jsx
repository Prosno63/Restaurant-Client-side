import React from 'react';
import SectionHeader from '../../../components/SectionHeading.jsx/SectionHeader';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from './CheckOut';


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway)
const Payment = () => {
    return (
        <div className='p-4'>

            <SectionHeader heading="Make Payment" subHeading="Secure Payment"></SectionHeader>
            <div className='pt-6'>
                <Elements stripe={stripePromise}>

                    <CheckOut></CheckOut>


                </Elements>
            </div>
        </div>
        
    );
};

export default Payment;