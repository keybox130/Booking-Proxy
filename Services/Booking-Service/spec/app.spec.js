import React from 'react';
import { mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
describe('<App />', () => {
  it('should render the app to the DOM', () => {
    const wrapper = mount(<App />); // mount/render/shallow when applicable
    expect(wrapper).toExist();
  });
});