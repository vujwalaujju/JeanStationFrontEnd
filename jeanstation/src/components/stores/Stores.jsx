import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Stores.css'
const Stores = () => {
    const navigate=useNavigate()
  const  Hhandler=()=>{
        navigate('/Hyderabad')
    }
    const Bhandler=()=>{
        navigate('/Banglore')
    }
    const Chandler=()=>{
        navigate('/Chennai')
    }
  return (
    <div>
    <ol>
        <li><Link to ='/Hyderabad'><div onClick={Hhandler}>Hyderabad-1</div></Link></li>
        <li><Link to ='/Banglore'><div onClick={Bhandler}>Banglore-2</div></Link></li>
        <li><Link to='/Chennai'><div onclick={Chandler}>Chennai-3</div></Link></li>
    </ol>
    </div>
  )
}

export default Stores