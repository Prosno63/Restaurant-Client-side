import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.username)
                .then(()=>{

                    reset();

                })
                window.location.href = '/login';
                
            })
    }
    return (
        <>

            <Helmet>
                <title>KhanaKhaja | SignUp</title>
            </Helmet>


            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">SignUp now!</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("username", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.username?.type === "required" && (
                                    <p role="alert">Username is required</p>
                                )}
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email"  {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email?.type === "required" && (
                                    <p role="alert">Email is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[!@#$&*])/})} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (
                                    <p role="alert">Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p role="alert">Password must be of 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p role="alert">Password must be under 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p role="alert">Password must have one special Character</p>
                                )}


                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                            <p className='text-center'>Already have an Account? <Link className='text-blue-600' to='/login'>Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;