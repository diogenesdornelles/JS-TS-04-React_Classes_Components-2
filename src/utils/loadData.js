import apis from '../services/apis.js';
import URLS from '../configs/configs.js';

const loadData = async () => {
  try {
    const payloadPhotos = apis(URLS.photos).photos.get();
    const payloadUsers = apis(URLS.users).users.get();
    const data = await Promise.all([payloadPhotos, payloadUsers]);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default loadData;
