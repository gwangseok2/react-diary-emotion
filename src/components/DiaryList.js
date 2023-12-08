import { useState } from 'react';

const sortOptionList = [
  { value: 'lastest', name: '최신순' },
  { value: 'oldest', name: '오래된순' },
];

const filterOptionList = [
  { value: 'all', name: '전부다' },
  { value: 'good', name: '좋은 감정만' },
  { value: 'bad', name: '안좋은 감정만' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option value={it.value}>{it.name}</option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  // 초기값  세팅
  const [sortType, setSortType] = useState('lastest');
  const [filter, setFilter] = useState('all');

  // 배열sort는 원본 배열을 바꿔버림 따라서 깊은 복사를 통해 연결을 끊는다.
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) >= 3;
      } else {
        return parseInt(item.emotion) < 3;
      }
    };

    const compare = (a, b) => {
      if (sortType === 'lastest') {
        return parseInt(a.date) - parseInt(b.date);
      } else {
        return parseInt(b.date) - parseInt(a.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList = filter === 'all' ? copyList : copyList.filter((el) => filterCallBack(el));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
      <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
      {getProcessedDiaryList().map((el) => (
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
          감정: {el.emotion} <br />
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
