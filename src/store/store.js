import { observable, runInAction, action, makeObservable } from 'mobx';
import { AuthorizationStatus } from "../const.js";

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.status);
  }
};

const fetchData = (endpoint, method = 'GET', auth = null, body = null, headers = new Headers()) => {
  if (auth) {
    headers.append(`Authorization`, auth);
  }

  headers.append('Content-Type', 'application/json');

  return fetch(endpoint, { method, body, headers })
    .then(checkStatus)
    .then((res) => res.json());
};


class cartStore {
  token = '';
  products = [];
  authorizationStatus = AuthorizationStatus.NO_AUTH;
  loadError = false;
  loginError = false;

  constructor() {
    makeObservable(this, {
      token: observable,
      products: observable,
      authorizationStatus: observable,
      loadError: observable,
      loginError: observable,
      getToken: action,
      fetchProducts: action,
    });

    this.getToken = this.getToken.bind(this);
  }

  async getToken(email, password) {
    const body = JSON.stringify({
      email,
      password
    });
    try {
      const data = await fetchData(`api/login`, 'POST', null, body);
      runInAction(() => {
        this.toke = data.token;
        this.authorizationStatus = AuthorizationStatus.AUTH;
        this.fetchProducts();
      });
    } catch (e) {
      runInAction(() => {
        this.loginError = true;
      });
    }
  }

  async fetchProducts() {
    try {
      const data = await fetchData(`api/goods`, 'GET', this.token);
      runInAction(() => {
        this.products = data;
      });
    } catch (e) {
      runInAction(() => {
        this.loadError = true;
      });
    }
  }
}

const storeInstance = new cartStore();
export default storeInstance;
