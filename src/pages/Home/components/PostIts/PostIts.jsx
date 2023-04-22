import { Button } from '@mui/joy';
import React from 'react';
import '../../css/PostItsArea.css';
// import Container from './Container';
import GridLayout from 'react-grid-layout';
import PostIt from './PostIt';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import moment from 'moment';
import { nanoid } from 'nanoid';

class PostIts extends React.Component {
  state = {
    postIts: [],
    refs: [],
    outLineColor: '#3E81F5',
    bgColor: '#FFFFFF',
    maxRowHeigth: 0,
    width: 1200
  };

  cols = 4;

  componentDidMount() {
    const postIts = this.getPostIts();
    this.setState({ postIts }, () => this.setRefs(postIts.length));
  }

  setRefs = (cont) => {
    if (cont > 0) {
      const refs = [];
      for (let i = 0; i < cont; i++) {
        refs.push(React.createRef());
      }
      this.setState({ refs });
    }
  };

  getPostIts = () => {
    const postItsString = localStorage.getItem('postIts');
    if (postItsString) {
      const parsedPostIts = JSON.parse(postItsString);
      return parsedPostIts;
    }
    return [];
  };

  createPostIt = () => {
    const { postIts, outLineColor, bgColor } = this.state;
    const registration = moment().format('DD/MM/YYYY HH:mm:ss');
    const index = postIts.length;
    this.setState(
      (prevState, prevProps) => {
        // console.log(registration);
        return {
          postIts: [
            ...prevState.postIts,
            {
              id: nanoid(8),
              index,
              title: '',
              content: '',
              type: '',
              registration,
              outLineColor,
              bgColor,
              w: 1,
              h: 3,
              x: (this.cols + index) % this.cols,
              y: 0,
              font: 'gray-600'
            }
          ]
        };
      },
      () => {
        this.savePostIts();
        this.setRefs(postIts.length);
        const lastRef = this.state.refs.pop();
        this.moveTo(lastRef.current);
      }
    );
  };

  moveTo = (el) => {
    el.scrollIntoView({
      behavior: 'smooth'
    });
  };

  savePostIts = () => {
    const { postIts } = this.state;
    localStorage.setItem('postIts', JSON.stringify(postIts));
  };

  deleteContainer = (id) => {
    const wannaDelete = confirm('Are you sure you want to delete?');
    if (wannaDelete) {
      const { postIts } = this.state;
      postIts.forEach((container, index) => {
        if (container.id === id) {
          postIts.splice(index, 1);
          alert(`PostIt id ${id} deleted`);
        }
      });
      this.setState({ postIts });
      setTimeout(() => localStorage.setItem('postIts', JSON.stringify(this.state.postIts)), 500);
    }
  };

  handleChangeLayout = (e) => {
    const postItsSaveds = this.getPostIts();
    const changedPostIts = e;
    if (postItsSaveds && changedPostIts.length === postItsSaveds.length) {
      changedPostIts.forEach((changedPostIt) => {
        postItsSaveds.forEach((postItsaved, index) => {
          if (changedPostIt.i === postItsaved.id) {
            postItsSaveds[index].w = changedPostIt.w;
            postItsSaveds[index].h = changedPostIt.h;
            postItsSaveds[index].x = changedPostIt.x;
            postItsSaveds[index].y = changedPostIt.y;
          }
        });
      });
      this.setState({ postIts: postItsSaveds }, () => this.savePostIts());
    }
  };

  render() {
    const { postIts, refs, width } = this.state;
    const layout = postIts.map((container) => {
      const { id, w, h, x, y } = container;
      return {
        i: id,
        x,
        y,
        w,
        h
      };
    });
    return (
      <>
        <div className=" text-white font-mono text-base bg-gray-50 rounded-lg p-3 w-1/2 flex flex-col gap-y-4 mt-8 m-auto">
          <Button color="neutral" onClick={this.createPostIt} variant="solid">
            Create new PostIt
          </Button>
        </div>
        <GridLayout
          className={`absolute layout w-[${width}px]`}
          layout={layout}
          cols={this.cols}
          width={width}
          autoSize={true}
          margin={[20, 30]}
          onLayoutChange={this.handleChangeLayout}>
          {postIts.length > 0 &&
            postIts.map((container, index) => (
              <div key={container.id}>
                <PostIt
                  content={container.content}
                  title={container.title}
                  registration={container.registration}
                  id={container.id}
                  outLineColor={container.outLineColor}
                  bgColor={container.bgColor}
                  index={container.index}
                  _ref={refs[index]}
                  delete={this.deleteContainer}
                />
              </div>
            ))}
        </GridLayout>
      </>
    );
  }
}

export default PostIts;
