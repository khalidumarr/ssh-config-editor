import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/List').default,
    },
    {
      path: '/detail/:id',
      name: 'detail-page',
      component: require('@/components/List/Detail').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
