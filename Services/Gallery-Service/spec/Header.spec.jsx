import React from 'react';
import {mount, shallow} from 'enzyme';
import Header from '../client/components/Header.jsx';

it('should render the Header Component to the DOM', () => {
  const stay = {
    "title": "Pizza Land",
    "rating": 5,
    "rating_count": 10,
    "super_host": true,
    "location": "Healdsburg, CA"
  }
  const HeaderDiv = mount(<Header stay={stay} />); // mount/render/shallow when applicable
  // check if the app displays itself
  expect(HeaderDiv).toExist();
});
