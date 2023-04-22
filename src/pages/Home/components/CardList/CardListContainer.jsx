import { Button, Select, TextInput } from 'flowbite-react';
import React from 'react';
import CardList from './CardList';

const gridStyle = {
  perPage2: {
    className:
      'grid grid-cols-1 md:grid-cols-2 w-11/12 sm:w-10/12 lg:w-8/12 2xl:w-5/12 m-auto gap-y-12 gap-x-2 p-4 justify-items-center mt-8',
    style: {
      // gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    }
  },
  perPage4: {
    className:
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-8/12 m-auto gap-y-12 gap-x-2 p-4 justify-items-center mt-8',
    style: {
      // gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    }
  },
  perPage5: {
    className:
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-11/12 sm:w-10/12 lg:w-9/12 2xl:w-9/12 m-auto gap-y-12 gap-x-2 p-4 justify-items-center mt-8',
    style: {
      // gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    }
  }
};

class CardListContainer extends React.Component {
  state = {
    cardsPerPage: 2,
    search: '',
    loadAll: false
  };

  handleChangeSelect = (e) => {
    this.setState({
      cardsPerPage: e.target.value
    });
  };

  handleChangeInput = (e) => {
    this.setState({ search: e.target.value });
  };

  loadAll = () => {
    this.setState({ loadAll: true, cardsPerPage: 4 });
  };

  loadSome = () => {
    this.setState({ loadAll: false });
  };

  render() {
    const { cardsPerPage, search, loadAll } = this.state;
    const perPage = `perPage${cardsPerPage}`;
    return (
      <div>
        <div className="shadow-lg rounded-lg bg-slate-50 mt-10">
          <div className="flex gap-y-2 flex-col md:flex-row h-36 md:justify-center items-center gap-x-2">
            <h2 className="text-4xl w-[150px] text-slate-400 text-center">Cardlist</h2>
            <Select
              id="cardsVisualizedsPerView"
              required={false}
              onChange={this.handleChangeSelect}
              color={'white'}
              className="w-[100px] self-center bg-white">
              {cardsPerPage === 2 ? (
                <option defaultValue value="2" className="text-center">
                  2
                </option>
              ) : (
                <option value="2" className="text-center">
                  2
                </option>
              )}
              {cardsPerPage === 4 ? (
                <option defaultValue value="4" className="text-center">
                  4
                </option>
              ) : (
                <option value="4" className="text-center">
                  4
                </option>
              )}
              {cardsPerPage === 5 ? (
                <option defaultValue value="5" className="text-center">
                  5
                </option>
              ) : (
                <option value="5" className="text-center">
                  5
                </option>
              )}
            </Select>
            <div className="w-[400px]">
              <TextInput
                id="search"
                type="search"
                placeholder="Make your search"
                required={true}
                value={search}
                onChange={this.handleChangeInput}
              />
            </div>
            <Button.Group>
              <Button gradientMonochrome="info" onClick={this.loadAll}>
                All cards
              </Button>
              <Button gradientMonochrome="info" onClick={this.loadSome}>
                Show {cardsPerPage}
              </Button>
            </Button.Group>
          </div>
          <div
            id="card-list"
            className={gridStyle[perPage].className}
            style={gridStyle[perPage].style}>
            <CardList cardsPerPage={parseInt(cardsPerPage)} search={search} loadAll={loadAll} />
          </div>
        </div>
      </div>
    );
  }
}

export default CardListContainer;
