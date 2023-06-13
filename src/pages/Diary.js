import React from 'react';
import { useParams } from 'react-router-dom';

const Diary = () => {
  // path variable을 모아서 객체로 만들어줌
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>여기는 {id}번째 일기야</h1>
    </div>
  );
};

export default Diary;
