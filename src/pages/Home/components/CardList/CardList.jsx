import { Card, Pagination } from 'flowbite-react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import React from 'react';
import loadData from '../../../../utils/loadData';
import Heart from './Heart';
import ModalCard from './ModalCard';

const cards = 20;

class CardList extends React.Component {
  state = {
    photos: [],
    allPhotos: [],
    users: [],
    allUsers: [],
    currentPage: 1,
    show: false,
    hearts: Array(cards).fill(0),
    comments: Array(cards).fill(''),
    cards,
    cardsPerPage: 0,
    search: '',
    showPagination: true,
    loadAll: false
  };

  observeds = [];
  observer = null;

  static getDerivedStateFromProps(props, state) {
    if (
      props.cardsPerPage !== state.cardsPerPage ||
      props.search !== state.search ||
      props.loadAll !== state.loadAll
    ) {
      return {
        cardsPerPage: props.cardsPerPage,
        search: props.search,
        loadAll: props.loadAll
      };
    }
    return null;
  }

  async componentDidMount() {
    const { currentPage, cards, cardsPerPage } = this.state;
    const [photos, users] = await loadData();
    this.setState({
      allPhotos: photos.data.slice(0, cards),
      photos: photos.data.slice(cardsPerPage * (currentPage - 1), cardsPerPage * currentPage),
      allUsers: [...users.data, ...users.data],
      users: users.data.slice(cardsPerPage * (currentPage - 1), cardsPerPage * currentPage)
    });
  }

  componentDidUpdate(prevState) {
    const { cardsPerPage, search } = this.state;
    if (prevState.cardsPerPage !== cardsPerPage) {
      this.visualizationChange();
      return;
    }
    if (prevState.search !== search) {
      this.handleSearch(search);
    }
  }

  openModal = (e) => {
    const id = parseInt(e.target.getAttribute('data-id'));
    const title = e.target.getAttribute('data-title');
    const name = e.target.getAttribute('data-name');
    const url = e.target.getAttribute('data-url');
    const index = id - 1;
    this.setState({
      show: !this.state.show,
      title,
      index,
      name,
      url,
      heart: this.state.hearts[index],
      comment: this.state.comments[index]
    });
  };

  transformCard = (e) => {
    if (e.target.id === 'card' && !this.state.show) e.target.classList.add('scale-110', 'z-50');
  };

  originalCard = (e) => {
    e.target.classList.remove('scale-110', 'z-50');
  };

  closeModal = () => {
    this.setState({ show: !this.state.show });
  };

  giveAHeart = (e) => {
    const index = e.target.getAttribute('data-photo-index').split('-').pop();
    const { hearts } = this.state;
    hearts[index] += 1;
    this.setState({ hearts, heart: this.state.hearts[index] });
  };

  registerComment = (e) => {
    const index = e.target.getAttribute('data-comment-index').split('-').pop();
    const { comments } = this.state;
    const userComment = e.target.getAttribute('data-comment');
    comments[index] = userComment;
    this.setState({ comments, comment: userComment });
  };

  handleEvent = (e) => {
    if (e) {
      switch (e.target.id) {
        case 'close-the-modal':
          this.closeModal();
          break;
        case 'leave-a-comment':
          this.registerComment(e);
          break;
        case 'give-a-heart':
          this.giveAHeart(e);
          break;
        case 'the-modal':
          this.setState({ show: true });
          break;
        default:
          break;
      }
    }
  };

  visualizationChange = () => {
    const { cardsPerPage } = this.state;
    this.setState((prevState) => {
      return {
        photos: prevState.allPhotos.slice(
          cardsPerPage * (prevState.currentPage - 1),
          prevState.currentPage * cardsPerPage
        ),
        users: prevState.allUsers.slice(
          cardsPerPage * (prevState.currentPage - 1),
          prevState.currentPage * cardsPerPage
        ),
        showPagination: true
      };
    });
  };

  onPageChange = (e) => {
    const currentPage = e;
    const { cardsPerPage } = this.state;
    this.setState((prevState) => {
      return {
        currentPage,
        photos: prevState.allPhotos.slice(cardsPerPage * (currentPage - 1), e * cardsPerPage),
        users: prevState.allUsers.slice(cardsPerPage * (currentPage - 1), e * cardsPerPage)
      };
    });
  };

  handleSearch = (search) => {
    if (!search) {
      this.visualizationChange();
      return;
    }
    const { allUsers, allPhotos } = this.state;
    const filteredUsers = allUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ? user : null
    );
    const filteredPhotos = [];
    filteredUsers.forEach((user) => {
      filteredPhotos.push(allPhotos[user.id]);
    });
    this.setState({
      users: filteredUsers,
      photos: filteredPhotos,
      showPagination: false
    });
  };

  render() {
    let {
      allPhotos,
      allUsers,
      showPagination,
      photos,
      users,
      show,
      title,
      name,
      index,
      heart,
      comment,
      url,
      currentPage,
      cards,
      cardsPerPage,
      loadAll
    } = this.state;
    const pages = Math.ceil(cards / Math.trunc(cardsPerPage));
    if (loadAll) {
      photos = allPhotos;
      users = allUsers;
      showPagination = false;
    }
    return (
      <>
        <ModalCard
          show={show}
          url={url}
          heart={heart}
          comment={comment}
          _title={title}
          _name={name}
          index={index}
          onEvent={this.handleEvent}
        />
        {photos.length > 0 &&
          photos.map((photo, i) => (
            <div
              className="max-w-xs scale-100 transition-all cursor-pointer"
              key={nanoid(7)}
              onMouseOver={this.transformCard}
              onMouseOut={this.originalCard}
              onClick={this.openModal}
              data-title={photo.title}
              data-name={users[i].name}
              data-url={photo.url}
              data-id={photo.id}
              id="card"
              ref={this.observeds[i]}>
              <div
                className="flex gap-x-12 relative translate-y-10 translate-x-5 opacity-40 rounded-full"
                name="heart">
                <Heart />
              </div>
              <Card imgAlt="..." imgSrc={photo.url} className="pointer-events-none">
                <h5 className="text-base font-bold tracking-tight text-gray-600 md:text-2xl pointer-events-none">
                  {users[i].name}
                </h5>
                <p className="text-xs font-normal text-gray-700 md:text-sm pointer-events-none">
                  {users[i].email}
                </p>
                <p className="text-sm font-normal text-gray-700 md:text-base pointer-events-none">
                  Message: {photo.title}
                </p>
              </Card>
            </div>
          ))}
        <div className="flex items-center justify-center text-center m-auto col-span-full">
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              layout="pagination"
              onPageChange={this.onPageChange}
              showIcons={true}
              totalPages={pages}
              previousLabel="Anterior"
              nextLabel="Seguinte"
            />
          )}
        </div>
      </>
    );
  }
}

export default CardList;

CardList.propTypes = {
  cardsPerPage: PropTypes.number,
  search: PropTypes.string,
  loadAll: PropTypes.bool
};
