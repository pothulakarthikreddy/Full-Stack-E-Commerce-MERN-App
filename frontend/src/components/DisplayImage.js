import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center'>
        <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4 '>
            <div className='w-fit ml-auto text-2xl hover:text-red-700 cursor-pointer' aria-label="Close" onClick={onClose} >
                      <IoMdClose />
            </div>
        <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
        {imgUrl ? (
            <img
              src= {imgUrl}
              alt="Displayed content"
              className="w-full h-full "
            />
          ) : (
            <div onClick={onClose}>
             
            <p className="text-gray-500 text-center" aria-label="Close" onClick={onClose}>Image not available</p>
              </div>

            
          )}
        </div>
        </div>
    </div>
  )
}

export default DisplayImage