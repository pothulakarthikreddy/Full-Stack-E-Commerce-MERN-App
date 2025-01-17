import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data=[] }) => {
  const loadingList = new Array(13).fill(null)
  const {fetchUserAddToCart} = useContext(context)

  const handleAddToCart = async(e,id)=>{
    await addToCart(e,id);
    fetchUserAddToCart()

  }
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:gap-4 overflow-x-scroll scrollbar-none transition-all' >
             
            {
                loading ?(
                    loadingList.map((product,index)=>{
                        return(
    
                          <div className='w-full  min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                           <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse '>
                         
                        </div>
                        <div className='p-4 gap-3'>
                          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black py-2 animate-pulse p-1 rounded-full bg-slate-200'></h2>
                          <p className='capitalize text-slate-700 animate-pulse p-1 rounded-full bg-slate-200 py-2'></p>
                          <div className='flex gap-3'>
                            <p className='text-red-500 font-medium animate-pulse p-1 rounded-full bg-slate-200 w-full py-2'></p>
                            <p className='text-slate-500 line line-through animate-pulse p-1 rounded-full bg-slate-200 w-full py-2'></p>
                            </div>
                            <button className='text-sm w-full flex justify-center items-center  text-white px-3   animate-pulse  rounded-full bg-slate-200 py-2'></button>
                      </div> 
    
                      </div>
                        )
                  })
                ) :(
                    data.map((product,index)=>{
                        return(
    
                          <Link to={"/product/"+product?._id} className='w-full  min-w-[280px]  md:min-w-[300px] max-w-[2800px] md:max-w-[300px]  bg-white rounded-sm shadow ' onClick={scrollTop}>
                           <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center '>
                          <img src={product?.productImage[0] } className='object-scale-down h-full hover:scale-110  transition-all cursor-pointer mix-blend-multiply'/>
                        </div>
                        <div className='p-4 gap-3'>
                          <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                          <p className='capitalize text-slate-700 '>{product?.category}</p>
                          <div className='flex gap-3'>
                            <p className='text-red-500 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                            <p className='text-slate-500 line line-through'>{displayINRCurrency(product?.price)}</p>
                            </div>
                            <button className='text-sm w-full flex justify-center items-center  bg-red-600 hover:bg-red-900 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                      </div> 
    
                      </Link>
                        )
                  })
                )
         
            }
            </div>
  )
}

export default VerticalCard