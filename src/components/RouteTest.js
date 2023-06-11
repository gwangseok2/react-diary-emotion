import { Link } from 'react-router-dom';
const RouteTest = () => {
  return (
    <div>
      <Link to={'/'}>HOME</Link>
      <br />
      <Link to={'/new'}>New</Link>
      <br />
      <Link to={'/edit'}>Edit</Link>
      <br />
      <Link to={'/diary'}>Diary</Link>
      <br />
    </div>
  );
};

export default RouteTest;
