import { Label, Modal, Textarea } from 'flowbite-react';
import PropTypes from 'prop-types';
import React from 'react';
import '../../css/Modal.css';
import Comment from './Comment';
import Heart from './Heart';

class ModalCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this.content = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.show !== state.show ||
      props.heart !== state.heart ||
      props.comment !== state.comment
    ) {
      return {
        show: props.show,
        heart: props.heart,
        comment: props.comment
      };
    }
    return null;
  }

  closeModal = (e) => {
    this.props.onEvent(e);
  };

  giveHeart = (e) => {
    this.props.onEvent(e);
  };

  // update a comment by using Ref
  leaveComment = (e) => {
    e.target.setAttribute('data-comment', this.content.current.value);
    this.props.onEvent(e);
    this.content.current.value = '';
  };

  preventClose = (e) => {
    this.props.onEvent(e);
  };

  render() {
    const { _title, _name, index, url } = this.props;
    const { show, heart, comment } = this.state;
    return (
      <Modal
        id="close-the-modal"
        popup={true}
        size="5xl"
        dismissible={true}
        show={show}
        onClose={this.closeModal.bind(this)}
        style={{ backgroundColor: '#00100078' }}
        className="animate__animated animate__animated ">
        <Modal.Header
          style={{
            backgroundColor: '#1B7F79',
            height: '10vh',
            display: 'flex',
            alignItems: 'center'
          }}>
          <div className="flex w-full gap-x-12">
            <p className="text-white">Photo by: {_name}</p>
            <div
              id="give-a-heart"
              className="relative opacity-40 rounded-full cursor-pointer hover:opacity-100"
              data-photo-index={`heart-photo-index-${index}`}
              onClick={this.giveHeart.bind(this)}>
              <Heart />
            </div>
            <p className="text-white text-sm transition-all -ml-9">{heart}</p>
          </div>
        </Modal.Header>
        <Modal.Body className="flex" style={{ height: '70vh' }}>
          <img src={url} alt="" className="h-full " />
          <div className="flex flex-col p-6">
            <p>Title: {_title}</p>
            <Comment />
            <div id="textarea">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your comment" />
              </div>
              <Textarea
                placeholder="Leave a comment..."
                required={true}
                rows={4}
                ref={this.content}
              />
            </div>
            <button
              id="leave-a-comment"
              type="button"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 mt-6"
              onClick={this.leaveComment.bind(this)}
              data-comment-index={`heart-comment-index-${index}`}
              data-comment={''}>
              Leave a comment
            </button>
            <div className="flex flex-col mt-4">
              <p className="text-gray-700 mb-4">Comment: </p>
              <p className="text-gray-700 text-sm">{comment}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#1B7F79' }}>
          <button
            id="close-the-modal"
            type="button"
            className="bg-white text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-24 py-2.5 text-center mr-2 mb-2"
            onClick={this.closeModal.bind(this)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalCard;

ModalCard.propTypes = {
  show: PropTypes.bool,
  url: PropTypes.string,
  comment: PropTypes.string,
  heart: PropTypes.number,
  _title: PropTypes.string,
  _name: PropTypes.string,
  index: PropTypes.number,
  onEvent: PropTypes.func
};
