import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
    localStorage.removeItem('authToken');
    navigate('/');
    },[navigate]);
  return (
<></>
  )
}

export default LogOut