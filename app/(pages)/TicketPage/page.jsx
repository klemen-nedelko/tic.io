import React from 'react'
import TicketCard from '@/app/(components)/TicketCard';
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


const Dashboard = async() => {

  const session = await getServerSession(options);
const getTickets = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/Tickets', {
        cache:'no-store',
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      });
      return res.json();
    }catch(e){
      console.error(e)
    }  
}  
const {tickets} = await getTickets();

const unieuqCategories = [
  ...new Set(tickets.map(({category}) => category))
];

  return (
    <div className="p-5">
      <div>
        {tickets ? (tickets && unieuqCategories?.map((unieuqCategory, categoryIndex) =>
          <div className='mb-4' key={categoryIndex}>
              <h2>{unieuqCategory}</h2>  
            <div className="lg:grid grid-cols-2 xl:grid-cols-4">
              {tickets
                .filter((ticket) => ticket.category === unieuqCategory)
                .map((filteredTicket, _index)=>(
                  <TicketCard id={_index} key={_index} ticket={filteredTicket}/>
                ))
              }
            </div>
          </div>
        )) : <h3>NO content</h3>}
      </div>
    </div>
  )
}

export default Dashboard