const DiaryList = ({ diaryList }) => {
  return (
    <div>
      {diaryList.map((el) => {
        return (
          <div
            key={el.id}
            style={{
              marginBottom: '10px',
              paddingBottom: '5px',
              borderBottom: '1px solid #ccc',
            }}
          >
            일기ID : {el.id} <br />
            내용: {el.contents} <br />
            시간: {new Date(el.date).toLocaleString()} <br />
          </div>
        );
      })}
    </div>
  );
};

export default DiaryList;
