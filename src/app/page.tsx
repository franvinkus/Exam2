
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="text-3xl">Welcome</h1>
        <div className="flex-row mt-3">
          <Link href="/available">
            <button className="rounded-3xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer ">
              See Available Tickets
            </button>
          </Link>

          <Link href="/book">
            <button className="rounded-3xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer mx-3">
              Book Tickets
            </button>
          </Link>

          <Link href="/bookedbyid">
            <button className="rounded-3xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer ">
              Booked Ticket by Id
            </button>
          </Link>

          <Link href="/bookedAll">
            <button className="rounded-3xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer mx-3">
              All Booked Tickets
            </button>
          </Link>

          <Link href="/bookededit">
            <button className="rounded-3xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer ">
              Edit Ticket Quantity
            </button>
          </Link>
          
          <button className="rounded-3xl border-2 border-black p-2 hover:text-white hover:bg-black hover:border-white hover:cursor-pointer mx-3">
            Print Tickets
          </button>
        </div>
      </div>
    </main>
  );
}
