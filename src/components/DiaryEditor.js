import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';

import MyButton from './MyButton';
import MyHeader from './MyHeader';
import EmotionItem from './EmotionItem';
import { getStringDate } from '../util/date';
import { DiaryDispatchContext } from './../App';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ editData, isEdit }) => {
  const contentRef = useRef('');
  const [content, setContent] = useState('');
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  // Context에 공급되어 있는 애 받아옴
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?')) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        console.log(date, '==날짜 수정');
        onEdit(editData.id, date, content, emotion);
      }
    }

    navigate('/', { replace: true });
  };

  const handleClickRemove = (data) => {
    if (window.confirm(`${editData.id}번째 일기를 삭제하시겠습니까?`)) {
      onRemove(editData.id);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(editData.date))));
      setEmotion(editData.emotion);
      setContent(editData.contents);
    }
  }, [isEdit, editData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? '수정하기' : '새 일기쓰기'}
        leftChild={<MyButton buttonText={'< 뒤로가기'} buttonEvent={() => navigate(-1)} />}
        rightChild={
          isEdit ? <MyButton buttonType={'negative'} buttonText={'삭제하기'} buttonEvent={handleClickRemove} /> : ''
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input-box">
            <input className="input-date" value={date} onChange={(e) => setDate(e.target.value)} type="date" />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input-box emotion-list-wrapper">
            {emotionList.map((el) => (
              <EmotionItem
                key={el.emotionId}
                {...el}
                onClick={handleClickEmote}
                isSelected={el.emotionId === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input-box text-wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘은 어땠나요?"
            />
          </div>
        </section>

        <section>
          <div className="control-box">
            <MyButton
              buttonText={'취소하기'}
              onClick={() => {
                navigate(-1);
              }}
            />
            <MyButton buttonText={'작성완료'} buttonType={'positive'} buttonEvent={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
