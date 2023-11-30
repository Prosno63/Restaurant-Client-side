import React from 'react';
import SectionHeader from '../../../components/SectionHeading.jsx/SectionHeader';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosHook from '../../../Hooks/UseAxiosHook';

const PaymentHistory = () => {

    const { user } = useContext(AuthContext);
    const axiosHook = UseAxiosHook();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosHook.get(`/payments/${user.email}`)
            return res.data
        }
    })
    return (
        <div className='m-6'>

            <SectionHeader heading="Payment History" subHeading="MoneyList"></SectionHeader>

            <div>

                <div className="overflow-x-auto mt-4">
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th>#</th>
                                <td>Email</td>
                                <td>Total Amount</td>
                                <td>Transaction ID</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((payment, index) => <tr key={payment._id}>
                                    <th>{index+1}</th>
                                    <td>{payment.email}</td>
                                    <td>{payment.price}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.date}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    );
};

export default PaymentHistory;