/* eslint-disable import/extensions */
import React from 'react';
import styled from 'styled-components';
import Header from './Header.jsx';
import Images from './Images.jsx';
import GalleryModal from './GalleryModal.jsx';
import SaveModal from './SaveModal.jsx';
import CreateListModal from './CreateListModal.jsx';

const axios = require('axios');

// const HeaderImgCenter = styled.div`
// display: flex;
// flex-direction: row;
// width: 100%;
// align-items: center;
// justify-content: center;
// `;
const HeaderImg = styled.div`
  flex-direction: row;
  height: 100px;
  background-image: url("header.png");
  background-repeat: no-repeat;
  background-size: auto 100px;
  background-position: center;
`;

const HomeMainDiv = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const GalleryModalDiv = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
const SaveModalDiv = styled.div`
 z-index: 3;
position: absolute;
`;
const CreateListDiv = styled.div`
 z-index: 4;
position: absolute;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stay: null,
      galleryShown: false,
      imageChosen: null,
      saveModalShown: false,
      shareModalShown: false,
      createModalShown: false,
      lists: null,
      saved: false,
    };
    this.getStay = this.getStay.bind(this);
    this.getLists = this.getLists.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.showAllPhotos = this.showAllPhotos.bind(this);
    this.PrevOrNextImg = this.PrevOrNextImg.bind(this);
    this.SaveModalToggle = this.SaveModalToggle.bind(this);
    this.ShareModalToggle = this.ShareModalToggle.bind(this);
    this.heartClick = this.heartClick.bind(this);
    this.IncrementStayCount = this.IncrementStayCount.bind(this);
    this.listClicked = this.listClicked.bind(this);
    this.heartClickUnsave = this.heartClickUnsave.bind(this);
    this.CreateListModalToggle = this.CreateListModalToggle.bind(this);
  }

  // Invokes getStay with hardcoded stay
  componentDidMount() {
    this.getStay(71);
    this.getLists();
  }

  // Gets selected stay
  getStay(roomId) {
    axios(`/photo/stays/${roomId}`)
      .then((response) => {
        this.setState({
          stay: response.data[0],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get All Lists in list DB
  getLists() {
    axios('/photo/list')
      .then((response) => {
        this.setState({
          lists: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  PrevOrNextImg(direction) {
    if (direction === 'Back') {
      // console.log("PrevOrNextImg Invoked");
      this.setState(
        {
          imageChosen: this.state.imageChosen - 1,
        },
      );
      // console.log(`PrevOrNextImg Invoked: State.imgChosen: ${this.state.imageChosen}`);
    }

    if (direction === 'Forward') {
      this.setState(
        {
          imageChosen: this.state.imageChosen + 1,
        },
      );
      // console.log(`Forward Triggered: State.imgChosen: ${this.state.imageChosen}`);
    }
  }

  toggleModal(e) {
    const { galleryShown } = this.state;
    const { id } = e.target;
    this.setState({
      galleryShown: !galleryShown,
      imageChosen: Number(id),
    });
  }

  showAllPhotos() {
    const { galleryShown } = this.state;
    this.setState({
      galleryShown: !galleryShown,
      imageChosen: 0,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  ShareModalToggle() {
    console.log('Share Modal invoked');
  }

  SaveModalToggle() {
    const { saveModalShown } = this.state;
    this.setState({
      saveModalShown: !saveModalShown,
    });
    // this.setState(prevState => ({ saveModalShown: !saveModalShown }));
  }

  CreateListModalToggle() {
    this.SaveModalToggle();
    const { createModalShown } = this.state;
    this.setState({
      createModalShown: !createModalShown,
    });
  }

  heartClick() {
    const { saved } = this.state;
    console.log('heartClick invoked');
    this.SaveModalToggle();
    // this.setState(prevState => ({ saveModalShown: !saveModalShown }));
  }

  listClicked() {
    this.setState({
      saved: !this.state.saved,
    });
    this.SaveModalToggle();
  }

  // Incrment The count of stay
  // eslint-disable-next-line class-methods-use-this
  IncrementStayCount(currentCount) {
    console.log('Invoked increment Stay count', currentCount );
    const increasedCount = currentCount + 1;
    // console.log(increasedCount);
    // axios.post('/list', {
    //   firstName: 'Fred',
    //   lastName: 'Flintstone',
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  heartClickUnsave() {
    this.setState({
      saved: !this.state.saved,
    });
  }

  render() {
    // destructure state properties
    const {
      imageChosen, stay, lists, galleryShown, saveModalShown, saved, createModalShown,
    } = this.state;

    // If state.stay is true proceed with rendering Header component, else show loading.
    const header = stay ? (
      <Header
        stay={stay}
        saveModalToggle={this.SaveModalToggle}
        saved={saved}
        heartClick={this.heartClick}
        heartClickUnsave={this.heartClickUnsave}
      />
    )
      : <h1>Loading...</h1>;
    // If state.stay is true proceed with rendering Images component, else show loading.
    const images = stay ? (
      <Images
        toggleMod={this.toggleModal}
        photos={stay.photos}
        showAllPhotos={this.showAllPhotos}
      />
    )
      : <h1>Loading Images...</h1>;

    // Conditionally Render Gallery Modal
    const gallerymodal = (galleryShown && stay.photos)
      ? (
        <GalleryModal
          photos={stay.photos}
          imageSelected={imageChosen}
          toggleMod={this.toggleModal}
          saveModalToggle={this.SaveModalToggle}
          shareModalToggle={this.ShareModalToggle}
          showAllPhotos={this.showAllPhotos}
          prevOrNext={this.PrevOrNextImg}
          saved={saved}
          heartClick={this.heartClick}
          heartClickUnsave={this.heartClickUnsave}
        />
      )
      : <div />;
    // Conditionally Render Save Modal
    const savemodal = (saveModalShown && lists)
      ? (
        <SaveModal
          saveModalToggle={this.SaveModalToggle}
          photos={stay.photos}
          lists={lists}
          IncrementStayCount={this.IncrementStayCount}
          listClicked={this.listClicked}
          createListModalToggle={this.CreateListModalToggle}
        />
      )
      : <div />;
      // Create List Modal
    const createListModal = createModalShown
      ? (
        <CreateListModal
          getLists={this.getLists}
          currentStay={this.state.stay}
          saveModalToggle={this.SaveModalToggle}
          createListModalToggle={this.CreateListModalToggle}
          heartClickUnsave={this.heartClickUnsave}
          lists={lists}
          IncrementStayCount={this.IncrementStayCount}
          listClicked={this.listClicked}
        />
      )
      : <div />;

    return (
      <>
        <CreateListDiv id="CreateListDiv">
          {createListModal}
        </CreateListDiv>
        <SaveModalDiv id="SaveModalDiv">{savemodal}</SaveModalDiv>
        <GalleryModalDiv id="GalleryModalDiv">{gallerymodal}</GalleryModalDiv>
        <HeaderImg id="HeaderImg" />
        <HomeMainDiv id="HomeMain DIV">
          <div id="Header">{header}</div>
          <div id="Image Gallery">{images}</div>
        </HomeMainDiv>
      </>
    );
  }
}

// console.log("Save Modal invoked");
// const newState = Object.assign({}, this.state);
// newState.saveModalShown = !this.state.saveModalShown;
// this.setState(newState);
// console.log('State after setState:', this.state);

export default App;
