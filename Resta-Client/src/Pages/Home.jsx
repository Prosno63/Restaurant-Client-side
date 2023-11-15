import React from 'react';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import PopularMenu from './PopularMenu/PopularMenu';
import Featured from './Featured/Featured';
import Testy from './Testimonials/Testy';

const Home = () => {
    return (
        <div>

            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testy></Testy>
            
        </div>
    );
};

export default Home;