import React from 'react';
import styled from 'styled-components';
// Components
import CheckInOut from './CheckInOut.jsx';
import Guest from './Guest.jsx';

// Containers
const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid rgb(176, 176, 176);
  border-radius: 8px;
`;

class InitialStateCheckInOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { room, checkIn, checkOut, guestTotal, toggle, handleCalendar, guestModalActive } = this.props;
    const { max_guests } = room;
    const { active } = this.state;
    const checkInOutRender = checkIn !== undefined
      ? <CheckInOut checkIn={checkIn} checkOut={checkOut} room={room} handleCalendar={handleCalendar}/>
      : <h1>Loading...</h1>;
    const guestRender = max_guests
      ? <Guest toggle={toggle} guestCount={max_guests} guestTotal={guestTotal} active={guestModalActive} />
      : <h1>Loading...</h1>;
    return (
      <Container>
        {checkInOutRender}
        {guestRender}
      </Container>
    );
  }
}

export default InitialStateCheckInOut;