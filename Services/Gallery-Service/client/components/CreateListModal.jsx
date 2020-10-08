import React from 'react';
import styled from 'styled-components';

const axios = require('axios');

const CreateListModalDiv = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000;
  opacity: 50%;
  position: absolute;
`;
const CreateListContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const CreateListDiv = styled.div`
  z-index: 7;
  width: 570px;
  background-color: #fff;
  border-radius: 30px;
`;

const CreateListHeader = styled.div`
  z-index: 7;
  display: flex;
  justify-content: flex-start;
  position: relative;
  min-height: 30px !important;
  padding: 20px 24px !important;
  border-bottom: 1px solid rgb(235, 235, 235) !important;
`;
const CreateListModalHeaderText = styled.div`
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
const CreateListHeaderText = styled.div`
  font-family: 'Montserrat', sans-serif;
  overflow: hidden !important;
  flex: 0 1 auto !important;
  text-align: center !important;
`;
const ListItems = styled.div`
  padding: 20px 16px !important;
  overflow-y: auto !important;
  align-items:center;
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
const CreateListFooter = styled.div`
  -webkit-box-pack: justify !important;
  -webkit-box-align: center !important;
  display: flex !important;
  flex: 0 0 auto !important;
  border-top: 1px solid rgb(235, 235, 235) !important;
  padding: 16px 24px !important;
  align-items: center !important;
  justify-content: space-between !important;
  font-size: 16px !important;
  line-height: 20px !important;
  font-family: 'Montserrat', sans-serif;
`;
const CreateListFooterButton = styled.button`
cursor: pointer !important;
display: inline-block !important;
margin: 0px !important;
position: relative !important;
text-align: center !important;
touch-action: manipulation !important;
font-size: 16px !important;
line-height: 20px !important;
font-family: 'Montserrat', sans-serif;
font-weight: 600 !important;
border-radius: 8px !important;
outline: none !important;
padding: 10px !important;
transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s !important;
border: none !important;
background: transparent !important;
color: rgb(34, 34, 34) !important;
text-decoration: underline !important;
width: 100% !important;
`;
const NewListInput = styled.input`
  width: 500px;
  height:40px;
  border: none !important;
  outline: none !important;
  padding: 10px;
  margin: 26px 12px 10px !important;
  border-radius: 8px !important;
 box-shadow: rgb(176, 176, 176) 0px 0px 0px 1px inset !important;
 font-family: 'Montserrat', sans-serif;
  min-height: 1px !important;
  color: inherit !important;
  background-color: transparent !important;
  font-family: inherit !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  appearance: none !important;

`;

class CreateListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {listname: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({listname: event.target.value});
  }

  handleSubmit(event) {
    const { listname } = this.state;
    const { createListModalToggle, heartClickUnsave, saveModalToggle, getLists } = this.props;
    this.postList(listname);
    heartClickUnsave();
    getLists();
    // saveModalToggle();
    createListModalToggle();
    event.preventDefault();
  }

  postList(ListName) {
    axios.post('/photo/list', {
      title: ListName,
      number: 1,
      tmb_url: this.props.currentStay.photos[0].photo_url,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { createListModalToggle } = this.props;
    return (
      <CreateListContainer id="CreatListContainer">
        <CreateListDiv id="CreatListDiv">
          <CreateListHeader id="CreatListHeader">
            <CloseButton id="CloseButton" onClick={createListModalToggle}>X</CloseButton>
            <CreateListModalHeaderText id="CreatListModalHeaderText">
              <CreateListHeaderText id="CreatListHeaderText">
                Name this List
              </CreateListHeaderText>
            </CreateListModalHeaderText>
          </CreateListHeader>
          <ListItems>
            <form>
              <NewListInput type="text" value={this.state.value} onChange={this.handleChange} />
            </form>
          </ListItems>
          <CreateListFooter>
            <CreateListFooterButton onClick={this.handleSubmit}>
              Create
            </CreateListFooterButton>
          </CreateListFooter>
        </CreateListDiv>
        <CreateListModalDiv id="CreatListModalBG" onClick={createListModalToggle} />
      </CreateListContainer>
    )
  }
}
export default CreateListModal;
