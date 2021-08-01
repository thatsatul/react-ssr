import Home from '../fe/containers/Home';
import PageComp from '../fe/containers/PageComp';
import { getTestData } from '../fe/actions/test';

const allRoutes = [
  {
    url: '/page/:pageNum',
    exact: true,
    comp: PageComp,
    loadData: (dispatch, match) => {
      const { pageNum } = match.params;
      return Promise.all([
        dispatch(getTestData(pageNum))
      ]);
    }
  },
  {
    url: '/',
    exact: false,
    comp: Home,
    loadData: () => {
      return Promise.all([]);
    }
  },
];

export default allRoutes;
