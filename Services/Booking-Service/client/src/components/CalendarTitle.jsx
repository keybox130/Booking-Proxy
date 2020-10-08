import React from 'react';
import styled from 'styled-components';

// Containers
const Container = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
  flex-direction: row;
`;

const TitleCol = styled.div`
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
`;

const CheckInOutContainer = styled.div`
  display: flex;
  align-items: left;
  flex-direction: row;
  justify-content: space-between;
  background-color: whitesmoke;
  border: 1px solid rgb(221, 221, 221);
  color: #A7A7A7;
  border-radius: 8px;
`;

const CheckInOutCol = styled.div`
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
`;

const CheckInOutColSelected = styled.div`
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  border: 2px solid black;
  border-radius: 8px;
  color: black;
`;

// Font Info
const NightTitle = styled.h3`
  font-weight: 500;
  font-size: 22px;
  margin-bottom: 15px;
`;

const SecondaryText = styled.p`
  color: #A7A7A7;
  font-size: 14px;
  font-weight: normal;
`;

const SmallBoldTitle = styled.h3`
  font-weight: 500;
  font-size: 12px;
`;

const FormText = styled.input`
  border: transparent;
  color: #787878;
  background-color: transparent;
`;

class CalendarTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkInSelected: false, checkOutSelected: false };
    // Bindings
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { checkInSelected } = this.state;
    if (checkInSelected) {
      this.setState({checkInSelected: false, checkOutSelected: true});
    } else if (!checkInSelected) {
      this.setState({checkInSelected: true, checkOutSelected: false})
    }
  }

  render() {
    const { minDays, checkIn, checkOut, calendarInputHandlers, selectedDays, calendarDateRange } = this.props;
    const { checkInSelected } = this.state;
    const nightsRender = minDays
      ? <TitleCol><NightTitle>{selectedDays !== null ? `${selectedDays} Nights` : 'Select dates'}</NightTitle><SecondaryText>{calendarDateRange !== null ? calendarDateRange : `Minimun stay: ${minDays} nights`}</SecondaryText></TitleCol>
      : <h1>Loading...</h1>;
    const checkInOutRender = checkInSelected
      ? (<CheckInOutContainer>
        <CheckInOutColSelected onClick={() => this.handleClick()}>
          <SmallBoldTitle>
            CHECK-IN
          </SmallBoldTitle>
          <FormText value={checkIn} onChange={(e) => calendarInputHandlers.handleCheckIn(e)}/>
        </CheckInOutColSelected>
        <CheckInOutCol onClick={() => this.handleClick()}>
          <SmallBoldTitle>
            CHECKOUT
          </SmallBoldTitle>
          <FormText value={checkOut} onChange={(e) => calendarInputHandlers.handleCheckOut(e)}/>
        </CheckInOutCol>
      </CheckInOutContainer>)
      : (<CheckInOutContainer>
        <CheckInOutCol onClick={() => this.handleClick()}>
          <SmallBoldTitle>
            CHECK-IN
          </SmallBoldTitle>
          <FormText value={checkIn} onChange={(e) => calendarInputHandlers.handleCheckIn(e)}/>
        </CheckInOutCol>
        <CheckInOutColSelected onClick={() => this.handleClick()}>
          <SmallBoldTitle>
            CHECKOUT
          </SmallBoldTitle>
          <FormText value={checkOut} onChange={(e) => calendarInputHandlers.handleCheckOut(e)}/>
        </CheckInOutColSelected>
      </CheckInOutContainer>)
    return (
      <Container>
        {nightsRender}
        {checkInOutRender}
      </Container>
    );
  }
}

export default CalendarTitle;