const MyButton = ({ buttonType, buttonText, buttonEvent }) => {
  const btnType = ['positive', 'negative'].includes(buttonType)
    ? buttonType
    : 'default';
  return (
    <button
      className={['MyButton', `MyButton_${btnType}`].join(' ')}
      type="button"
      onClick={buttonEvent}
    >
      {buttonText}
    </button>
  );
};

MyButton.defalutProps = {
  buttonType: 'default',
};

export default MyButton;
