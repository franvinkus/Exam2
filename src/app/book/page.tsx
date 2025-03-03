'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface BookedTicket {
    bookedTicketCode: string;
    bookedTicketName: string;
    bookedSeat: string;
    bookedPrice: number;
    quantity: number;
  }
  
  interface TicketPerCategory {
    bookedCategoryName: string;
    summaryPrice: number;
    bookedTickets: BookedTicket[];
  }
  
  interface BookingResult {
    summaryPrice: number;
    ticketPerCategory: TicketPerCategory[];
  }

const BookTicket = () => {
    const [categoryName, setCategoryName] = useState('');
    const [ticketCode, setTicketCode] = useState('');
    const [ticketName, setTicketName] = useState('');
    const [seat, setSeat] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const [bookingResult, setBookingResult] = useState<BookingResult>();

    const book = async () => {
      try{

        if (!categoryName || !ticketCode || !ticketName || !seat || !price || !quantity) {
            alert('Mohon isi semua field sebelum booking!');
            return;
        }

        const requestData = {
            summaryPrice:  parseInt(price) * parseInt(quantity),
            ticketPerCategory: [ // Pastikan "ticketPerCategory" sesuai dengan API
                {
                    bookedCategoryName: categoryName,
                    summaryPrice: parseInt(price) * parseInt(quantity),
                    bookedTickets: [ // HARUS "bookedTickets", bukan "bookedTicket"
                        {
                            bookedTicketCode: ticketCode,
                            bookedTicketName: ticketName,
                            bookedSeat: seat,
                            bookedPrice: parseInt(price),
                            quantity: parseInt(quantity),
                        }
                    ],
                }
            ]
        };
            

        const res = await fetch("https://localhost:7059/api/v1/book-ticket", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });
        
        console.log("Sending data:", JSON.stringify(requestData, null, 2));
  
        if(!res.ok){
          throw new Error(`Failed To Fetch URL: ${res.status}`)
        }
  
        const data = await res.json();
        setBookingResult(data);
      }catch(error){
        console.error("Error booking tickets", error);
      }

    }
         

  return (
    <div className='flex justify-center items-center h-screen border-2'>
        <div className=''>
            <Link href="/">
                <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
                back
                </button>
            </Link>

            <h2 className='text-3xl mb-3 flex justify-center'>Book Your Ticket Here</h2>

            <div className='border-2 m-6 p-7 '>    
                <div className='grid grid-cols-1'>
                
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
                    </div>

                    <div  className='flex items-center'>
                        <label>
                        Price:
                        <input type='text' placeholder='Price' className='ml-21 border rounded-xl p-2 mx-2 my-2' 
                        onChange={(e) => setPrice(e.target.value)}/>
                        </label> 
                    </div>

                    <div  className='flex items-center'>
                        <label>
                        Quantity:
                        <input type='text' placeholder='Quantity' className='ml-15 border rounded-xl p-2 mx-2 my-2' 
                        onChange={(e) => setQuantity(e.target.value)}/>
                        </label> 
                    </div>

                    <button className='p-2 mt-4 border-2 rounded-3xl hover:cursor-pointer hover:text-white hover:bg-black hover:border-white' onClick={book}>
                        Book Ticket
                    </button>
                
                </div>
            </div>
        </div>

        <div>
            {bookingResult && (
                <div className='border-black-2 rounded-2xl'> 
                    <h2>Booking Summary</h2>
                    <p>Summary Price: {bookingResult.summaryPrice}</p>
                    {bookingResult.ticketPerCategory.map((category,index) => (
                        <div key={index}>
                            <p>Category Name: {category.bookedCategoryName}</p>
                            {category.bookedTickets.map((ticket, index) => (
                                <div key={index}>
                                    <p>Ticket Code: {ticket.bookedTicketCode}</p>
                                    <p>Ticket Name: {ticket.bookedTicketName}</p>
                                    <p>Seat: {ticket.bookedSeat}</p>
                                    <p>Price: {ticket.bookedPrice}</p>
                                    <p>Quantity: {ticket.quantity}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>

    </div>
  )
}

export default BookTicket