import React from 'react';
import { mount, shallow } from 'enzyme';
import GalleryModal from '../client/components/GalleryModal.jsx';

describe('<SaveModal />', () => {
  it('should render the Header Component to the DOM', () => {
    const goodies = {
      "room_id": 2,
      "title": "The Cob house",
      "rating": 4.43,
      "rating_count": 14,
      "super_host": false,
      "location": "Watsontown, California, United States",
      "photos": [{ "_id": "5f781e3759185e32540c4166", "id": 1, "photo_url": "https://imagesfec.s3.amazonaws.com/airbnb/1/bbb0e0d0-1e9c-4cc7-aeed-50b87add.jpg", "description": "Bathroom with Shower" }, { "_id": "5f781e3759185e32540c4167", "id": 2, "photo_url": "https://imagesfec.s3.amazonaws.com/airbnb/3/d7d9531e-15da-4f25-b919-5a43401e.jpg", "description": "Propane fireplace and small kitchenette" }, { "_id": "5f781e3759185e32540c4168", "id": 3, "photo_url": "https://imagesfec.s3.amazonaws.com/airbnb/3/a2a6ab9f-9722-4227-944a-c6b1a5d3.jpg", "description": "The Cob House is in a very private setting all your own. Bring a camp stove and an ice chest and make your meals on the picnic table there." }, { "_id": "5f781e3759185e32540c4169", "id": 4, "photo_url": "https://imagesfec.s3.amazonaws.com/airbnb/4/cc51b7cf-3c44-44c0-b62e-85df5c78.jpg", "description": "Flat screen cable TV and Comcast High Speed Internet." }, { "_id": "5f781e3759185e32540c416a", "id": 5, "photo_url": "https://imagesfec.s3.amazonaws.com/airbnb/1/8a379cb5-0feb-403c-9b2d-3093e51a.jpg", "description": "" }]
    };
    const wrapper = mount(<GalleryModal stay={goodies} />); // mount/render/shallow when applicable
    // check if the app displays itself
    expect(wrapper).toExist();
  });
});