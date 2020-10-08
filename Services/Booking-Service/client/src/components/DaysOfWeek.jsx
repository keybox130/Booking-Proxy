import React from 'react';
import styled from 'styled-components';
import Day from './Day.jsx';

const Week = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;

class DaysOfWeek extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Week>
          <Day type="dow" value="Su" />
          <Day type="dow" value="Mo" />
          <Day type="dow" value="Tu" />
          <Day type="dow" value="We" />
          <Day type="dow" value="Th" />
          <Day type="dow" value="Fr" />
          <Day type="dow" value="Sa" />
        </Week>
      </>
    );
  }
}

export default DaysOfWeek;