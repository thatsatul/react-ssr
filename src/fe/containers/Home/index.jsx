import React from 'react';

const Home = (props) => {
  const { history } = props;
  return <div onClick={() => history.push('/page/1')}>Home</div>;
}

export default Home;
