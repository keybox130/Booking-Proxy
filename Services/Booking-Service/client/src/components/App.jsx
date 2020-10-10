// Imports
/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
// Components
import InitialState from './InitialState.jsx';
import Calendar from './Calendar.jsx';
import GuestModal from './GuestModal.jsx';

const GlobalStyle = createGlobalStyle`
html, body {
  font-family: 'Montserrat', sans-serif;
  padding: 0;
  margin: 0;
}

div, a, h1, h2, h3, h4, h5, h6, p, input, button, option, select, form {
  font-family: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
}
img {
  cursor: pointer;
}
`;

const Container = styled.div`
  position: absolute;
  position: absolute !important;
  top: 24px !important;
  right: 32px !important;
`;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      checkIn: 'Add date',
      checkOut: 'Add date',
      guestTotal: 1,
      adultCount: 1,
      childrenCount: 0,
      infantCount: 0,
      guestModalActive: false,
      dateRange: false,
      renderData: [],
      checkInUTC: '',
      checkOutUTC: '',
      selectedDays: null,
      calendarDateRange: null,
      totalNightlyPrice: null,
      calendar: false,
      monthOne: '',
      monthTwo: '',
      monthThree: '',
      usedDates: false,
    };

    // Bindings
    this.getRoom = this.getRoom.bind(this);
    this.changeTotalGuest = this.changeTotalGuest.bind(this);
    this.addAdult = this.addAdult.bind(this);
    this.removeAdult = this.removeAdult.bind(this);
    this.addChildren = this.addChildren.bind(this);
    this.removeChildren = this.removeChildren.bind(this);
    this.addInfants = this.addInfants.bind(this);
    this.removeInfants = this.removeInfants.bind(this);
    this.handleGuestModal = this.handleGuestModal.bind(this);
    this.handleCheckIn = this.handleCheckIn.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.createMonths = this.createMonths.bind(this);
    this.formatMonthTwoWeeks = this.formatMonthTwoWeeks.bind(this);
    this.handleUTCDates = this.handleUTCDates.bind(this);
    this.formatUTCDateRange = this.formatUTCDateRange.bind(this);
    this.getTotalNightlyPrice = this.getTotalNightlyPrice.bind(this);
    this.getAccomodationFees = this.getAccomodationFees.bind(this);
    this.getTotalPrice = this.getTotalPrice.bind(this);
    this.handleCalendar = this.handleCalendar.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.updateUsedDates = this.updateUsedDates.bind(this);
    this.updateChainedDates = this.updateChainedDates.bind(this);
    this.updateCheckIn = this.updateCheckIn.bind(this);
    this.updateCheckOut = this.updateCheckOut.bind(this);
    this.handleDateSliderMonths = this.handleDateSliderMonths.bind(this);
  }

  getRoom() {
    const self = this;
    axios.get('/calendar/stays/3')
      .then((res) => {
        self.setState({ roomData: res.data }, () => self.handleDateSliderMonths());
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  handleCalendar() {
    const { calendarActive } = this.state;
    if (calendarActive) {
      this.setState({calendarActive: false});
    } else {
      this.setState({calendarActive: true});
    }
  }

  handleDateSliderMonths(add, subtract) {
    const { monthOne, monthTwo, monthThree, roomData } = this.state; //Max 11 (0 indexed)
    let room = roomData[0];
    const { starting_date } = room;
    let strArr = starting_date.split('-').slice(1,2).join('');
    const num = parseInt(strArr);
    if (monthOne === '') { //Init
      const one = num;
      const two = one + 1 < 13 ? one + 1 : one + 1 === 13 ? 1 : null;
      const three = one + 2 < 13 ? one + 2 : one + 2 === 13 ? 1 : one + 2 === 14 ? 2 : null;
      this.setState({monthOne: one, monthTwo: two, monthThree: three}, () => console.log(this.state));
    } else if (add === true) { 
      const one = monthOne + 1 < 13 ? monthOne + 1 : monthOne + 1 === 13 ? 1 : null;
      const two = monthOne + 2 < 13 ? monthOne + 2 : monthOne + 2 === 13 ? 1 : monthOne + 2 === 14 ? 2 : null;
      const three = monthOne + 3 < 13 ? monthOne + 3 : monthOne + 3 === 13 ? 1 : monthOne + 3 === 14 ? 2 : monthOne + 3 === 15 ? 3 : null;
      this.setState({monthOne: one, monthTwo: two, monthThree: three}, () => console.log(this.state));
    } else if (subtract === true) { // 11, 12, 1 --> one(10), two(11), three(12)
      const one = monthOne - 1 >= 1 ? monthOne - 1 : monthOne === 1 ? 12 : null;
      const two = monthTwo - 1 >= 1 ? monthTwo - 1 : monthTwo === 1 ? 12 : null;
      const three = monthThree - 1 >= 1 ? monthThree - 1 : monthThree === 1 ? 12 : null;
      this.setState({monthOne: one, monthTwo: two, monthThree: three}, () => console.log(this.state)); 
    }
  }

  getTotalNightlyPrice() {
    const { roomData, selectedDays } = this.state;
    const room = roomData[0];
    const { base_nightly_price } = room;
    const result = parseInt(base_nightly_price) * selectedDays;
    this.setState({totalNightlyPrice: result}, () => this.getAccomodationFees());
  }

  getAccomodationFees() {
    const { roomData, selectedDays, totalNightlyPrice, guestTotal } = this.state;
    const room = roomData[0];
    const { taxes_fees, service_fee, additional_person_tax } = room;
    //Base Taxes
    let taxes = `0.0${taxes_fees}`;
    taxes = parseFloat(taxes);
    taxes = taxes * totalNightlyPrice;
    taxes = taxes.toString().split('').slice(0,5).join('');
    taxes = parseFloat(taxes);
    //Service Fee
    let serviceFee = service_fee.split('.').slice(0,1).join();
    serviceFee = parseFloat(`0.0${serviceFee}`);
    serviceFee = serviceFee * totalNightlyPrice;
    serviceFee = serviceFee
    serviceFee = serviceFee.toString().split('').slice(0,5).join('');
    serviceFee = parseFloat(serviceFee);
    //Additional Person Tax
    let additionalPerson = parseFloat(`0.0${additional_person_tax}`);
    additionalPerson = (additionalPerson * totalNightlyPrice * guestTotal);
    additionalPerson = additionalPerson.toString().split('').slice(0,5).join('');
    additionalPerson = parseFloat(additionalPerson);
    this.setState({taxes: taxes, serviceFee: serviceFee, additionalPerson: additionalPerson }, () => this.getTotalPrice());
  }

  getTotalPrice() {
    const { taxes, serviceFee, additionalPerson, totalNightlyPrice } = this.state;
    let totalPrice = taxes + serviceFee + additionalPerson + totalNightlyPrice;
    if (!Number.isInteger(totalPrice)) {
      totalPrice = totalPrice.toFixed(2);
    }
    this.setState({totalCost: totalPrice});
  }

  createMonths() {
    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const EMPTY = [{start: 4, end: 0}, {start: 1, end: 6}, {start: 1, end: 3}, {start: 4, end: 1}, {start: 4, end: 0}, {start: 2, end: 3}, {start: 4, end: 0}, {start: 0, end: 4}, {start: 3, end: 2},  {start: 4, end: 0},  {start: 1, end: 4},  {start: 3, end: 1}];
    let year = [];
    for (let i = 0; i < MONTHS.length; i++) {
      let monthKey = MONTHS[i];
      let dayCount = DAYS[i];
      let start = EMPTY[i].start;
      let end = EMPTY[i].end;
      let dayValue = 1;
      let month = [];
      for (let j = 0; j < 35; j++) {
        let day = {};
        if (start > 0) {
          day.type = 'empty';
          day.value = '';
          start--;
          month.push(day);
        } else if (dayCount > 0) {
          day.type = 'normal';
          day.value = new Date(2020, monthKey, dayValue);
          dayCount--;
          dayValue++;
          month.push(day);
        } else if (end > 0) {
          day.type = 'empty';
          day.value = '';
          month.push(day);
        }
      }
      year.push(month);
    }
    this.formatMonthTwoWeeks(year);
  }

  updateUsedDates() {
    const { checkInUTC, checkOutUTC } = this.state;
    const datesArr = getDates(checkInUTC, checkOutUTC);
    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const EMPTY = [{start: 4, end: 0}, {start: 1, end: 6}, {start: 1, end: 3}, {start: 4, end: 1}, {start: 4, end: 0}, {start: 2, end: 3}, {start: 4, end: 0}, {start: 0, end: 4}, {start: 3, end: 2},  {start: 4, end: 0},  {start: 1, end: 4},  {start: 3, end: 1}];
    let year = [];
    for (let i = 0; i < MONTHS.length; i++) {
      let monthKey = MONTHS[i];
      let dayCount = DAYS[i];
      let start = EMPTY[i].start;
      let end = EMPTY[i].end;
      let dayValue = 1;
      let month = [];
      for (let j = 0; j < 35; j++) {
        let day = {};
        if (start > 0) {
          day.type = 'empty';
          day.value = '';
          start--;
          month.push(day);
        } else if (dayCount > 0) {
          let utcKey = new Date(2020, monthKey, dayValue);
          let filtered = datesArr.filter(item => item.getTime() === utcKey.getTime()); //Item is always the same. (start Date)
          if (filtered.length > 0) {
            day.type = 'used';
            day.value = utcKey;
            dayCount--;
            dayValue++
            month.push(day);
          } else {
            day.type = 'normal';
            day.value = new Date(2020, monthKey, dayValue);
            dayCount--;
            dayValue++;
            month.push(day);
          }
        } else if (end > 0) {
          day.type = 'empty';
          day.value = '';
          month.push(day);
        }
      }
      year.push(month);
    }
    this.formatMonthTwoWeeks(year);
    this.setState({dateRange: false, usedDates: true, guestTotal: 1, adultCount: 1, childrenCount: 0, infantCount: 0}, () => this.clearDates());
  }

  updateChainedDates() {
    const { checkInUTC, checkOutUTC } = this.state;
    const datesArr = getDates(checkInUTC, checkOutUTC);
    const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const EMPTY = [{start: 4, end: 0}, {start: 1, end: 6}, {start: 1, end: 3}, {start: 4, end: 1}, {start: 4, end: 0}, {start: 2, end: 3}, {start: 4, end: 0}, {start: 0, end: 4}, {start: 3, end: 2},  {start: 4, end: 0},  {start: 1, end: 4},  {start: 3, end: 1}];
    let year = [];
    for (let i = 0; i < MONTHS.length; i++) {
      let monthKey = MONTHS[i];
      let dayCount = DAYS[i];
      let start = EMPTY[i].start;
      let end = EMPTY[i].end;
      let dayValue = 1;
      let month = [];
      for (let j = 0; j < 35; j++) {
        let day = {};
        if (start > 0) {
          day.type = 'empty';
          day.value = '';
          start--;
          month.push(day);
        } else if (dayCount > 0) {
          let utcKey = new Date(2020, monthKey, dayValue);
          let filtered = datesArr.filter(item => item.getTime() === utcKey.getTime()); //Item is always the same. (start Date)
          if (filtered.length > 0) {
            if (utcKey.getTime() === checkInUTC.getTime()) {
              day.type = 'selected';
              day.value = utcKey;
              dayCount--;
              dayValue++;
              month.push(day);
            } else if (utcKey.getTime() === checkOutUTC.getTime()) {
              day.type = 'selected';
              day.value = utcKey;
              dayCount--;
              dayValue++;
              month.push(day);
            } else {
              day.type = 'chain';
            day.value = utcKey;
            dayCount--;
            dayValue++
            month.push(day);
            }
          } else {
            day.type = 'normal';
            day.value = new Date(2020, monthKey, dayValue);
            dayCount--;
            dayValue++;
            month.push(day);
          }
        } else if (end > 0) {
          day.type = 'empty';
          day.value = '';
          month.push(day);
        }
      }
      year.push(month);
    }
    this.formatMonthTwoWeeks(year);
  }

  formatMonthTwoWeeks(monthArr) {
    let storage = [];
    for (let i = 0; i < monthArr.length; i++) {
      let days = monthArr[i];
      let month = [];
      for (let j = 0; j < days.length; j += 7) {
        month.push(days.slice(j, j+7));
      }
      storage.push(month);
    }
    this.setState({renderData: storage});
  }

  handleCheckIn(e) {
    e.preventDefault();
    let value = e.target.value;
    let data = e.target.value.length > 1
      ? e.target.value
      : 'MM/DD/YYYY';
    this.setState({checkIn: data});
  }

  handleCheckOut(e) {
    e.preventDefault();
    let value = e.target.value;
    let data = e.target.value.length > 1
      ? e.target.value
      : 'MM/DD/YYYY';
    this.setState({checkOut: data});
  }

  changeTotalGuest() {
    const { adultCount, childrenCount } = this.state;
    const total = adultCount + childrenCount;
    this.setState({ guestTotal: total });
  }

  updateCheckIn() {
    const { checkInUTC } = this.state;
    // Wed, 14 Jun 2017 07:00:00 GM
    let stringArr = checkInUTC.toUTCString().split(' ');
    const string = `${stringArr[2]} ${stringArr[1]}, ${stringArr[3]}`;
    this.setState({checkIn: string});
  }

  updateCheckOut() {
    const { checkOutUTC } = this.state;
    // Wed, 14 Jun 2017 07:00:00 GM
    let stringArr = checkOutUTC.toUTCString().split(' ');
    const string = `${stringArr[2]} ${stringArr[1]}, ${stringArr[3]}`;
    this.setState({checkOut: string});
  }

  addAdult() {
    const self = this;
    const { adultCount, roomData, guestTotal } = this.state;
    const room = roomData[0];
    const { max_guests } = room;
    const max = parseInt(max_guests);
    const add = adultCount + 1;
    if (add <= max) {
      this.setState({ adultCount: add }, () => { self.changeTotalGuest(); self.getAccomodationFees() });
    }
  }

  removeAdult() {
    const self = this;
    const { adultCount, roomData, guestTotal } = this.state;
    const room = roomData[0];
    const { max_guests } = room;
    const max = parseInt(max_guests);
    const minus = adultCount - 1;
    if (minus > 0) {
      this.setState({adultCount: minus}, () => { self.changeTotalGuest(); self.getAccomodationFees() });
    }
  }

  addChildren() {
    const self = this;
    const { childrenCount, roomData, guestTotal } = this.state;
    const room = roomData[0];
    const { max_guests } = room;
    const max = parseInt(max_guests);
    const add = childrenCount + 1;
    if (add <= max) {
      this.setState({ childrenCount: add }, () => { self.changeTotalGuest(); self.getAccomodationFees() });
    }
  }

  removeChildren() {
    const self = this;
    const { childrenCount, roomData, guestTotal } = this.state;
    const room = roomData[0];
    const { max_guests } = room;
    const max = parseInt(max_guests);
    const minus = childrenCount - 1;
    if (minus >= 0) {
      this.setState({childrenCount: minus}, () => { self.changeTotalGuest(); self.getAccomodationFees() });
    }
  }

  addInfants() {
    const self = this;
    const { infantCount, roomData, guestTotal } = this.state;
    const room = roomData[0];
    const { max_guests } = room;
    const max = parseInt(max_guests);
    const add = infantCount + 1;
    if (add <= max) {
      this.setState({ infantCount: add }, () => { self.changeTotalGuest(); self.getAccomodationFees() });
    }
  }

  removeInfants() {
    const self = this;
    const { infantCount, roomData, guestTotal } = this.state;
    const room = roomData[0];
    const { max_guests } = room;
    const max = parseInt(max_guests);
    const minus = infantCount - 1;
    if (minus >= 0) {
      this.setState({infantCount: minus}, () => { self.changeTotalGuest(); self.getAccomodationFees() });
    }
  }

  handleGuestModal() {
    const { guestModalActive } = this.state;
    if (guestModalActive) {
      this.setState({guestModalActive: false});
    } else {
      this.setState({guestModalActive: true});
    }
  }

  getDateRange() {
    const self = this;
    const { checkInUTC, checkOutUTC } = this.state;
    let result = Math.floor((Date.UTC(checkOutUTC.getUTCFullYear(), checkOutUTC.getUTCMonth(), checkOutUTC.getUTCDate()) - Date.UTC(checkInUTC.getUTCFullYear(), checkInUTC.getUTCMonth(), checkInUTC.getUTCDate()) ) /(1000 * 60 * 60 * 24));
    this.setState({selectedDays: result}, () => self.getTotalNightlyPrice());
  }

  handleUTCDates(date) {
    const self = this;
    const { checkInUTC, checkOutUTC } = this.state;
    if (checkInUTC.toString().length < 1) {
      this.setState({checkInUTC: date, dateRange: false}, () => this.updateCheckIn());
    } else if (checkInUTC.toString().length > 1 && checkOutUTC.toString().length < 1) {
      this.setState({checkOutUTC: date, dateRange: true}, () => {self.getDateRange(); self.formatUTCDateRange(); self.updateChainedDates(); self.updateCheckOut()});
    } else if (checkInUTC.toString().length > 1 && checkOutUTC.toString().length > 1) {
      this.setState({checkInUTC: date, checkOutUTC: '', dateRange: false}, () => this.updateCheckIn());
    }
  }

  formatUTCDateRange() {
    const { checkInUTC, checkOutUTC } = this.state;
    let checkInArr = checkInUTC.toUTCString().split(' ');
    let checkOutArr = checkOutUTC.toUTCString().split(' ');
    let result = `${checkInArr[2]} ${checkInArr[1]}, ${checkInArr[3]} - ${checkOutArr[2]} ${checkOutArr[1]}, ${checkOutArr[3]}`;
    this.setState({calendarDateRange: result})
  }

  clearDates() {
    const self = this;
    const { usedDates } = this.state;
    this.setState({checkInUTC: '', checkOutUTC: '', dateRange: false, checkIn: 'Add date', checkOut: 'Add date', calendarDateRange: null, selectedDays: null}, () => {
      if (!usedDates) {
        this.createMonths()
      }
    });
  }

  componentDidMount() {
    this.getRoom();
    this.createMonths();
  }

  render() {
    const guestModalHandlers = { addAdult: this.addAdult, removeAdult: this.removeAdult, addChildren: this.addChildren, removeChildren: this.removeChildren, addInfants: this.addInfants, removeInfants: this.removeInfants };
    const { roomData, checkIn, checkOut, guestTotal, guestModalActive, adultCount, childrenCount, infantCount, dateRange, renderData, selectedDays, calendarDateRange, totalNightlyPrice, taxes, serviceFee, additionalPerson, totalCost, checkInUTC, checkOutUTC, calendarActive, monthOne, monthTwo, monthThree } = this.state;
    const calendarInputHandlers = { handleCheckIn: this.handleCheckIn, handleCheckOut: this.handleCheckOut };
    const prices = {nightly: totalNightlyPrice, additionalPerson: additionalPerson, serviceFee: serviceFee, taxes: taxes, total: totalCost}
    const monthSlides = {one: monthOne, two: monthTwo, three: monthThree, handler: this.handleDateSliderMonths }
    const UTC = {checkIn: checkInUTC, checkOut: checkOutUTC}
    let room;
    let maxGuests;
    if(roomData) {
      room = roomData[0];
      const { max_guests } = room;
      maxGuests = max_guests;
    }
    const base = roomData 
      ? <InitialState room={roomData} checkIn={checkIn} checkOut={checkOut} guestTotal={guestTotal} guestModalActive={guestModalActive} adultCount={adultCount} childrenCount={childrenCount} infantCount={infantCount} guestModalHandlers={guestModalHandlers} guestModalToggle={this.handleGuestModal} dateRange={dateRange} prices={prices} handleCalendar={this.handleCalendar} handleButton={this.updateUsedDates} utc={UTC}/>
      : <h1>Loading...</h1>;
    const calendarRender = (roomData && calendarActive)
      ? <Calendar room={roomData[0]} checkIn={checkIn} checkOut={checkOut} dateRange={dateRange} calendarInputHandlers={calendarInputHandlers} renderData={renderData} dateHandlers={this.handleUTCDates} selectedDays={selectedDays} calendarDateRange={calendarDateRange} utc={UTC} handleCalendar={this.handleCalendar} clearDates={this.clearDates} monthSlides={monthSlides} />
      : <></>;
      const guestModalRender = guestModalActive
      ? <GuestModal active={guestModalActive} guestTotal={guestTotal} childrenCount={childrenCount} adultCount={adultCount} infantCount={infantCount} maxGuests={maxGuests} handlers={guestModalHandlers} closeMe={this.handleGuestModal} />
      : <div></div>;
    return (
      <Container>
        {base}
        {calendarRender}
        {guestModalRender}
      </Container>
    );
  }
}

export default App;
