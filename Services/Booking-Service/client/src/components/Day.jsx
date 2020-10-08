import React from 'react';
import styled from 'styled-components';

// Types

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  width: 15px;
  height: 15px;
`;

const UsedContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  text-decoration: line-through;
  color: #CCCCCC;
  font-size: 14px;
  width: 15px;
  height: 15px;
  font-weight: bold;
`;

const NormalContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  border-radius: 100px;
  :hover {
    border: 0.5px solid #373737;
    cursor: pointer;
  }
  color: #373737;
  width: 15px;
  height: 15px;
  font-weight: bold;
`;

const ChainContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  border-radius: 8px;
  background-color: whitesmoke;
  :hover {
    border: 0.5px solid #373737;
    border-radius: 100px;
    background-color: white;
    cursor: pointer;
  }
  color: #373737;
  width: 15px;
  height: 15px;
  font-weight: bold;
`;

const SelectedContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  font-size: 14px;
  color: white;
  background-color: #222222;
  border-radius: 100px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  font-weight: bold;
`;

const DayOfWeekContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  width: 15px;
  height: 15px;
  font-size: 12px;
  margin-top: 15px;
`;

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }


  render() {
    const { type, value, dateHandlers, utc } = this.props;
    let selected;
    if (utc !== undefined) {
      if ((utc.checkIn === value && value !== '') || (utc.checkOut === value && value !== '')) {
        selected = true;
      } else {
        selected = false;
      }
    } 
    const parsedDate = type !== 'dow' && value !== ''
      ? value.getUTCDate()
      : '';
    const rendered = selected
    ? <SelectedContainer onClick={() => dateHandlers(value)}><p>{parsedDate}</p></SelectedContainer>
    : type === 'empty'
    ? <EmptyContainer><p></p></EmptyContainer>
    : type === 'normal'
    ? <NormalContainer onClick={() => dateHandlers(value)}><p>{parsedDate}</p></NormalContainer>
    : type === 'dow'
    ? <DayOfWeekContainer><p>{value}</p></DayOfWeekContainer>
    : type === 'used'
    ? <UsedContainer><p>{parsedDate}</p></UsedContainer>
    : type === 'selected'
    ? <SelectedContainer><p>{parsedDate}</p></SelectedContainer>
    : type === 'chain'
    ? <ChainContainer><p>{parsedDate}</p></ChainContainer>
    : <h1>Err</h1>
    return (
      <>{rendered}</>
    );
  }
}

export default Day;