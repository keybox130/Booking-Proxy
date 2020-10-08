import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px; 
`;

const PriceRow = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
  margin-top: 3px;
  margin-bottom: 3px;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-between;
  border-top: 0.5px solid #DDDDDD;
  padding-top: 25px;
  margin-top: 15px;
`;

const PriceDesc = styled.h3`
  color: #222323;
  text-decoration: underline;
  font-weight: 400;
  font-size: 16px;
`;

const Price = styled.h3`
  font-size: inherit;
  font-weight: 400;
`;

const Warning = styled.p`
  font-weight: 400;
  aling-text: center;
  font-size: 14px;
`;

const CenterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 25px;
`;

const TotalText = styled.h3`
  font-weight: 550;
  font-size: 16px;
`;

class PriceDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {
    const { prices } = this.props;
    return (
      <Container>
      <CenterRow><Warning>{`You won't be charged yet`}</Warning></CenterRow>
        <PriceRow><PriceDesc>Total Nightly Price</PriceDesc><Price>${prices.nightly}</Price></PriceRow>
        <PriceRow><PriceDesc>Service Fee</PriceDesc><Price>${prices.serviceFee}</Price></PriceRow>
        <PriceRow><PriceDesc>Guest Fee</PriceDesc><Price>${prices.additionalPerson}</Price></PriceRow>
        <PriceRow><PriceDesc>Taxes</PriceDesc><Price>${prices.taxes}</Price></PriceRow>
        <TotalRow><TotalText>Total</TotalText><TotalText>${prices.total}</TotalText></TotalRow>
      </Container>
    );
  }
}

export default PriceDisplay;