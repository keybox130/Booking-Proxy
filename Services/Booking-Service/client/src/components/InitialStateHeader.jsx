import React from 'react';
import styled from 'styled-components';

// Containers
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

// Font styling
const PriceTitle = styled.h3`
  font-weight: 500;
  font-size: 20px;
  margin-right: 5px;
`;

const NightText = styled.p`
  font-weight: 400;
  font-size: 16px;
`;

const RatingBold = styled.p`
  font-weight: 450;
  font-size: 14px;
  margin-right: 5px;
`;

const RatingCount = styled.p`
  font-weight: 450;
  font-size: 12px;
  color: #979797;
`;


class InitialStateHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { room } = this.props;
    const { base_nightly_price, ratings_count, ratings_sum } = room;
    const priceTitle = base_nightly_price 
      ? (<TextRow><PriceTitle>${base_nightly_price}</PriceTitle><NightText>{'  /  night'}</NightText></TextRow>)
      : (<h1>Loading...</h1>);
    const ratingsTitle = ratings_count 
      ? (<TextRow><img src="https://keybox.s3-us-west-1.amazonaws.com/star.png" /><RatingBold>{ratings_sum}</RatingBold><RatingCount>({ratings_count})</RatingCount></TextRow>)
      : (<h1>Loading...</h1>);
    return (
      <FlexRow>
        {priceTitle}
        {ratingsTitle}
      </FlexRow>
    );
  }
}

export default InitialStateHeader;