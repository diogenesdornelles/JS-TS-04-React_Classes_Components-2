import apis from '../services/apis.js';
import URLS from '../configs/configs.js';

const getAdvice = async () => {
  try {
    const payload = await apis(URLS.advice).advice.get();
    const { advice } = payload.data.slip;
    return advice;
  } catch (e) {
    console.log(e);
  }
};

export default getAdvice;
