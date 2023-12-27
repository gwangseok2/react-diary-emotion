import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
// import RouteTest from './components/RouteTest';
import React, { useEffect, useReducer, useRef } from 'react';

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
      console.log(action);
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      localStorage.removeItem('diaryList');
      newState = state.filter((el) => el.id !== action.targetId);
      localStorage.setItem('diaryList', JSON.stringify(newState));
      break;
    }
    case 'EDIT': {
      newState = state.map((el) => (el.id === action.data.id ? { ...action.data } : el));
      break;
    }
    default: {
      console.log('defauklt');
      return state;
    }
  }
  localStorage.setItem('diaryList', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reduce, []);
  const dataId = useRef(0);

  // mounted localstrage Data check
  useEffect(() => {
    if (localStorage.getItem('diaryList')) {
      const localDiaryList = JSON.parse(localStorage.getItem('diaryList')).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(localDiaryList[0].id) + 1;

      dispatch({ type: 'INIT', data: localDiaryList });
    }
  }, []);

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
    localStorage.setItem('diaryList', JSON.stringify(data));
    console.log(localStorage.getItem('diaryList'), 'onRemove');
  };

  // EDIT
  const onEdit = (targetId, date, contents, emotion) => {
    console.log(date, 'date=== onEdit', new Date(date));
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        contents,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onInit = (data) => {};

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new" element={<New />} />
                <Route path="/edit/:id" element={<Edit />} />
                {/* 무조건 id가 있어야 Diary 컴포넌트를 불러옴. */}
                <Route path="/diary/:id" element={<Diary />} />
                {/* 이런식으로 예외처리 가능 */}
                <Route path="/diary" element={<Diary />} />
              </Routes>
            </div>
            {/* <RouteTest /> */}
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
