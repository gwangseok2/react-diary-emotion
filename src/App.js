import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import RouteTest from './components/RouteTest';

/**
 * 1. Path Variable
 * /diary/1 -> 1번 일기
 * useParams() hooks
 * 2. Query String
 * - const [searchParams, setSerachParams] = useSearchParams();
 * 3. Page Moving
 * - useNavigate()
 */

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
            {/* 무조건 id가 있어야 Diary 컴포넌트를 불러옴. */}
            <Route path="/diary/:id" element={<Diary />} />
            {/* 이런식으로 예외처리 가능 */}
            <Route path="/diary" element={<Diary />} />
          </Routes>
          <RouteTest />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
