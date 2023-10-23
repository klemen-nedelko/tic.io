import { faHome, faPlus, faTicket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"

const Nav = async() => {
    const session = await getServerSession(options);
  return (
    <header className="text-gray-100">
    <nav className="flex justify-between bg-nav items-center w-full px-10 py-4">
        <div className="flex items-center space-x-4">
            <Link href="/">
                <FontAwesomeIcon icon={faHome} className="icon" />
            </Link>
            <Link href="/CreateUser">
                Create User
            </Link>
            <Link href="/Member">
                Member
            </Link>
            
            <Link href="/Public">
                Public    
            </Link>
            <Link href="/TicketPage">
                <FontAwesomeIcon icon={faTicket} className="icon" />
                Tickets
            </Link>
            
            <Link href="/TicketPage/new">
                <FontAwesomeIcon icon={faPlus} className="icon" />
                Create new Ticket
            </Link>
            </div>
        <div>
            {session ? 
            <div>
                <p>{session?.user?.name}</p>
                <Link href="/api/auth/signout?callbackUrl=/">Log out</Link>
            </div>
            : <Link href="/api/auth/signin">Login</Link>}
        </div>
    </nav>
    </header>
  )
}

export default Nav