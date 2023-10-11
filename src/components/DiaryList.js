import { useState } from 'react';

const sortOptionList = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된순' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option>{it.name}</option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('lastest');
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
            <ControlMenu
              value={sortType}
              onChange={setSortType}
              optionList={sortOptionList}
            />
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
