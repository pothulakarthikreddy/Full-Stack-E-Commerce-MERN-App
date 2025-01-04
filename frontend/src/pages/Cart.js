import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import context from '../context';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import { MdDelete } from "react-icons/md";
import { FaAmazonPay } from "react-icons/fa6";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const  cartProductCount = useContext(context);
  const loadingCart = new Array(cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const response = await fetch(`${SummaryApi.updateCartProduct.url}`, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });
  
      const responseData = await response.json();
      if (responseData.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        console.error("Failed to update quantity:", responseData.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  const decreaseQty = async (id, qty) => {
    if(qty >= 2){
      try {
        const response = await fetch(`${SummaryApi.updateCartProduct.url}`, {
          method: SummaryApi.updateCartProduct.method,
          credentials: 'include',
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
            quantity: qty - 1,
          }),
        });
    
        const responseData = await response.json();
        if (responseData.success) {
          setData((prevData) =>
            prevData.map((item) =>
              item._id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
          );
        } else {
          console.error("Failed to update quantity:", responseData.message);
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };
  const deleteCartProduct = async (id) => {
    // Optimistically update the UI by removing the product locally
    const originalData = [...data]; // Save current state for potential rollback
    setData((prevData) => prevData.filter((item) => item._id !== id));
  
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        // Successfully deleted the product
        if (cartProductCount && cartProductCount.fetchUserAddToCart) {
          cartProductCount.fetchUserAddToCart();
        } 
      } else {
        // Rollback if the deletion failed
        console.error("Failed to delete product:", responseData.message);
        setData(originalData);
      }
    } catch (error) {
      // Rollback and handle errors
      console.error("Error deleting product:", error);
      setData(originalData);
    }
  };
  


  const totalQty = data.reduce((previousValue,currentValue)=>previousValue + currentValue.quantity,0)
  const totalPrice = data.reduce((preve,curr)=> preve+(curr.quantity *curr?.productId?.sellingPrice),0)

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Data</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* View product */}
        <div className="w-full max-w-3xl">
          {!loading
            ? data.map((product, index) => (
                <div
                  key={product._id || `fallback-${index}`}
                  className="w-full h-32 my-2 border bg-white border-slate-400 rounded grid grid-cols-[128px,1fr]"
                >
                  <div className="w-28 h-32 bg-slate-200">
                    <img
                      src={product?.productId?.productImage?.[0] || '/fallback-image.jpg'}
                      alt="Product"
                      className="w-full h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <div className='px-4 py-2 relative '>
                    {/* delete product */}
                    <div className=' absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white' onClick={()=>deleteCartProduct(product?._id)}>
                    <MdDelete />
                      </div>
                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                    <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                   <div className='flex items-center justify-between'>
                   <p className='text-red-500 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                   <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product.quantity)}</p>
                    </div>
                    <div className='flex items-center gap-3 mt-1'>
                      <button className=' pl-1 border border-gray-600 text-gray-700 hover:bg-gray-600 hover:text-white w-6 h-6    justify-center rounded' onClick={() => {decreaseQty(product?._id, product?.quantity)}}><FaMinus className='w-3 h-3'/></button>
                      <span>{product?.quantity}</span>
                      <button className=' pl-1.5 border border-gray-600 text-gray-700 w-6 h-6 hover:bg-gray-600 hover:text-white justify-center rounded' onClick={() => {increaseQty(product?._id, product?.quantity)}} ><FaPlus className='w-3 h-3'/></button>
                      </div>
                    </div>
                </div>
              ))
            : loadingCart.map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className="w-full h-32 my-2 border bg-slate-300 border-slate-400 animate-pulse rounded"
                ></div>
              ))}
        </div>

        {/* Summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {
            loading ?(
              <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                </div>

            ):(
              <div className='h-36 bg-white'>
                <h2 className='text-white bg-gray-600 px-4 py-1'>Summary</h2>
                      <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                        <p>Quantity  :</p>
                        <p>{totalQty}</p>
                        </div>
                        <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                          <p>Total Price  : </p>
                          <p>{displayINRCurrency(totalPrice)}</p>
                          </div>
                          <button className='bg-blue-600 p-2 text-white w-full '>Payment </button>
                </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
