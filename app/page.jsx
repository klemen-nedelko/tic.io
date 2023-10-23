import React from 'react'
import { getServerSession } from "next-auth"
import { options } from './api/auth/[...nextauth]/options';
import AdminDashboard from './(components)/AdminDashboard';
import Home from './(components)/Home';


const HomePage = async() => {
  const session = await getServerSession(options);
  return (
    <>
      {session?.user?.role === 'Admin' ? <AdminDashboard/>: <Home/>}
    </>
  )
}

export default HomePage