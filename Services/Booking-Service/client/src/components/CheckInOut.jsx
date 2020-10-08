import React from 'react';
import styled from 'styled-components';

// Contianers
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 0.5px solid rgb(176, 176, 176);
`;

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  padding: 14px 10px 14px 13px;
`;

const FlexColBorder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: left;
  padding: 14px 7px 14px 10px;
  border-right: 0.5px solid rgb(176, 176, 176);
`;

// Font style

const SmallBoldTitle = styled.h3`
  font-weight: 550;
  font-size: 10px;
`;

const SecondaryText = styled.input`
  border: transparent;
  color: #787878;
  background-color: transparent;
`;

class CheckInOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { room, checkIn, checkOut, handleCalendar } = this.props;
    const checkInRender = checkIn
      ? (<FlexColBorder><SmallBoldTitle>CHECK-IN</SmallBoldTitle><SecondaryText value={checkIn}/></FlexColBorder>)
      : <h1>Loading...</h1>;
    const checkOutRender = checkOut
      ? (<FlexCol><SmallBoldTitle>CHECKOUT</SmallBoldTitle><SecondaryText value={checkOut}/></FlexCol>)
      : <h1>Loading...</h1>;
    return ( 
      <Container onClick={() => handleCalendar()}>
        {checkInRender}
        {checkOutRender}
      </Container>
    );
  }
}

export default CheckInOut;