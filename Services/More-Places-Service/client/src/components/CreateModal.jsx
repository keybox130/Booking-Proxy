import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  padding: 40px;
  align-items: center;
  z-index: 2000;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(34, 34, 34, .6);
`;

const Modal = styled.div`
  z-index: 200;
  width: 100%;
  max-width: 568px;
  border-radius: 12px;
  background: rgb(255, 255, 255);
  position: relative;
  max-height: 100%;
  display: flex;
  margin: auto;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(235, 235, 235);
`;

const Button = styled.button`
  appearance: none;
  justify-content: left;

  position: absolute;
  display: flex;
  top: 16px;
  left: 24px;

  border-radius: 50%;
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px;
  color: rgb(34, 34, 34);
  cursor: pointer;
  touch-action: manipulation;
  // position: relative;
  background: transparent;
  transition: -ms-transform 0.25s ease 0s, -webkit-transform 0.25s ease 0s, transform 0.25s ease 0s;
}
`;

const Close = styled.svg`
  display: block;
  fill: none;
  height: 16px;
  width: 16px;
  stroke: currentcolor;
  stroke-width: 3;
  overflow: visible;
`;

const Title = styled.header`
  -webkit-box-pack: justify;
  min-height: 48px;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 0px 24px;
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const HeaderTitle = styled.div`
  -webkit-box-flex: 0;
  overflow: hidden;
  flex: 0 1 auto;
  text-align: center;
  margin-left: 16px;
  margin-right: 16px;
`;

const Space = styled.div`
  // padding: 32px;
`;

const Entry = styled.div`
  position: relative;
  cursor: text;
  display: flex;
  height: 56px;
  width: 100%;
  margin: 0px;
  border: none;
  color: rgb(34, 34, 34);
  border-radius: 8px;
  box-shadow: rgb(176, 176, 176) 0px 0px 0px 1px inset;
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  &.hasFocus {
    color: rgb(34, 34, 34);
    border-width: 2px;
    border-color: black;
  }
  &.noFocus {
    border-width: 1px;
    border-color:
  }
`;

const Form = styled.div`
  color: rgb(113, 113, 113);
  border; none;
  outline: none;
  background-color: transparent;
  `;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  padding: 0px;
  margin: 26px 12px 10px;
  min-height: 1px;
  color: inherit;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  appearance: none;
`;

const Create = styled.footer`
  -webkit-box-pack: justify;
  -webkit-box-align: center;
  display: flex;
  flex: 0 0 auto;
  border-top: 1px solid rgb(235, 235, 235);
  padding: 16px 24px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  line-height: 20px;
`;

const CreateList = styled.button`
  // cursor: not-allowed;
  opacity: 1;
  border: none;
  background: rgb(221, 221, 221);
  display: inline-block;
  margin: 0px;
  position: relative;
  text-align: center;
  text-decoration: none;
  touch-action: manipulation;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  border-radius: 8px;
  outline: none;
  padding: 14px 24px;
  transition: box-shadow 0.2s ease 0s, -ms-transform 0.1s ease 0s, -webkit-transform 0.1s ease 0s, transform 0.1s ease 0s;
  border: none;
  background: rgb(34, 34, 34);
  color: rgb(255, 255, 255);
  width: 100%;
`;

class CreateModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      focus: null,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClose() {
    const { createModal } = this.props;
    createModal();
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      name: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { createAList, image, createModal } = this.props;
    const { name } = this.state;
    createAList(name, image);
    createModal();
  }

  handleFocus() {
    this.setState({
      focus: 'hasFocus',
    });
  }

  handleBlur() {
    this.setState({
      focus: 'noFocus',
    });
  }

  render() {
    const { name, focus } = this.state;
    const { createAList } = this.props;
    return (
      <Page>
        <Modal>
          <Header>
            <Button type="button" onClick={this.handleClose}>
              <Close viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
                <path d="m6 6 20 20" />
                <path d="m26 6-20 20" />
              </Close>
            </Button>
            <Title>
              <HeaderTitle>Name this list</HeaderTitle>
            </Title>
          </Header>
          <Space>
            <Entry>
              <label>
                <Form>
                  <Input
                    placeholder="Name"
                    className={focus}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    type="text"
                    value={name}
                    onChange={this.handleChange}
                  />
                </Form>
              </label>
            </Entry>
            <div>50 characters maximum</div>
          </Space>
          <div>
            <Create>
              <CreateList onClick={this.handleSubmit}>Create</CreateList>
            </Create>
          </div>
        </Modal>
      </Page>
    );
  }
}

export default CreateModal;
