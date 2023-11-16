import { useState } from 'react';
import OrderCov from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../Hooks/useMenu';
import FoodCard from '../../components/MenuStyle/FoodCard/FoodCard';
import { useParams } from 'react-router-dom';

const Order = () => {

    

    const [tabIndex, setTabIndex] = useState(0);
    const [menu] = useMenu([]);
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const drinks = menu.filter(item => item.category === 'drinks');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    return (
        <div>
            <Helmet>
                <title>KhanaKhaja | Order</title>
            </Helmet>

            <Cover img={OrderCov} title="Order Food"></Cover>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <div className='text-center mt-6 font-bold'>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab>
                        <Tab>Pizza</Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-4 mb-4'>
                        {
                            salad.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>

                    <div className='grid grid-cols-3 gap-4 mb-4'>
                        {
                            dessert.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>

                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-4 mb-4'>
                        {
                            drinks.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid grid-cols-3 gap-4 mb-4'>
                        {
                            pizza.map(item => <FoodCard key={item._id} item={item}></FoodCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>

        </div>
    );
};

export default Order;