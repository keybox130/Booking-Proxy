import React from 'react';
import styled from 'styled-components';

const HomeImages = styled.div`
  display:flex;
  align-items: flex-start;
  width: 1120px;
  border-radius: 20px;
  overflow:hidden;
  img:hover{
  filter: brightness(85%);
  transition: 350ms ease;
  }
`;

const HomeImg1 = styled.img`
width: 560px;
height:560px;
object-fit: cover;
margin-right: 0px;
cursor: pointer;
`;
const HomeImg2 = styled.img`
width: 272px;
height:275px;
object-fit: cover;
margin-left: 10px;
margin-top:0px
margin-bottom: 5px;
cursor: pointer;
`;
const HomeImg3 = styled.img`
width: 272px;
height:275px;
object-fit: cover;
margin-top:10px;
margin-left: 10px;
cursor: pointer;
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const ShowAllPhotosButton = styled.div`
position:relative;
  z-index:1;
  width: 135px;
  height:27px;
  font-family: 'Montserrat', sans-serif;
  font-size:13px;
  border-radius: 5px;
  text-align:center;
  border: 1px solid black;
  padding-top:8px;
  cursor: pointer;
  background-color: #fff;
  :hover {
    background-color: #F0EFEF;
  }
  position: relative;
  top: 539px;
  right: -958px;

`;

class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { toggleMod, photos, showAllPhotos} = this.props;
    return (
      <>
      <ShowAllPhotosButton onClick={showAllPhotos}>Show all photos</ShowAllPhotosButton>
        <HomeImages>
          <HomeImg1 id="0" onClick={toggleMod} src={`${photos[0].photo_url}`} alt="Stay here" />
          <LeftCol>
            <HomeImg2 id="1" onClick={toggleMod} src={`${photos[1].photo_url}`} alt="Stay here" />
            <HomeImg3 id="2" onClick={toggleMod} src={`${photos[2].photo_url}`} alt="Stay here" />
          </LeftCol>
          <RightCol>
            <HomeImg2 id="3" onClick={toggleMod} src={`${photos[3].photo_url}`} alt="Stay here" />
            <HomeImg3 id="4" onClick={toggleMod} src={`${photos[4].photo_url}`} alt="Stay here" />
          </RightCol>
        </HomeImages>
      </>
    );
  }
}

export default Images;
