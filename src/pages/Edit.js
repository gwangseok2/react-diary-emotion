import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

const Edit = () => {
  const [editData, setEditData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((el) => parseInt(el.id) === parseInt(id));
      console.log(targetDiary, 'diary');

      if (targetDiary) {
        setEditData(targetDiary);
      } else {
        alert('없는 일기.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);
  return <div>{editData && <DiaryEditor isEdit={true} editData={editData} />}</div>;
};

export default Edit;
