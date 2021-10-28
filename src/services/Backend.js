import API from '@services/API';
import AccessToken from '@services/AccessToken';

class Backend {
  login = async (credentials) => {
    const response = await API.send('POST', '/login', credentials, false);
    if (response.status === 200) {
      AccessToken.set(response.data.token);
    }
    return response;
  }

  logout = async () => {
    const response = await API.send('POST', '/logout', null, true);
    if (response.status === 200)
      AccessToken.remove();
    return response;
  }

  add = async (payload) => {
    const response = await API.send('POST', '/name', payload, true);
    return response;
  }

  edit = async (payload, id) => {
    const response = await API.send('PUT', '/name/' + id, payload, true);
    return response;
  }

  delete = async (id) => {
    const response = await API.send('DELETE', '/name/' + id, null, true);
    return response;
  }


  fetcher = async (url, auth = true) => {
    const response = await API.send('GET', url, false, auth);
    return response;
  };
}

const service = new Backend();
export default service;
