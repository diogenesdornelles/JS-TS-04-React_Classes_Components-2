import React from 'react';
import '../../css/PostIt.css';
import { Textarea, Input } from '@mui/joy';
import 'animate.css';
import PropTypes from 'prop-types';

class PostIt extends React.Component {
  state = {
    isStateSetted: false
  };

  // content, type, title, outLineColor, bgColor, id
  static getDerivedStateFromProps(props, state) {
    if (
      !state.isStateSetted &&
      (props.content !== state.content ||
        props.type !== state.type ||
        props.title !== state.title ||
        props.bgColor !== state.bgColor ||
        props.id !== state.id ||
        props.outLineColor !== state.outLineColor)
    ) {
      return {
        content: props.content,
        type: props.type,
        title: props.title,
        bgColor: props.bgColor,
        id: props.id,
        outLineColor: props.outLineColor,
        isStateSetted: true
      };
    }
    return null;
  }

  getContainers = () => {
    const containersString = localStorage.getItem('containers');
    if (containersString) {
      const parsedContainers = JSON.parse(containersString);
      return parsedContainers;
    }
    return null;
  };

  saveChanges = (id, key, value) => {
    const containers = this.getContainers();
    containers.forEach((container) => {
      if (container.id === id) {
        container[key] = value;
      }
    });
    this.saveContainers(containers);
  };

  saveContainers = (containers) => {
    setTimeout(() => {
      localStorage.setItem('containers', JSON.stringify(containers));
    }, 500);
  };

  handleBlur = (e) => {
    const { id } = this.state;
    const key = e.target.name;
    const value = e.target.value;
    this.saveChanges(id, key, value);
  };

  handleChangeOutLineColor = (e) => {
    this.setState({ outLineColor: e.target.value });
  };

  handleChangeBgColor = (e) => {
    this.setState({ bgColor: e.target.value });
  };

  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value === '' ? '' : e.target.value });
  };

  handleChangeContent = (e) => {
    this.setState({ content: e.target.value === '' ? '' : e.target.value });
  };

  handleDelete = () => {
    const { id } = this.state;
    this.props.delete(id);
  };

  render() {
    const { content, type, title, outLineColor, bgColor, id } = this.state;
    const { _ref, registration } = this.props;
    return (
      <div
        className="text-gray-600 text-base bg-white rounded-lg p-3 flex flex-col gap-y-1 shadow-lg relative justify-start"
        ref={_ref}
        style={{
          border: `2px solid ${outLineColor}`,
          background: `${bgColor}`,
          height: `-webkit-fill-available`
        }}
        id={id}>
        <p
          className="w-12 h-12 text-center text-3xl leading-8 rounded-full cursor-pointer hover:text-blue-700 hover:font-extrabold transition-all self-end"
          onClick={this.handleDelete.bind(this)}
          name={id}>
          X
        </p>
        <p className="text-xs text-gray-600">Title</p>
        <Input
          placeholder="Title"
          variant="outlined"
          color="neutral"
          onChange={this.handleChangeTitle}
          value={title}
          id={id}
          name="title"
          onBlur={this.handleBlur}
        />
        <div className="flex gap-x-4 p-2">
          <div className="flex flex-col">
            <p className="text-xs text-gray-600">Outline color</p>
            <input
              type="color"
              className="primary_color outline-none rounded-full bg-transparent border-none p-0"
              value={outLineColor}
              onChange={this.handleChangeOutLineColor}
              id={id}
              name="outLineColor"
              onBlur={this.handleBlur}
            />
          </div>
          <div className="flex flex-col">
            <p className="text-xs text-gray-600">Background color</p>
            <input
              type="color"
              className="primary_color outline-none rounded-full bg-transparent border-none p-0"
              value={bgColor}
              onChange={this.handleChangeBgColor}
              id={id}
              name="bgColor"
              onBlur={this.handleBlur}
            />
          </div>
        </div>
        <p className="text-xs text-gray-600">Registration</p>
        <Input variant="outlined" color="neutral" disabled value={registration} />
        <p className="text-xs text-gray-600">Id</p>
        <Input placeholder="Type" variant="outlined" color="neutral" disabled value={id} />
        <p className="text-xs text-gray-600">Type</p>
        <Input placeholder="Type" variant="outlined" color="neutral" disabled value={type} />
        <p className="text-xs text-gray-600">Content</p>
        <Textarea
          color="neutral"
          placeholder="Type here..."
          variant="outlined"
          value={content}
          onChange={this.handleChangeContent}
          className="mb-2"
          id={id}
          name="content"
          onBlur={this.handleBlur}
        />
      </div>
    );
  }
}

export default PostIt;

PostIt.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  color: PropTypes.string,
  registration: PropTypes.string,
  _ref: PropTypes.object,
  outLineColor: PropTypes.string,
  content: PropTypes.string,
  bgColor: PropTypes.string,
  type: PropTypes.string,
  delete: PropTypes.func,
  height: PropTypes.number
};
