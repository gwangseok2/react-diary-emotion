import React, { useContext, useEffect, useState } from 'react';
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from '../App';
import DiaryList from '../components/DiaryList';
const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월 ${curDate.getDate()}일`;

  // 일기 filter
  useEffect(() => {
    if (diaryList.length > 0) {
      const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1);
      const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0);
      console.log(new Date(firstDay), new Date(lastDay));

      setData(diaryList.filter((el) => el.date >= firstDay && el.date <= lastDay));
    }
  }, [diaryList, curDate]);

  useEffect(() => {
    console.log(data, 'useEffect');
  }, [data]);

  const increseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
  };

  const decreseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
  };

  return (
    <div style={{ width: '100%' }}>
      <MyHeader
        headText={headText}
        leftChild={<MyButton buttonText={'<'} buttonEvent={decreseMonth} />}
        rightChild={<MyButton buttonText={'>'} buttonEvent={increseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
