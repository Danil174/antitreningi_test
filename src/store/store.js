import { observable, runInAction, action, makeObservable, computed } from 'mobx';
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

const costReducer = (items) => {
  return items.reduce((acc, it) => {
    acc = acc + it.price * it.amount;
    return acc;
  }, 0);
};


class cartStore {
  token = null;
  products = [];
  categories = [];
  filterRange = [0, 0];
  authorizationStatus = AuthorizationStatus.NO_AUTH;
  loadError = false;
  loginError = false;
  loadCategoriesError = false;

  constructor() {
    makeObservable(this, {
      products: observable,
      categories: observable,
      authorizationStatus: observable,
      loadError: observable,
      loginError: observable,
      loadCategoriesError: observable,
      filterRange: observable,
      getToken: action,
      fetchProducts: action,
      addproduct: action,
      fetchCategories: action,
      putCategories: action,
      setFilterRangeValue: action,
      productsCost: computed,
      boughtProductsCost: computed,
      filteredProducts: computed,
      maxPrice: computed
    });

    this.getToken = this.getToken.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.patchProduct = this.patchProduct.bind(this);
    this.setFilterRangeValue = this.setFilterRangeValue.bind(this);
    this.putCategories = this.putCategories.bind(this);
  }

  get filteredProducts() {
    if (this.filterRange[1] === 0) {
      return this.products;
    }
    return this.products
      .slice()
      .filter(it => this.filterRange[0] <= Number(it.price) && this.filterRange[1] >= Number(it.price));
  }

  get productsCost() {
    return costReducer(this.products);
  }

  get boughtProductsCost() {
    const items = this.products.slice().filter(it => it.isBought);
    return costReducer(items);
  }

  get notBoughtProductsCost() {
    return this.products.reduce((acc, it) => {
      if (!it.isBought) {
        acc = acc + it.price * it.amount;
      }
      return acc;
    }, 0);
  }

  get maxPrice() {
    if (this.products.length === 0) {
      return 0;
    }
    const priceArr = this.products.map(it => Number(it.price));
    const max = Math.max(...priceArr);
    return max;
  }

  setFilterRangeValue(range) {
    this.filterRange = range;
  }

  updateProducts(product) {
    this.products = [ ...this.products, product ];
  }

  deleteProductInStore(id) {
    this.products = this.products.filter(it => it.id !== id);
  }

  patchProductInStore(product) {
    const idx = this.products.findIndex(it => it.id === product.id);
    this.products = [...this.products.slice(0, idx), product, ...this.products.slice(idx + 1)];
  }

  async getToken(email, password) {
    const body = JSON.stringify({
      email,
      password
    });
    try {
      const data = await fetchData(`api/login`, 'POST', null, body);
      runInAction(() => {
        this.token = data.token;
        this.authorizationStatus = AuthorizationStatus.AUTH;
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

  async addproduct(data) {
    const serverData = {};
    for (const [key, value] of data.entries()) {
      serverData[key] = value;
    }
    const body = JSON.stringify(serverData);
    try {
      const data = await fetchData(`/api/goods`, 'POST', this.token, body);
      runInAction(() => {
        this.updateProducts(data);
      });
    } catch (e) {
      runInAction(() => {
        console.log(e);
      });
    }
  }

  async deleteProduct(id) {
    const body = JSON.stringify({ id });
    try {
      await fetchData(`/api/goods/${id}`, 'DELETE', this.token, body);
      runInAction(() => {
        this.deleteProductInStore(id);
      });
    } catch (e) {
      runInAction(() => {
        console.log(e);
      });
    }
  }

  async patchProduct(id) {
    const body = JSON.stringify({ id });
    try {
      const data = await fetchData(`/api/goods/${id}`, 'PATCH', this.token, body);
      runInAction(() => {
        this.patchProductInStore(data);
      });
    } catch (e) {
      runInAction(() => {
        console.log(e);
      });
    }
  }

  async fetchCategories() {
    try {
      const data = await fetchData(`api/categories`, 'GET', this.token);
      runInAction(() => {
        this.categories = data;
      });
    } catch (e) {
      runInAction(() => {
        this.loadCategoriesError = true;
      });
    }
  }

  async putCategories(arr) {
    const body = JSON.stringify({ arr });
    try {
      const data = await fetchData(`api/categories`, 'PUT', this.token, body);
      runInAction(() => {
        this.categories = data;
      });
    } catch (e) {
      runInAction(() => {
        console.log(e);
      });
    }
  }
}

const storeInstance = new cartStore();
export default storeInstance;
