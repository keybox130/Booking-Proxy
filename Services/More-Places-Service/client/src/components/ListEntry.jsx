/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  font-weight: 400;
  font-size: 14px;
  min-width: 260px;
  min-height: 300px;
  margin: 0px 10px 0px 10px;
  scroll-snap-type: x mandatory;

`;

const ImgFlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;
  width: 260px;
  height: 180px;
  position: sticky;
  margin-bottom: 9px;
`;

const House = styled.img`
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 12px;
  border: .1px solid rgb(215, 215, 215);
`;

const Super = styled.div`
  position: relative;
  z-index: 1;
  height: 15px;
  overflow: hidden;
  margin-left: 7px;
  margin-top: 7px;
  font-weight: 600;
  font-size: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  color: rgb(34, 34, 34);
  padding: 3px;
`;

const EmptyHeart = styled.button`
  position: relative;
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
  margin-top: 7px;
  overflow: hidden;
  stroke: rgb(255, 255, 255);
  outline: none;
  border: none;
`;

const FilledHeart = styled.button`
  position: relative;
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
  margin-top: 7px;
  overflow: hidden;
  stroke: rgb(255, 255, 255);
  outline: none;
  border: none;
`;

const FlexRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  position: sticky;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 1px;
`;

const Reviews = styled.div`
  font-size: 14px;
  color: rgb(0, 0, 0);
  img.star {
    width: 18px;
    height: 18px;
    fill: rgb(255, 56, 92);
    stroke: rgb(255, 255, 255);
  }
  small {
    font-size: 13px;
    color: rgb(120, 120, 120);
  }
`;

class ListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
    };
    this.heartClick = this.heartClick.bind(this);
    this.heartFill = this.heartFill.bind(this);
  }

  heartClick(e) {
    e.preventDefault();
    const { saved } = this.state;
    const { modal, photo } = this.props;
    // if heart is not filled when clicked, pop up modal
    if (!saved) {
      modal(photo.image);
    }
    // else (heart is filled alr), change heart toggle to empty
    this.setState({
      saved: !saved,
      // saved: false,
    });
  }

  heartFill() {
    this.setState({
      saved: true,
    });
  }

  // store which list of favorites listing is added to for removal when heart untoggles

  render() {
    const { photo, refs, index } = this.props;
    const { saved } = this.state;
    const heart = saved ? (
      <FilledHeart type="button" onClick={this.heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </FilledHeart>
    ) : (
      <EmptyHeart type="button" onClick={this.heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </EmptyHeart>
    );

    return (
      <FlexColumn ref={refs[index]}>
        <ImgFlexRow>
          <House alt="House" src={photo.image} />
          {photo.superhost
            ? <Super>SUPERHOST</Super>
            : <div />}
          {heart}
        </ImgFlexRow>
        <Reviews>
          <img className="star" alt="star" src="https://keybox-houses.s3-us-west-1.amazonaws.com/star.png" />
          {photo.rating} <small>{photo.reviews}</small>
        </Reviews>
        <FlexRow>{photo.listing}</FlexRow>
        <FlexRow>
          {photo.title.length > 30
            ? `${photo.title.slice(0, 30)}...`
            : photo.title}
        </FlexRow>
        <FlexRow className="price">
          <strong>
            $
            {photo.price}
          </strong> / night
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default ListEntry;
