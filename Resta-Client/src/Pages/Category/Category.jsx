

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import slide1 from '../../assets/home/slide1.jpg';
import slide2 from '../../assets/home/slide2.jpg';
import slide3 from '../../assets/home/slide3.jpg';
import slide4 from '../../assets/home/slide4.jpg';
import slide5 from '../../assets/home/slide5.jpg';


// import required modules
import { Pagination } from 'swiper/modules';
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';

const Category = () => {


    return (
        <section>
            <SectionHeader subHeading={"Should Try"}
            heading={"Chef Recommendation"}>

            </SectionHeader>
            <div className='mb-5'>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><img src={slide1} alt="" /> <h1 className='text-sm lg:text-4xl -mt-16 text-center text-black uppercase'>Salad</h1></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /><h1 className='text-sm lg:text-4xl -mt-16 text-center text-black uppercase'>Desert</h1></SwiperSlide>
                <SwiperSlide><img src={slide3} alt="" /><h1 className='text-sm lg:text-4xl -mt-16 text-center text-black uppercase'>Soup</h1></SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" /><h1 className='text-sm lg:text-4xl -mt-16 text-center text-black uppercase'>Cake</h1></SwiperSlide>
                <SwiperSlide><img src={slide5} alt="" /><h1 className='text-sm lg:text-4xl -mt-16 text-center text-black uppercase'>Salad</h1></SwiperSlide>

            </Swiper>
        </div>
        </section>
    );
};

export default Category;