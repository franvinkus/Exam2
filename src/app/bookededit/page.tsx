import Link from 'next/link'
import React, {useEffect, useState} from 'react'

interface bookedTicket{

}

const bookededit = () => {



  return (
    <div className='flex justify-center items-center h-screen border-2'>
        <div className=''>
            <Link href="/">
                <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
                back
                </button>
            </Link>
        </div>
        <h2 className='text-3xl mb-3 flex justify-center'>Book Your Ticket Here</h2>

            <div className='border-2 m-6 p-7 '>    
                {/*<div className='grid grid-cols-1'>
                
                    <div  className='flex items-center'>
                        <label className="">
                        Category Name:
                        <input type='text' placeholder='Category Name' className='border rounded-xl p-2 mx-2 my-2' 
                        onChange={(e) => setCategoryName(e.target.value)}/>
                        </label> 
                    </div>

                    <div className='flex items-center'>
                        <label>
                        Ticket Code:
                        <input type='text' placeholder='Ticket Code' className='ml-9 border rounded-xl p-2 mx-2 my-2' 
                        onChange={(e) => setTicketCode(e.target.value)}/>
                        </label> 
                    </div>

                    <div  className='flex items-center'>
                        <label>
                        Ticket Name:
                        <input type='text' placeholder='Ticket Name' className='ml-8 border rounded-xl p-2 mx-2 my-2' 
                        onChange={(e) => setTicketName(e.target.value)}/>
                        </label> 
                    </div>

                    <div  className='flex items-center'>
                        <label>
                        Seat:
                        <input type='text' placeholder='Seat' className='ml-22 border rounded-xl p-2 mx-2 my-2' 
                        onChange={(e) => setSeat(e.target.value)}/>
                        </label> 
                    </div> */}

                    {/* <button className='p-2 mt-4 border-2 rounded-3xl hover:cursor-pointer hover:text-white hover:bg-black hover:border-white' onClick={book}>
                        Book Ticket
                    </button>
                 */}
            </div>
    </div>
  )
}

export default bookededit