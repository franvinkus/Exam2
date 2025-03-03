'use client';
import Link from 'next/link'
import React, {useEffect, useState} from 'react'

const PdfTicket = () => {

    const downloadPDF = async (url: string) =>{
        try{
            const res = await fetch(url, {
                method: "GET",
                headers: { "Accept": "application/PDF" }
            });

            if(!res.ok){
                throw new Error(`Failed To Fetch PDF: ${res.status}`)
            }
        }catch(error){
            console.error("Error Fetching Data..", error);
        }
    }


  return (
    <div className='flex justify-center items-center h-screen border-2 flex-col'>
        <div>
            <Link href="/">
                <button className="-ml-72 rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
                back
                </button>
            </Link>
        </div>
        <h2 className='text-3xl mb-3 flex justify-center'>Download Ticket Data to PDF</h2>

        <div >
            <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer mr-1" onClick={() => downloadPDF(`https://localhost:7059/api/PdfGenerator/PDF-FileReport-AvailableTickets`)}>
                Download Available Ticket
            </button>

            <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer ml-1" onClick={() => downloadPDF(`https://localhost:7059/api/PdfGenerator/PDF-FileReport-BookedTicket`)}>
                Download Booked Ticket
            </button>
        </div>

            
    </div>
  )
}

export default PdfTicket