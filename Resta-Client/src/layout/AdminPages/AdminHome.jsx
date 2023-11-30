import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import UseAxiosHook from '../../Hooks/UseAxiosHook';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers, FaUtensils } from 'react-icons/fa6';
import { Helmet } from 'react-helmet-async';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend} from 'recharts';



const AdminHome = () => {
    const { user } = useContext(AuthContext);
    const axiosHook = UseAxiosHook();
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    

    const { data: stats = [] } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosHook.get('/admin-stats');
            return res.data
        }
    })
    const { data: ChartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosHook.get('/order-stats');
            return res.data
        }
    })

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = ChartData.map(data=>{
        return {name: data.category, value: data. revenue}
    })

    return (
        <div>

            <Helmet>
                <title>KhanaKhaja | Dashboard</title>
            </Helmet>

            <h1 className="text-3xl mt-2 ml-2">Welcome {user.displayName}</h1>

            <div className='text-center mt-10'>
                <div className="stats shadow">

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <RiMoneyDollarCircleFill className='h-8 w-8' />      </div>
                        <div className="stat-title"> Revenue</div>
                        <div className="stat-value">$ {stats?.revenue}</div>
                    </div>



                    <Link to='/dashboard/users'>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaUsers className='h-8 w-8'></FaUsers>        </div>
                            <div className="stat-title">Total Users</div>
                            <div className="stat-value">{stats?.users}</div>
                        </div>

                    </Link>

                    <Link to='/dashboard/manageItems'>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <FaUtensils className='h-8 w-8'></FaUtensils>    </div>
                            <div className="stat-title">Menu Items</div>
                            <div className="stat-value">{stats?.NumberOfItem}</div>
                        </div>
                    </Link>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                        </div>
                        <div className="stat-title">Total Order</div>
                        <div className="stat-value">{stats?.NumberOfOrder}</div>
                    </div>



                </div>
                <div className='flex justify-around items-center'>
                    <div className='w-1/2'>
                        <BarChart
                            width={500}
                            height={300}
                            data={ChartData}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                {ChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </div>

                    <div className='w-1/2'>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                     
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;