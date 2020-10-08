import React from 'react';
import styled from 'styled-components';

const SaveModalBG = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000;
  opacity: 50%;
  position: absolute;
`;
const SaveModalContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  animation-duration: 1s;
  animation-name: slidein;
  }
  @keyframes slidein {
  from {
    margin-top: 100%;
    height: 300vh;
    opacity:25%;
  }
  to {
    margin-top: 0%;
    height: 100vh;
  }
  }
`;

const SaveModalDiv = styled.div`
  z-index: 6;
  width: 570px;
  background-color: #fff;
  border-radius: 30px;
`;

const SaveModalHeader = styled.div`
  z-index: 6;
  display: flex;
  justify-content: flex-start;
  position: relative;
  min-height: 30px !important;
  padding: 20px 24px !important;
  border-bottom: 1px solid rgb(235, 235, 235) !important;
`;
const SaveModalHeaderText = styled.div`
  flex: 0 1 auto;
  width: 130px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const CloseButton = styled.button`
  width: 30px;
  height:30px;
  flex: 0 1 auto;
  margin-right: auto;
  font-family: 'Montserrat', sans-serif;
  border-radius:20px;
  border: none;
  cursor: pointer;
  background-color: #FFF;
  :hover {
    background-color: #F0EFEF;
  }
  outline:none;
`;
const SaveListHeaderText = styled.div`
  font-family: 'Montserrat', sans-serif;
  overflow: hidden !important;
  flex: 0 1 auto !important;
  text-align: center !important;
`;
const ListItems = styled.div`
  padding: 20px 16px !important;
  overflow-y: auto !important;
`;
const ListItem = styled.div`
  cursor: pointer !important;
  position: relative !important;
  touch-action: manipulation !important;
  font-family: inherit !important;
  font-size: inherit !important;
  line-height: inherit !important;
  font-weight: inherit !important;
  border-radius: 0px !important;
  outline: none !important;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
  background: transparent !important;
  border: none !important;
  color: inherit !important;
  display: block !important;
  margin: 0px !important;
  padding: 0px !important;
  text-align: inherit !important;
  text-decoration: none !important;
  height: 100% !important;
  width: 100% !important;
`;
const ListItemInner = styled.div`
  height:64px;
  -webkit-box-align: center !important;
  display: flex !important;
  align-items: center !important;
  padding: 12px !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  :hover {
    background-color: #F0EFEF;
  }
`;
const LiImg = styled.div`
  height:65px;
  width:65px;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 16px;
`;
const LiInfo = styled.div`
  flex: 1 1 0% !important;
`;
const LiTime = styled.div`
  margin-bottom: 4px !important;
  font-size: 12px !important;
  line-height: 16px !important;
  font-weight: 400 !important;
  color: rgb(113, 113, 113) !important;
  font-family: 'Montserrat', sans-serif;
`;
const LiName = styled.div`
  font-size: 16px !important;
  line-height: 20px !important;
  font-weight: 600 !important;
  color: rgb(34, 34, 34) !important;
  font-family: 'Montserrat', sans-serif;`;
const LiLength = styled.div`
  font-size: 14px !important;
  line-height: 18px !important;
  font-weight: 400 !important;
  margin-top: 4px !important;
  color: rgb(34, 34, 34) !important;
  font-family: 'Montserrat', sans-serif;
`;

function ShareModal(props) {
  const { shareModalToggle, photos, lists } = props;
  const mappedLists = lists.map ((listItem, i) => (
    <ListItem
      key={listItem._id}
      onClick={listClicked}
    >
      <ListItemInner>
        <LiImg>
          <img src={`${listItem.tmb_url}`} alt="" width="65" height="65" />
        </LiImg>
        <LiInfo>
          <LiTime>
            Any time
          </LiTime>
          <LiName>
            {listItem.title}
          </LiName>
          <LiLength>
            {`${listItem.number} Stays`}
          </LiLength>
        </LiInfo>
      </ListItemInner>
    </ListItem>
  ));
  return (
    <SaveModalContainer id="SaveModalContainer">
      <SaveModalDiv id="SaveModalDiv">
        <SaveModalHeader id="SaveModalHeader">
          <CloseButton id="CloseButton" onClick={saveModalToggle}>X</CloseButton>
          <SaveModalHeaderText id="SaveModalHeaderText">
            <SaveListHeaderText id="SaveToListText">
              Save To List
            </SaveListHeaderText>
          </SaveModalHeaderText>
        </SaveModalHeader>
        <ListItems>
          <div>{mappedLists}</div>
        </ListItems>
        <SaveModalFooter>
          <SaveModalFooterButton>
            Create a list
          </SaveModalFooterButton>
        </SaveModalFooter>
      </SaveModalDiv>
      <SaveModalBG id="SaveModalBG" onClick={saveModalToggle} />
    </SaveModalContainer>
  );
}
export default ShareModal;