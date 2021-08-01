import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTestData } from '../../actions/test';
import {Helmet} from "react-helmet";

const PageComp = (props) => {
  const {
    test, dispatch, match,
    history
  } = props;

  const { pageNum } = match.params;

  useEffect(() => {
    if(!test.data || !test.data[pageNum]) {
      dispatch(getTestData(pageNum));
    }
  }, [pageNum]);

  const prevPage = () => {
    let finalPageNum = parseInt(pageNum) - 1;
    finalPageNum = finalPageNum < 0 ? 0 : finalPageNum;
    history.push('/page/' + finalPageNum);
  }

  const nextPage = () => {
    const finalPageNum = parseInt(pageNum) + 1;
    history.push('/page/' + finalPageNum);
  }

  if (test.isFetching){
    return <div>Loading...</div>;
  }

  if (test.data && test.data[pageNum]) {
    return (
      <section>
        <Helmet>
          <title>News Records</title>
          <meta name="description" content="News records"></meta>
        </Helmet>
        {test.data[pageNum].hits.map((hit, index) => <div key={hit.title + index}>{hit.title}</div>)}
        <div>
          <button onClick={() => prevPage()}>Prev Page</button>
          <button onClick={() => nextPage()}>Next Page</button>
        </div>
      </section>
    );
  }
  return (
    <section>
      <Helmet>
        <title>News Records</title>
        <meta name="description" content="News records"></meta>
      </Helmet>
      <div>Test</div>
    </section>
  );
}

const mapStateToProps = state => ({
  test: state.test
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(PageComp);
