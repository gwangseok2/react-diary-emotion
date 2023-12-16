import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';

const DiaryItem = ({ id, emotion, contents, date }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div onClick={goDetail} className={['emotion-wrapper', `emotion-wrapper${emotion}`].join(' ')}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} alt={emotion} />
      </div>
      <div onClick={goDetail} className="info-wrapper">
        <div className="diary-date">{strDate}</div>
        <div className="diary-contents">{contents}</div>
      </div>
      <div className="btn-wrapper">
        <MyButton buttonText={'수정하기'} buttonEvent={goEdit} />
      </div>
    </div>
  );
};

export default DiaryItem;
