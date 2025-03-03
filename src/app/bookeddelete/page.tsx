'use client';
import Link from 'next/link'
import React, {useEffect, useState} from 'react'

interface bookedTicket{

}

const bookeddelete = () => {
    const [bookedTicketId, setBookedTicketId] = useState('');
    const [bookedTicketCode, setBookedTicketCode] = useState('');
    const [bookedQuantity, setBookQuantity] = useState('');

    const handleReset = () => {
        setBookedTicketId('');
        setBookedTicketCode('');
        setBookQuantity('');
    };

    const  ticketDelete = async () =>{
        try{
            const res = await fetch(`https://localhost:7059/api/v1/revoke-ticket/${bookedTicketId}/${bookedTicketCode}/${bookedQuantity}`,{
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })

            if(!res.ok){
                throw new Error(`Failed To Fetch URL: ${res.status}`)
            }

            const data = await res.json();
            handleReset();

        }catch (error) {
            console.error("Error fetching tickets", error);
        }
    }



  return (
    <div className='flex justify-center items-center h-screen border-2 flex-col'>
        <div>
            <Link href="/">
                <button className="-ml-60 rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
                back
                </button>
            </Link>
        </div>
        <h2 className='text-3xl mb-3 flex justify-center'>Delete Ticket Amount</h2>

        <div>
        <input
            type='text' placeholder='Ticket Id' className='border rounded-xl p-2 mx-2 my-2' value={bookedTicketId} 
            onChange={(e) => setBookedTicketId(e.target.value)}
            />

        <input
            type='text' placeholder='Ticket Code' className='border rounded-xl p-2 mx-2 my-2' value={bookedTicketCode} 
            onChange={(e) => setBookedTicketCode(e.target.value)}
            />

        <input
            type='text' placeholder='Quantity' className='border rounded-xl p-2 mx-2 my-2' value={bookedQuantity} 
            onChange={(e) => setBookQuantity(e.target.value)}
            />

        <button className=" rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer" onClick={ticketDelete}>Save</button>

        <button className="rounded-2xl bg-red-500 text-white p-2 ml-2 hover:cursor-pointer" onClick={handleReset}>Cancel</button>
        </div>

            
    </div>
  )
}

export default bookeddelete