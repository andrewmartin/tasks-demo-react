import axios from 'axios';

class Fetch {
  constructor() {
    this.instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    this.instance.defaults.baseURL = process.env.REACT_APP_API_ROOT;
  }
}

export default new Fetch();
