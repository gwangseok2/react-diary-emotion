import React, { useState } from 'react';
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
const Home = () => {
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  return (
    <div style={{ width: '100%' }}>
      <MyHeader
        headText={headText}
        leftChild={<MyButton buttonText={'<'} buttonEvent={() => {}} />}
        rightChild={<MyButton buttonText={'>'} buttonEvent={() => {}} />}
      />
      <h1>여긴 Home</h1>
    </div>
  );
};

export default Home;
