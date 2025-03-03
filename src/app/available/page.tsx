"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react'

interface Ticket {
    eventDate: string;
    quota: number;
    ticketCode: string;
    ticketName: string;
    categoryName: string;
    seat: string;
    price: number;
  }

const AvailableTicket = () => {
  const [availTicket, setAvailTicket] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilter] = useState({
      categoryName: "",
      ticketCode: "",
      ticketName: "",
      maxprice: "",
      minEventDate: "",
      maxEventDate: "",
      orderBy: "ticketCode",
      orderState: "asc",
      pageNumber: "1",
      pageSize: "10",
      totalPages:"1"
  });
  const [pendingFilter, setPendingFilter] = useState(filters);
  const [currentPage, setPage] = useState(1);
  const pageSize = 10;
  const [totalPage, setTotalPages] = useState(1);


  useEffect(()=> {
      const fetchTicket = async () =>{
          try{
              const params = new URLSearchParams(Object.fromEntries(
                  Object.entries(filters).filter(([_, value]) => value !== "")
              ))

              params.set("pageNumber", currentPage.toString());
              params.set("pageSize", pageSize.toString());

              const url = `https://localhost:7059/api/v1/Show-All-Data?${params}`;

              console.log(url);
              
              const res = await fetch(url ,{
                  method: "GET",
                  headers: { "Content-Type": "application/json" }
              })

              if(!res.ok){
                  throw new Error(`Failed To Fetch Data: ${res.status}`)
              }

              
              const data = await res.json();
              setAvailTicket(data.tickets || []);
              setTotalPages(data.totalPage || 1);
              }catch (error) {
                  console.error("Error fetching tickets", error);
              }finally{
                  setLoading(false);
              } 
      }

      fetchTicket();
    }, [filters, currentPage]);

    

  return (
    <div className="flex justify-center items-center h-screen flex-col m-20">
        <div className='mr-96 -ml-56'>
          <Link href="/">
            <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
              back
            </button>
          </Link>
        </div>

        <h1 className="text-3xl mb-3 flex justify-center">Available Tickets</h1>
        <h3 className='mr-96 -ml-56'>Filters:</h3>

        <div className='mb-4 grid grid-cols-3'>
            <input
            type='text' placeholder='Category Name' className='border rounded-xl p-2 mx-2 my-2' value={filters.categoryName} 
            onChange={(e) => setFilter({ ...filters, categoryName: e.target.value})}
            />

            <input
            type='text' placeholder='Ticket Code' className='border rounded-xl p-2 mx-2 my-2' value={filters.ticketCode} 
            onChange={(e) => setFilter({ ...filters, ticketCode: e.target.value})}
            />

            <input
            type='text' placeholder='Ticket Name' className='border rounded-xl p-2 mx-2 my-2' value={filters.ticketName} 
            onChange={(e) => setFilter({ ...filters, ticketName: e.target.value})}
            />

            <input
            type='text' placeholder='Minimum Event Date' className='border rounded-xl p-2 mx-2 my-2' value={filters.minEventDate} 
            onChange={(e) => setFilter({ ...filters, minEventDate: e.target.value})}
            />

            <input
            type='text' placeholder='Maximum Event Date' className='border rounded-xl p-2 mx-2 my-2' value={filters.maxEventDate} 
            onChange={(e) => setFilter({ ...filters, maxEventDate: e.target.value})}
            />

            <input
            type='text' placeholder='Max Price' className='border rounded-xl p-2 mx-2 my-2' value={filters.maxprice} 
            onChange={(e) => setFilter({ ...filters, maxprice: e.target.value})}
            />

            <input
            type='text' placeholder='Order By' className='border rounded-xl p-2 mx-2 my-2' value={filters.orderBy} 
            onChange={(e) => setFilter({ ...filters, orderBy: e.target.value})}
            />

            <input
            type='text' placeholder='Order State' className='border rounded-xl p-2 mx-2 my-2' value={filters.orderState} 
            onChange={(e) => setFilter({ ...filters, orderState: e.target.value})}
            />
        </div>

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
        ) : availTicket.length > 0 ?(
          <table className='table-auto border border-gray-400'>
              <thead>
                <tr>
                <th className="border border-gray-400 px-4 py-2">Date</th>
                <th className="border border-gray-400 px-4 py-2">Quota</th>
                <th className="border border-gray-400 px-4 py-2">Ticket Code</th>
                <th className="border border-gray-400 px-4 py-2">Ticket Name</th>
                <th className="border border-gray-400 px-4 py-2">Category Name</th>
                <th className="border border-gray-400 px-4 py-2">Seat</th>
                <th className="border border-gray-400 px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
              {availTicket.map((availTicket, index) => (
                  <tr key={availTicket.ticketCode || index}>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.eventDate?.toString()}</td>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.quota}</td>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.ticketCode}</td>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.ticketName}</td>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.categoryName}</td>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.seat}</td>
                    <td className="border border-gray-400 px-4 py-2">{availTicket.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        ) : (
          <p>There are no Availabale Tickets</p>
        )} 
    </div>
  )
}

export default AvailableTicket