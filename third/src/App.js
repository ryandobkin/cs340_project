import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SelectPage from './SelectPage';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SelectPage />} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
