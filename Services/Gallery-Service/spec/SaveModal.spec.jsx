import React from 'react';
import {mount, shallow} from 'enzyme';
import SaveModal from '../client/components/SaveModal.jsx';

describe('<SaveModal />', () => {
  it('should render the Savemodal Component to the DOM', () => {
    const wrapper = mount(<SaveModal />); // mount/render/shallow when applicable
    // check if the app displays itself
    expect(wrapper).toExist();
  });
});