import React, { useEffect, useState } from 'react';
import SectionHeader from './../../components/SectionHeading.jsx/SectionHeader';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'

const Testy = () => {


    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))

    }, [])
    return (




        <div>

            <SectionHeader

                heading='What Our Clients Say'
                subHeading='Testimonials'

            ></SectionHeader>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    reviews.map(review => <SwiperSlide key={review._id}>
                        <div className='flex flex-col items-center p-10'>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className='p-8'>{review.details}</p>
                            <p className='text-xl text-red-600 mt-1'>{review.name}</p>
                        </div>
                    </SwiperSlide>)

                }

            </Swiper>

        </div>
    );
};

export default Testy;