import { CardElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import UseAxiosHook from '../../../Hooks/UseAxiosHook';
import useCart from '../../../Hooks/useCart';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const axiosHook = UseAxiosHook();
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {

        if (totalPrice > 0) {
            axiosHook.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }

    }, [axiosHook, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);


        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm Error')
        }
        else {
            console.log('payment Intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {

                console.log('transaction id', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                const payment = {

                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuID),
                    status: 'pending'



                }

                const res = await axiosHook.post('payments', payment);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Payment Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    navigate('/dashboard/paymentHistory')



                }


            }
        }



    }
    return (
        <div className='border bg-red-500 h-60 p-4'>

            <h1 className='font-semibold my-2'>Provide your Card info here:</h1>

            <form onSubmit={handleSubmit}>
                <CardElement className='my-4'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#000000',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='my-2 btn btn-primary' type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className='text-red-800'>{error}</p>

                {transactionId && <p> Your Transaction ID: {transactionId}</p>}

            </form>

        </div>
    )
};

export default CheckOut;