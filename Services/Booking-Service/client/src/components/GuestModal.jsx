import React from 'react';
import styled from 'styled-components';

// Modal
const Modal = styled.div`
  background: rgb(255, 255, 255) !important;
  border-radius: 4px !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px !important;
  padding: 16px !important;
  text-align: left !important;
  z-index: 999 !important;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 190px;
  right: 0px;
`;

// Containers
const FlexCol = styled.div`
  display: flex;
  align-items: left;
  justify-content: flex-start;
  flex-direction: column;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const AgeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  margin: 3px;
`;

const CloseRow = styled.div`
  display: flex;
  align-items: right;
  justify-content: flex-end;
  width: 100%;
`;

// Text Style
const AgeFont = styled.h3`
  font-size: 16px;
  font-weight: 500;
`;

const SecondaryText = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const Close = styled.h4`
  font-wieght: 500;
  text-decoration: underline;
  cursor: pointer;
`;

const WarningText = styled.p`
  font-weight: normal;
  color: #828282;
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

class GuestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { active, childrenCount, adultCount, infantCount, maxGuests, handlers, guestTotal, closeMe } = this.props;
    let adultButtons;
    if (guestTotal < maxGuests) {
      if (adultCount === 1) {
        adultButtons = (<FlexRow>
          <img src="https://keybox.s3-us-west-1.amazonaws.com/inactiveMinus.png" />
          <h3>{adultCount}</h3>
          <img onClick={() => handlers.addAdult()} src="https://keybox.s3-us-west-1.amazonaws.com/activePlus.png" />
        </FlexRow>)
      } else if (adultCount >= 2) {
        adultButtons = (<FlexRow>
          <img onClick={() => handlers.removeAdult()} src="https://keybox.s3-us-west-1.amazonaws.com/activeMinus.png"/>
          <h3>{adultCount}</h3>
          <img onClick={() => handlers.addAdult()} src="https://keybox.s3-us-west-1.amazonaws.com/activePlus.png"/>
        </FlexRow>)
      }
    } else {
      adultButtons = (<FlexRow>
        <img onClick={() => handlers.removeAdult()} src="https://keybox.s3-us-west-1.amazonaws.com/activeMinus.png" />
        <h3>{adultCount}</h3>
        <img src="https://keybox.s3-us-west-1.amazonaws.com/inactivePlus.png"/>
      </FlexRow>)
    }

    let childButtons;
    if (guestTotal < maxGuests) {
      if (childrenCount === 0) {
        childButtons = (<FlexRow>
          <img src="https://keybox.s3-us-west-1.amazonaws.com/inactiveMinus.png" />
          <h3>{childrenCount}</h3>
          <img onClick={() => handlers.addChildren()} src="https://keybox.s3-us-west-1.amazonaws.com/activePlus.png" />
        </FlexRow>);
      } else if (childrenCount >= 1) {
        childButtons = (<FlexRow>
          <img onClick={() => handlers.removeChildren()} src="https://keybox.s3-us-west-1.amazonaws.com/activeMinus.png" />
          <h3>{childrenCount}</h3>
          <img onClick={() => handlers.addChildren()} src="https://keybox.s3-us-west-1.amazonaws.com/activePlus.png" />
        </FlexRow>);
      }
    } else {
      childButtons = (<FlexRow>
        <img onClick={() => handlers.removeChildren()} src="https://keybox.s3-us-west-1.amazonaws.com/activeMinus.png" />
        <h3>{childrenCount}</h3>
        <img src="https://keybox.s3-us-west-1.amazonaws.com/inactivePlus.png" />
      </FlexRow>);
    }

    let infantsButtons;
    if (guestTotal < maxGuests) {
      if (infantCount === 0) {
        infantsButtons = (<FlexRow>
          <img src="https://keybox.s3-us-west-1.amazonaws.com/inactiveMinus.png" />
          <h3>{infantCount}</h3>
          <img onClick={() => handlers.addInfants()} src="https://keybox.s3-us-west-1.amazonaws.com/activePlus.png" />
        </FlexRow>);
      } else if (infantCount >= 1) {
        infantsButtons = (<FlexRow>
          <img onClick={() => handlers.removeInfants()} src="https://keybox.s3-us-west-1.amazonaws.com/activeMinus.png" />
          <h3>{infantCount}</h3>
          <img onClick={() => handlers.addInfants()} src="https://keybox.s3-us-west-1.amazonaws.com/activePlus.png" />
        </FlexRow>);
      }
    } else {
      infantsButtons = (<FlexRow>
        <img onClick={() => handlers.removeInfants()} src="https://keybox.s3-us-west-1.amazonaws.com/activeMinus.png" />
        <h3>{infantCount}</h3>
        <img src="https://keybox.s3-us-west-1.amazonaws.com/inactivePlus.png" />
      </FlexRow>);
    }
    return (
      <Modal>
        <AgeRow>
          <AgeFont>Adults</AgeFont>
          {adultButtons}
        </AgeRow>
        <AgeRow>
          <FlexCol>
            <AgeFont>Children</AgeFont>
            <SecondaryText>Ages 2-12</SecondaryText>
          </FlexCol>
          {childButtons}
        </AgeRow>
        <AgeRow>
        <FlexCol>
            <AgeFont>Infants</AgeFont>
            <SecondaryText>Under 2</SecondaryText>
          </FlexCol>
          {infantsButtons}
        </AgeRow>
        <WarningText>
        {maxGuests} guests maximum. Infants don’t count toward the number of guests.
        </WarningText>
        <CloseRow>
          <Close  onClick={() => closeMe()}>Close</Close>
        </CloseRow>
    </Modal>
    );
  }
}

export default GuestModal;