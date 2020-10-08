import React from 'react';
import { mount } from 'enzyme';
import App from '../src/components/App';

describe('<App />', () => {
  it('should render something to the DOM', () => {
    const wrapper = mount(<App />); // mount/render/shallow when applicable
    // check if the app displays itself
    expect(wrapper).toExist();
  });
});
