import Home from '../views/home';
import Login from '../views/login';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
];

export default routes;
