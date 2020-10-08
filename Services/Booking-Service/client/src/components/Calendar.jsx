import React from 'react';
import styled from 'styled-components';
// Components
import CalendarTitle from './CalendarTitle.jsx';
import MonthSlider from './MonthSilder.jsx';
import AllMonths from './AllMonths.jsx';
import CalendarClose from './CalendarClose.jsx';

// Container
const Container = styled.div`
  background: rgb(255, 255, 255) !important;
  border-radius: 16px !important;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px !important;
  display: inline-block !important;
  padding: 24px 32px 16px !important;
  position: absolute !important;
  top: 60px !important;
  right: 0px !important;
  width: 661px !important;
  z-index: 99 !important;
  min-height: 460px !important;
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { room, checkIn, checkOut, calendarInputHandlers, renderData, dateHandlers, selectedDays, calendarDateRange, utc, handleCalendar, clearDates, monthSlides } = this.props;
    const { min_days } = room;
    const calTitle = min_days
      ? <CalendarTitle minDays={min_days} checkIn={checkIn} checkOut={checkOut} calendarInputHandlers={calendarInputHandlers} selectedDays={selectedDays} calendarDateRange={calendarDateRange}/>
      : <h1>Loading...</h1>;
    const sliderRender = room
      ? <MonthSlider monthSlides={monthSlides}/>
      : <h1>Loading...</h1>;
    const allMonthsRender = renderData
      ? <AllMonths months={renderData} dateHandlers={dateHandlers} utc={utc} monthSlides={monthSlides} />
      : <h1>Loading...</h1>;
    const closeRender = handleCalendar
      ? <CalendarClose handleCalendar={handleCalendar} clearDates={clearDates} />
      : <></>
    return (
      <Container>
        {calTitle}
        {sliderRender}
        {allMonthsRender}
        {closeRender}
      </Container>
    );
  }
}

export default Calendar;