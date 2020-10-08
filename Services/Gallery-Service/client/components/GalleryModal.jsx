import React from 'react';
import styled from 'styled-components';

const GalleryModalDiv = styled.div`
  background-color: white;
  width: 100%;
  animation-duration: 1s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-top: 100%;
    height: 300%;
    opacity:25%;
  }

  to {
    margin-top: 0%;
    height: 100%;
    opacity:100%;
  }
}
`;

const GalleryDiv = styled.div`
  display:flex;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  width:100%;
`;
const MainButtons = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content: space-between;
  padding-top:40px;
  padding-right:40px;
  padding-left:40px;
  padding-bottom:40px;
`;
const CloseButton = styled.button`
  width: 100px;
  height:35px;
  font-family: 'Montserrat', sans-serif;
  flex-direction: row;
  border-radius: 5px;
  border: none;
  padding:none;
  cursor: pointer;
  background-color: rgb(239, 239, 239);
  :hover {
    background-color: rgb(219, 219, 219);
  }
`;
const ShareSaveDiv = styled.div`
display: flex;
flex-direction: row;
width:119px;
`;

const ShareButton = styled.button`
  flex-direction: row;
  width: 50px;
  height: 25px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  background-color: #fff;
  outline:none;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  :hover {
    background-color: #F0EFEF;
  }
`;
const SaveButton = styled(ShareButton)`
  flex-direction: row;
  width: 50px;
  height: 25px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  background-color: #fff;
  outline:none;
  cursor: pointer;
  :hover {
    background-color: #F0EFEF;
  }
`;

const PreviousButton = styled.button`
  // position: relative;
  width: 50px;
  height: 50px;
  margin-left:25px;
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  background-color: #fff;
  border-style: solid;
  border-width: 1px;
  outline:none;
  cursor: pointer;
  :hover {
    background-color: #F0EFEF;
  }

`;

const NextButton = styled(PreviousButton)`
  margin-right:25px;
  cursor: pointer;
`;

const ImgCol = styled.div`
  height: 760px;
  width: 1350px;
  overflow: hidden;
  display:flex;
  flex-direction:column;
  align-items: center;
`;
const ImgNums = styled.div`
display: flex;
flex-direction: column;
  font-family: 'Montserrat', sans-serif;
`;

const GalleryImage = styled.img`
  display: flex;
  flex-direction: column;
  height:800px;
`;
const ImgDescDiv = styled.div`
font-family: 'Montserrat', sans-serif;
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
const ShareButtonIcon = styled.button`
cursor: pointer;
z-index: 10;
background: transparent;
height: 24px;
svg {
  background: transparent;
  fill: #F0EFEF;
  min-height: 24px;
  min-width: 24px;
}
overflow: hidden;
stroke: black;
outline: none;
border: none;
`;
const NavBttnSpacer = styled.div`
width:75px;
`;
const NavFwdBttnSpacer = styled.div`
width:100px;
`;

class GalleryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.backOrForth = this.backOrForth.bind(this);
  }

  backOrForth(e) {
    this.props.prevOrNext(e.target.id);
  }

  render() {
    const {
      photos,
      toggleMod,
      saveModalToggle,
      shareModalToggle,
      imageSelected,
      saved,
      heartClick,
      heartClickUnsav
    } = this.props;

    // Get the ID num of the last image
    // console.log('gallery Modal, Photo ID. line 144', photos[this.props.photos.length - 1].id);
    const lastImageID = photos[this.props.photos.length - 1].id;

    // Get chosen Img from app state
    const chosenImg = photos[imageSelected].photo_url;

    // Get Description of chosen photo
    const ImgDesc = photos[imageSelected].description;

    // If the selected image is the first, do not show previous button
    const previousButton = imageSelected === 0 ? <NavBttnSpacer />
      : (
        <PreviousButton id="Back" onClick={this.backOrForth}>
          &#60;
        </PreviousButton>
      );

    // If the imageSelected is the last image do not show next button
    const nextButton = imageSelected === lastImageID - 1 ? <NavFwdBttnSpacer />
      : (
        <NextButton id="Forward" onClick={this.backOrForth}>
          &#62;
        </NextButton>
      );

    const heart = saved ? (
      <FilledHeart type="button" onClick= {heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </FilledHeart>
    ) : (
      <EmptyHeart type="button" onClick={heartClick}>
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z" /></svg>
      </EmptyHeart>
    );

    return (
      <GalleryModalDiv id="GalleryModalDiv">

        <MainButtons id="MainButtons">
          <CloseButton id="CloseButton" onClick={toggleMod}>X Close</CloseButton>
          <ImgNums id="ImgNums">
            {imageSelected + 1}
            /
            {lastImageID}
          </ImgNums>
          <ShareSaveDiv id="ShareSaveDiv">
            <ShareButtonIcon type="button" onClick={shareModalToggle}>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" styles="display: block; fill: none; height: 16px; width: 16px; stroke: #F0EFEF; stroke-width: 2; overflow: visible;">
                <g fill="none">
                  <path d="M27 18v9a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-9">
                  </path>
                  <path d="M16 3v23V3z">
                  </path>
                  <path d="M6 13l9.293-9.293a1 1 0 0 1 1.414 0L26 13">
                  </path>
                </g>
              </svg>
            </ShareButtonIcon>
            <>{heart}</>
          </ShareSaveDiv>
        </MainButtons>
        <GalleryDiv id="GalleryDiv">
          <div id="PreviousButton">{previousButton}</div>
          <ImgCol id="ImgCol">
            <GalleryImage id="GalleryImg" src={`${chosenImg}`} alt="Stay here!" />
            <ImgDescDiv id="ImgDesc"><p>{ImgDesc}</p></ImgDescDiv>
          </ImgCol>
          <div id="NextButton">{nextButton}</div>
        </GalleryDiv>
      </GalleryModalDiv>
    );
  }
}

export default GalleryModal;
