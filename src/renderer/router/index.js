import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: require('@/components/Landing').default,
    },
    {
      path: '/create',
      name: 'create-channel',
      component: require('@/components/CreateChannel').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
