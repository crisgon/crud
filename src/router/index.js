import Vue from 'vue';
import Router from 'vue-router';
import Form from '@/components/Form';
import Registers from '@/components/ListOfRegisters';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Form',
      component: Form
    },
    {
      path: '/list-of-registers',
      name: 'Registers',
      component: Registers
    }
  ]
});
