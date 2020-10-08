import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
`;

const CloseBtn = styled.div`
  color: white;
  font-weight: 500;
  background-color: #222222;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const ClearDate = styled.div`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 500;
  margin-top: 15px;
  margin-right: 10px;
`;

const FlexRow = styled.div`
  display: flex;
  align-item: center;
  flex-direction: row;
  justify-content: center;
`;

class CalendarClose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleCalendar, clearDates } = this.props;
    return (
      <Container>
      <FlexRow>
        <ClearDate onClick={() => clearDates()}>Clear Dates</ClearDate>
        <CloseBtn onClick={() => handleCalendar()}>Close</CloseBtn>
        </FlexRow>
      </Container>
    );
  }
}

export default CalendarClose;