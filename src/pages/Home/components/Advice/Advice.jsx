import React from 'react';
import getAdvice from '../../../../utils/getAdvice';

class Advice extends React.Component {
  state = {
    message: ''
  };

  newAdvice = async () => {
    const advice = await getAdvice();
    this.setState({ message: advice });
  };

  async componentDidMount() {
    const advice = await getAdvice();
    this.setState({ message: advice });
  }

  render() {
    const { message } = this.state;
    return (
      <div className="w-full mt-16 shadow-md p-6 bg-orange-500">
        <div className="flex gap-1 w-11/12 justify-center md:w-8/12 m-auto md:gap-12">
          <p className="bg-blue-600 text-white text-2xl p-4">My daily advice</p>
          <p data-testid="message" className="bg-blue-600 text-white text-2xl p-4">
            {message}
          </p>
          <button
            className="border-2 border-blue-600 rounded px-4 bg-white hover:bg-gray-100 text-orange-500 font-bold"
            onClick={this.newAdvice}>
            Get a new advice
          </button>
        </div>
      </div>
    );
  }
}

export default Advice;
