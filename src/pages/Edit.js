import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  console.log('id:', id);

  const mode = searchParams.get('mode');
  console.log('mode:', mode);

  return (
    <div>
      <h1>여기는 edit</h1>
      <button onClick={() => setSearchParams({ who: 'sging' })}>
        QS바꾸기
      </button>
      <button
        onClick={() => {
          navigate('/home');
        }}
      >
        Home으로 이동
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      ></button>
    </div>
  );
};

export default Edit;
