'use client';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'

interface bookedTicket{
    quantity: number;
    bookedCategoryName: string;
    bookedTicketCode: string;
    bookedTicketName: string;
    bookedEventDate: string;
    bookedSeat:string;
}


const Booked = () => {
    const [bookedTicket, setBookedTicket] = useState<bookedTicket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [id, setId] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState<bookedTicket | null>(null);

    useEffect(() => {
        const viewBooked = async () => {
            if (!id.trim()) return;
            try{
                const res = await fetch(`https://localhost:7059/api/v1/get-booked-ticket/${id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });

                if(!res.ok){
                    throw new Error(`Failed To Fetch URL: ${res.status}`)
                }

                const data: bookedTicket[] = await res.json();
                const flattenedTickets: bookedTicket[] = data.flatMap((category: any) => 
                    category.bookedTickets.map((ticket: any) => ({
                        quantity: category.qtyPerCategory,
                        bookedCategoryName: category.bookedCategoryName,
                        bookedTicketCode: ticket.bookedTicketCode,
                        bookedTicketName: ticket.bookedTicketName,
                        bookedEventDate: ticket.bookedEventDate,
                        bookedSeat: ticket.bookedSeat
                    }))
                );
                setBookedTicket(flattenedTickets);

                console.log("Raw API response:", id, flattenedTickets);
                console.log("Rendered Booked Tickets:", bookedTicket);
           }catch(error){
            console.error("Error Fetching Data..", error);
            }finally{
            setLoading(false);
            }

            if (!id) return;
        } 

        viewBooked();
    }, [id]);

    const handleEditMode = (ticket: bookedTicket) =>{
        setEditMode(true);
        setEditedData(ticket);
    }

    const handleEditedDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(editedData){
            setEditedData({...editedData, [e.target.name]: e.target.value});
        }
    }

    const handleUpdate = async() => {
        if(!editedData) return;

        try{
            const res = await fetch(`https://localhost:7059/api/v1/edit-booked-ticket/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify([editedData]),
            });
            const responseBody = await res.text();
            console.log("Response Status:", res.status);
            console.log("Response Body:", responseBody);

            if(!res.ok){
                throw new Error(`Failed To Fetch URL: ${res.status}`)
            }

            alert("Update Successfully");
            setEditMode(false);
            setBookedTicket((prev) => prev.map((t) => 
                (t.bookedTicketCode === editedData.bookedTicketCode? editedData : t)))
            
        }catch(error){
            console.error("Error Fetching Data..", error);
        }
    }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
        <div className='flex items-start justify-start '>
          <Link href="/">
            <button className="-ml-60 rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">
              back
            </button>
          </Link>
        </div>

        <div>
            <label>Insert Id</label>
            <input type='text' placeholder='Id' className='border rounded-xl p-2 mx-2 my-2'
            onChange={(e) => setId(e.target.value)}/>
        </div>

        {/* <pre>{JSON.stringify(bookedTicket, null, 2)}</pre> */}

        <h1 className="text-3xl mb-3">Booked Tickets</h1>
            {loading ? (
            <p>loading..</p>
            ) : bookedTicket.length > 0 ?(
            <table className='table-auto border border-gray-400'>
                <thead>
                    <tr>
                    <th className="border border-gray-400 px-4 py-2">Quantity</th>
                    <th className="border border-gray-400 px-4 py-2">Category Name</th>
                    <th className="border border-gray-400 px-4 py-2">Ticket Code</th>
                    <th className="border border-gray-400 px-4 py-2">Ticket Name</th>
                    <th className="border border-gray-400 px-4 py-2">Date</th>
                    <th className="border border-gray-400 px-4 py-2">Seat</th>
                    <th className="border border-gray-400 px-4 py-2">Edit</th>
                    </tr>
                </thead>
                <tbody>
                {bookedTicket.map((ticket, index) => (
                    <tr key={ticket.bookedTicketCode || index}>
                        <td className="border border-gray-400 px-4 py-2">{ticket.quantity}</td>
                        <td className="border border-gray-400 px-4 py-2">{ticket.bookedCategoryName}</td>
                        <td className="border border-gray-400 px-4 py-2">{ticket.bookedTicketCode}</td>
                        <td className="border border-gray-400 px-4 py-2">{ticket.bookedTicketName}</td>
                        <td className="border border-gray-400 px-4 py-2">{ticket.bookedEventDate}</td>
                        <td className="border border-gray-400 px-4 py-2">{ticket.bookedSeat}</td>
                        <td className="border border-gray-400 px-4 py-2">
                            <button className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer"
                                onClick={() => handleEditMode(ticket)}>
                                Edit data
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            ) : (
          <p>There are no Bookeds Tickets</p>
        )} 

        {editMode && editedData && (
            <div className='flex justify-center items-center flex-col mt-15'>
                    <h2>Edit Your Booked Ticket</h2>
                <div>
                    <div className='my-4'>
                        <label>Ticket Code: </label>
                        <input type="text" name="bookedTicketCode" value={editedData.bookedTicketCode} 
                            onChange={handleEditedDate} className="border rounded-2xl p-2 ml-8"/>
                    </div>

                    <div>
                        <label>Ticket Name: </label>
                        <input type="text" name="bookedTicketName" value={editedData.bookedTicketName} 
                            onChange={handleEditedDate} className="border rounded-2xl p-2 ml-7"/>
                    </div>

                    <div className='my-4'> 
                        <label>Quantity: </label>
                        <input type="text" name="quantity" value={editedData.quantity} 
                            onChange={handleEditedDate} className="border rounded-2xl p-2 ml-14"/>
                    </div>

                    <div>
                        <label>Category Name: </label>
                        <input type="text" name="bookedCateogryName" value={editedData.bookedCategoryName} 
                            onChange={handleEditedDate} className="border rounded-2xl p-2"/>
                    </div>
                </div>
                
                <div className='mt-4'>
                    <button onClick={handleUpdate} className="rounded-2xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer">Save</button>

                    <button onClick={() => setEditMode(false)} className="rounded-2xl bg-red-500 text-white p-2 ml-2 hover:cursor-pointer">Cancel</button>
                </div>
            </div>
        )}
        

    </div>
  )
}

export default Booked