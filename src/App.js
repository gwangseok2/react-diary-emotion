import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import RouteTest from './components/RouteTest';
import React, { useReducer, useRef } from 'react';

/**
 * 1. Path Variable
 * /diary/1 -> 1번 일기
 * useParams() hooks
 * 2. Query String
 * - const [searchParams, setSerachParams] = useSearchParams();
 * 3. Page Moving
 * - useNavigate()
 */
const reduce = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [...action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((el) => el.id !== action.targetId);
      console.log(newState, 'remove');
      break;
    }
    case 'EDIT': {
      newState = state.map((el) =>
        el.id === action.data.id ? { ...action.data } : el
      );
      break;
    }
    default: {
      return state;
    }
  }
  return state;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
const dummyDate = [
  {
    id: 1,
    emotion: 2,
    contents: `오늘의 일기 1`,
    date: new Date().getTime(),
  },
  {
    id: 2,
    emotion: 2,
    contents: `오늘의 일기 2 개미는 오늘도 뚠뚠`,
    date: new Date().getTime() + 1,
  },
  {
    id: 3,
    emotion: 3,
    contents: `오늘의 일기 3`,
    date: new Date().getTime() + 2,
  },
  {
    id: 4,
    emotion: 3,
    contents: `오늘의 일기 4`,
    date: new Date().getTime() + 3,
  },
  {
    id: 5,
    emotion: 3,
    contents: `오늘의 일기 5`,
    date: new Date().getTime() + 4,
  },
  {
    id: 6,
    emotion: 4,
    contents: `오늘의 일기 6`,
    date: new Date().getTime() + 400000000,
  },
];

function App() {
  const [data, dispatch] = useReducer(reduce, dummyDate);

  const dataId = useRef(0);

  // create
  const onCreate = (date, contents, emotion) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        contents,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // remove
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  };

  // EDIT
  const onEdit = (targetId, date, contents, emotion) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date),
        contents,
        emotion,
      },
    });
    dataId.current += 1;
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={(onCreate, onEdit, onRemove)}>
        <BrowserRouter>
          <div className="App">
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
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
