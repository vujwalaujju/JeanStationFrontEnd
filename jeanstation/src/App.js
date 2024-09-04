import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Hyderabad from './Components/Hyderabad/Hyderabad';
import Banglore from './Components/locations/Banglore/Banglore';
import Chennai from './Components/locations/Chennai/Chennai';
import Stores from './Components/stores/Stores';
function App() {
  return (
    <div className="App">
      <Router>
        <Stores/>
        <Routes>
          <Route path='/Hyderabad' element={<Hyderabad/>}/>
          <Route path='/Banglore' element={<Banglore/>}/>
          <Route path='/Chennai' element={<Chennai/>}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
