import Home from '../fe/containers/Home';
import PageComp from '../fe/containers/PageComp';

const allRoutes = [
  {
    url: '',
    exact: true,
    comp: Home
  },
  {
    url: '/page/:pageNum',
    exact: true,
    comp: PageComp
  }
];

export default allRoutes;
