import React from 'react';
import styled from 'styled-components';

const HeaderContent = styled.div`
  width: 1120px;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const HeaderFont = styled.p`
font-family: 'Montserrat', sans-serif;
`;
const StayName = styled.h1`
margin: 0px;
font-size: 1.6em;
font-family: 'Montserrat', sans-serif;
`;

const RatingStar = styled.p`
font-family: 'Assistant', sans-serif;
color:rgb(236, 76,96);
font-size: 2.3em;
margin-top: 5px;
margin-right:3px;
`;

const Rating = styled(HeaderFont)`
font-size:14px;
flex-direction:row;
margin-right: 5px;
`;

const RatingCount = styled(HeaderFont)`
font-size: .8em;
color: #6e6e6e;
flex-direction:row;
margin-right: 10px;
margin-top: 15px;
`;
const SuperHostDiv = styled.div`
flex-direction:row;

`;
const SuperHostIcon = styled.div`
flex-direction:row;
height: 15px;
width:10px;
background-image: url("superHost.png");
background-repeat: no-repeat;
background-size: 10px;
margin-right:2px;
display:inline-block;
`;
const SuperHost = styled(HeaderFont)`
font-size: .8em;
color:rgb(113, 113, 113);
flex-direction:row;
margin-right: 10px;
margin-top: 15px;
display:inline-block;
`;
const Location = styled(HeaderFont)`
font-size: 14px;
font-family: 'Montserrat', sans-serif;
color:rgb(113, 113, 113);
text-decoration: underline;
flex-direction:row;
`;

const RatingLocation = styled.div`
display: flex;
flex-direction: row;
`;

const ShareSave = styled.div`
display: flex;
flex-direction:row;
text-decoration: underline;
align-items:center;
`;
const Share = styled(HeaderFont)`
margin-right: 10px;
font-size 14px;
text-decoration: underline;
cursor: pointer;
`;
const Save = styled(HeaderFont)`
text-decoration: underline;
font-size 14px;
cursor: pointer;
:hover {
  font-color: #F0EFEF;
}
`;
const EmptyHeart = styled.button`
  position: relative;
  cursor: pointer;
  z-index: 1;
  background: transparent;
  height: 24px;
  svg {
    background: transparent;
    fill: rgba(0, 0, 0, 0.5);
    min-height: 24px;
    min-width: 24px;
  }
  justify-content: right;
  margin-right: 6px;
  overflow: hidden;
  stroke: rgb(255, 255, 255);
  outline: none;
  border: none;
`;

const FilledHeart = styled.button`
  position: relative;
  cursor: pointer;
  z-index: 1;
  background: transparent;
  height: 24px;
  svg {
    background: transparent;
    fill: rgb(255, 56, 92);
    min-height: 24px;
    min-width: 24px;
  }
  justify-content: right;
  margin-right: 6px;
  overflow: hidden;
  stroke: rgb(255, 255, 255);
  outline: none;
  border: none;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { stay, saved, heartClick, heartClickUnsave, saveModalToggle } = this.props;
    const { title, rating, rating_count, super_host, location } = stay;

    const Superhost = super_host ? (
      <>
        <SuperHostIcon />
        <SuperHost>
          Superhost
        </SuperHost>
      </>
    )
      : <div />;

    const heart = saved ? (
      <FilledHeart type="button" onClick={heartClickUnsave}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </FilledHeart>
    ) : (
      <EmptyHeart type="button" onClick={heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </EmptyHeart>
    );
    return (
      <div>
        <StayName>{title}</StayName>
        <HeaderContent>
          <RatingLocation>
            <RatingStar>*</RatingStar>
            <Rating>{rating}</Rating>
            <RatingCount>
              (
              {rating_count}
              )
            </RatingCount>
            <SuperHostDiv>{Superhost}</SuperHostDiv>
            <Location>{location}</Location>
          </RatingLocation>
          <ShareSave>
            <Share>Share</Share>
            <>{heart}</>
            <Save onClick={saveModalToggle}>Save</Save>
          </ShareSave>
        </HeaderContent>
      </div>
    );
  }
}

// Header.propTypes = {
//   stay.title: PropTypes.string.isRequired,
//   rating: PropTypes.string.isRequired,
// };
export default Header;
