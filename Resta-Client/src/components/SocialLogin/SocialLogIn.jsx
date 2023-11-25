import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa6';
import AuthProvider, { AuthContext } from '../../Providers/AuthProvider';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';

const SocialLogIn = () => {

    const {googleSignIn} = useContext(AuthContext);

    const axiosPublic = UseAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result =>{
            console.log(result.user)
            const userInfo ={
                name: result.user?.displayName,
                email: result.user?.email
            }

            axiosPublic.post('/users', userInfo)

            .then(res=>{

                navigate('/')
                
            })


        })
    }
    return (
        <div className='text-center mt-2'>

            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary"> <FaGoogle></FaGoogle> Continue with Google</button>

        </div>
    );
};

export default SocialLogIn;