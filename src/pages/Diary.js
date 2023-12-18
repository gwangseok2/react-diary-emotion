import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';
import MyHeader from '../components/MyHeader';
import MyButton from '../components/MyButton';

const Diary = () => {
  // path variable을 모아서 객체로 만들어줌
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setDate] = useState();
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((el) => parseInt(el.id) === parseInt(id));
      if (targetDiary) {
        setDate(targetDiary);
      } else {
        alert('없는 일기.');
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  // 로딩에따른 html 랜더
  if (!data) {
    return <div className="DiaryPage">로딩중입니다</div>;
  } else {
    const currentEmotionData = emotionList.find((el) => el.emotionId === data.emotion);
    console.log(currentEmotionData, 'cur');
    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton
              buttonText={'< 뒤로가기'}
              buttonEvent={() => {
                navigate(-1);
              }}
            />
          }
          rightChild={
            <MyButton
              buttonText={'수정하기'}
              buttonEvent={() => {
                navigate(`/edit/${data.id}`);
              }}
            />
          }
        />
        <article>
          <section>
            <h4>오늘의 감정</h4>
            <div className={['diary-img-wrapper', `diary-img-wrapper${currentEmotionData.emotionId}`].join(' ')}>
              <img src={currentEmotionData.emotionImg} alt={currentEmotionData.emotionId} />
              <div className="diary-description">{currentEmotionData.emotionDescription}</div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary-content-wrapper">
              <p>{data.contents}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
