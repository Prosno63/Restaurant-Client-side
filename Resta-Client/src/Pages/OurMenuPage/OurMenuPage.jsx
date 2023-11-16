import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover';
import covImg from '../../assets/menu/pizza-bg.jpg'
import covImg3 from '../../assets/menu/salad-bg.jpg'
import PopularMenu from '../PopularMenu/PopularMenu';
import useMenu from '../../Hooks/useMenu';
import SectionHeader from '../../components/SectionHeading.jsx/SectionHeader';
import MenuCategory from './MenuCatgory/MenuCategory';

const OurMenuPage = () => {
    const [menu] = useMenu([]);
    const offered =  menu.filter(item => item.category === 'offered');
    const dessert =  menu.filter(item => item.category === 'dessert');
    const drinks =  menu.filter(item => item.category === 'drinks');
    const salad =  menu.filter(item => item.category === 'salad');
    return (
        <div>

            <Helmet>
            <title>KhanaKhaja | Menu</title>
            </Helmet>
            <Cover img={covImg} title='Our Menu'></Cover>

            <SectionHeader heading="Don't miss" subHeading="Today's offer"></SectionHeader>
            <MenuCategory items={offered}></MenuCategory>

            <Cover img = {covImg3} title='Salad'></Cover>
            <MenuCategory items={salad}></MenuCategory>
            <Cover img = {covImg3} title='dessert'></Cover>
            <MenuCategory items={dessert}></MenuCategory>
            <Cover img = {covImg3} title='drinks'></Cover>
            <MenuCategory items={drinks}></MenuCategory>
            

            
            
        </div>
    );
};

export default OurMenuPage;