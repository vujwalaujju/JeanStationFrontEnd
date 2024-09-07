import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Stores.css';

const Stores = () => {
  const [store, setStore] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/Stores").then((response) => {
      setStore(response.data);
    });
  }, []);

  const handleStoreClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="cardcontainer">
      {store.map((Stores) => (
        <div className="product-card" key={Stores.id} onClick={() => { handleStoreClick(Stores.id) }}>
          <h4>{Stores.id}</h4>
          <h4>{Stores.location}</h4>
          <img src={Stores.URL} width={60} height={40} alt={Stores.name} />
          <h4>{Stores.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default Stores;
