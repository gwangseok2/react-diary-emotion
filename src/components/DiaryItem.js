const DiaryItem = ({ id, emotion, contents, date }) => {
  return (
    <div className="DiaryItem">
      <div
        className={['emotion-wrapper', `emotion-wrapper${emotion}`].join(' ')}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt={emotion}
        />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default DiaryItem;
