import Vue from 'vue';
import Landing from '@/components/Landing';

describe('Landing.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Landing),
    }).$mount();

    expect(vm.$el.querySelector('.title').textContent).to.contain('Welcome to your new project!');
  });
});
