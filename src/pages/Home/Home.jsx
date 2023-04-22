import React from 'react';
import Advice from './components/Advice/Advice';
import CardListContainer from './components/CardList/CardListContainer';
import Nav from './components/Nav/Nav';
import PostItsArea from './components/PostIts/PostItsArea';
import ToDo from './components/ToDo/ToDo';
import './css/Home.css';

class Home extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Nav />
        <Advice />
        <CardListContainer />
        <ToDo />
        <PostItsArea />
      </div>
    );
  }
}

export default Home;
