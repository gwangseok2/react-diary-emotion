import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import RouteTest from './components/RouteTest';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>리엑트 라우터 세팅</div>
        </header>
        <div className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/diary" element={<Diary />} />
          </Routes>
          <RouteTest />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
