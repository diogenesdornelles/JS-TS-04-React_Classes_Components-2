import { Button } from '@mui/joy';
import React from 'react';
import PostIts from './PostIts';

class PostItsArea extends React.Component {
  state = {
    showNewContainer: false
  };

  postIt = React.createRef();

  handleClick = (e) => {
    if (e.target.name === 'new-container') {
      this.setState({ showNewContainer: !this.state.showNewContainer });
      e.target.innerText = e.target.innerText === 'PostIts' ? 'Hide PostIts' : 'PostIts';
    }
  };

  render() {
    const { showNewContainer } = this.state;
    return (
      <div className="h-screen w-screen bg-gray-50" ref={this.postIt}>
        <div className="flex flex-col w-full items-center p-4 bg-slate-400">
          <Button
            variant="solid"
            color="neutral"
            onClick={this.handleClick}
            className="w-10/12 md:w-2/12 m-auto"
            name="new-container">
            PostIts
          </Button>
          <div>{showNewContainer && <PostIts />}</div>
        </div>
      </div>
    );
  }
}

export default PostItsArea;
