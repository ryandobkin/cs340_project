import logo from './logo.svg';
import './App.css';
import GridLayout from './GridLayout.js';
import GetSQL from './GetSQL.js';

function App() {
  return (
    <div className="App">
        <h1>CS340 HTML DB Assignment</h1>
        <GetSQL />
        <GridLayout />
    </div>
  );
}

export default App;
