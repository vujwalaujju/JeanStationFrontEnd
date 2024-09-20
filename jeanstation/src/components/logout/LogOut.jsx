import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email')
    localStorage.removeItem('role')
    navigate('/');
    },[navigate]);
  return (
<></>
  )
}

export default LogOut