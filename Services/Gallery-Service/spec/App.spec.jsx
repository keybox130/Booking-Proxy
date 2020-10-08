import React from 'react';
import {mount, shallow} from 'enzyme';
import App from '../client/components/App.jsx';

describe('<App />', () => {
  it('should render the App Component to the DOM', () => {
    const AppDiv = mount(<App />); // mount/render/shallow when applicable
    // check if the app displays itself
    expect(AppDiv).toExist();
  });
});