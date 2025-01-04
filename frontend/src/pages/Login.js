import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] =useState(false);
    const[data,setData]=useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()
    const {fetchUserDetails,fetchUserAddToCart} = useContext(context)
   
    const handleOnChange =(e)=>{
        const{name,value} =e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] :value
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method:SummaryApi.signIn.method,
            credentials :'include',
            headers :{
                "content-type" :"application/json"
            },
            body:JSON.stringify(data)
        
        })
        const dataApi = await dataResponse.json()
            
        if(dataApi.success){
            toast.success(dataApi.message)
            fetchUserDetails()
            navigate("/")
            fetchUserAddToCart()
            }
        if(dataApi.error){
        toast.error(dataApi.message) 
        }
    }
    
  return (
   <section id='login'>
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
            <div className='w-20 h-20 mx-auto'>
                <img src={loginIcons} alt='login icons'/>
            </div>
            <form className='pt-5 flex flex-col gap-2' onSubmit={handleSubmit}>
                <div className='grid'>
                    <label>Email: </label>
                    <div className='bg-slate-100 p-2'>
                    <input  name='email' value={data.email} onChange={handleOnChange} type='email' placeholder='Enter Email..' className='w-full h-full outline-none bg-transparent '/>
                    </div>
                </div>
                <div className='grid'>
                    <label>Password: </label>
                    <div className='bg-slate-100 p-2 flex'>     
                         <input name='password' value={data.password} onChange={handleOnChange} type={showPassword ? "text" : "password"} placeholder='Enter Password..'className='w-full h-full outline-none bg-transparent'></input>
                         <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                            <span>
                                {
                                    showPassword ?(
                                        <FaEyeSlash />

                                    ):(
                                        <FaEye/>
                                    )
                                }
                                
                                
                            </span>

                         </div>
                    </div>
                    <Link to={'/forget-password' } className='block w-fit ml-auto hover:underline hover:text-red-800'>
                        Forget Password

                    </Link>

                </div>
                <button className='bg-gray-700 hover:bg-gray-900 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 translate-all mx-auto block mt-6'>Login</button>
            </form>
            <p className='my-5'>Don't have an account ?<Link to={"/sign-up"} className=' text-red-600 hover:text-red-900 hover:underline'>Sign-up</Link></p>
        </div>
    </div>

   </section>
  )
}

export default Login