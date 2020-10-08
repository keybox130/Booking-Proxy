/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  :hover {
    background: rgb(247, 247, 247);
  }
  padding: 12px;
  text-align: left;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 64px;
  max-height: 64px;
  border-radius: 4px;
`;

const FlexColumn = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.button`
  text-align: left;
  cursor: pointer;
  position: relative;
  touch-action: manipulation;
  border-radius: 0px;
  outline: none;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s;
  background: transparent;
  border: none;
  color: inherit;
  display: block;
  margin: 0px;
  padding: 0px;
  text-decoration: none;
  height: 100%;
  width: 100%;
  }
`;

const Type = styled.small`
  font-size: 13px;
  color: rgb(120, 120, 120);
`;

const EntryTitle = styled.div`
  font-weight: 400;
  font-size: 16px;
  margin: 5px 0px 5px 0px;
`;

const Stays = styled.div`
  font-size: 13px;
`;

const Count = (count) => (
  (Number(count) === 1
    ? `${count} stay`
    : Number(count) === 0
      ? 'Nothing saved yet'
      : `${count} stays`)
);

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    const { id, name, count } = this.props;
    this.state = {
      id: id,
      name: name,
      count: count,
    };
    this.addToList = this.addToList.bind(this);
  }

  addToList() {
    const { id, count } = this.state;
    console.log('id');
    console.log(id);
    console.log('count');
    console.log(count);
    const { updateList, handleClose } = this.props;
    const newCount = count + 1;
    this.setState({
      count: newCount,
    });
    updateList(id, newCount);
    handleClose();
    // if add to a list is clicked, change the heart toggle to fill
  }

  render() {
    const { name, count, image } = this.props;
    const imageUrl = image
      ? <Img alt="icon" src={image} />
      : <h1>Loading...</h1>;
    return (
      <FlexRow>
        <div>
          {imageUrl}
        </div>
        <FlexColumn>
          <ListItem onClick={this.addToList}>
            <div>
              <Type>Any time</Type>
            </div>
            <EntryTitle>{name}</EntryTitle>
            <Stays>
              {Count(count)}
            </Stays>
          </ListItem>
        </FlexColumn>
      </FlexRow>
    );
  }
}

export default Favorites;
