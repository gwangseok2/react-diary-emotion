import React from 'react';

const EmotionItem = ({ emotionId, emotionImg, emotionDescription, onClick, isSelected }) => {
  return (
    <div
      onClick={() => onClick(emotionId)}
      className={['EmotionItem', isSelected ? `selected${emotionId}` : ''].join(' ')}
    >
      <img src={emotionImg} alt={emotionId} />
      <span>{emotionDescription}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
