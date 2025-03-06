"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Ticket {
  id: string;
  ticketCode: string;
  ticketName: string;
  categoryName: string;
  eventDate: string;
  totalPages: number;
}

const ViewAllBookTickets = () => {
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setPage] = useState(1);
  const pageSize = 10;
  const [totalPage, setTotalPages] = useState(1);
  const [filters, setFilter] = useState({
        pageNumber: "1",
        pageSize: "10",
        totalPages:"1"
    });

  useEffect(() => {
    const fetchTicket = async () => {
      try{
          const params = new URLSearchParams(Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        ))
          params.set("pageNumber", currentPage.toString());
          params.set("pageSize", pageSize.toString());
          const res = await fetch(`https://localhost:7059/api/v1/Test-Show-All-Data?${params}`,{
            method: "GET",
            headers: { "Content-Type": "application/json" }
         });
        
        if(!res.ok){
          throw new Error(`Failed To Fetch: ${res.status}`);
        }
        const data = await res.json();
        console.log("API Response:", data);
        setTotalPages(data.totalPages || 1)

        const flattenedTickets: Ticket[] = Array.isArray(data.bookedTickets) 
        ? data.bookedTickets.flatMap((category: any) =>
          Array.isArray(category.bookedTickets) 
            ? category.bookedTickets.map((ticket: any) => ({
                id: ticket.id,
                ticketCode: ticket.bookedTicketCode,
                ticketName: ticket.bookedTicketName,
                categoryName: category.bookedCategoryName,
                eventDate: ticket.bookedEventDate
              }))
            : []
        ) 
      : [];

        setTicket(flattenedTickets);
      }catch(error){
        console.error("Error Fetching Data..", error);
      }finally{
        setLoading(false);
      }
    }

    fetchTicket();
  }, [currentPage]);

  useEffect(() => {
    console.log("Updated Ticket State:", ticket);
  }, [ticket]);
  


  return (
    <div className="flex justify-center items-center h-screen flex-col m-10">
      <div className='-ml-96 flex items-start justify-start'>
          <Link href="/">
            <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
              back
            </button>
          </Link>
        </div>
        <h1 className="text-3xl mb-3">Booked Tickets</h1>

        <div className='mb-3'>
          <button className='text-2xl hover:cursor-pointer' onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}> 
            {"<"} 
          </button>

          <span className='mx-3 '>
            Page {currentPage} ..of {totalPage}
          </span>

          <button className='text-2xl hover:cursor-pointer ' onClick={() => setPage(prev => (prev < totalPage ? prev + 1 : prev))}  
            disabled={currentPage >= totalPage}> 
            {">"} 
          </button>
        </div>

        {loading ? (
          <p>loading..</p>
        ) : ticket.length > 0 ?(
          <table className='table-auto border border-gray-400'>
              <thead>
                <tr>
                <th className="border border-gray-400 px-4 py-2">Ticket Code</th>
                <th className="border border-gray-400 px-4 py-2">Ticket Name</th>
                <th className="border border-gray-400 px-4 py-2">Category Name</th>
                <th className="border border-gray-400 px-4 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
              {ticket.map((ticket, index) => (
                  <tr key={ticket.id || index}>
                    <td className="border border-gray-400 px-4 py-2">{ticket.ticketCode}</td>
                    <td className="border border-gray-400 px-4 py-2">{ticket.ticketName}</td>
                    <td className="border border-gray-400 px-4 py-2">{ticket.categoryName}</td>
                    <td className="border border-gray-400 px-4 py-2">{ticket.eventDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <p>There are no Bookeds Tickets</p>
        )} 
    </div>
  )
}

export default ViewAllBookTickets