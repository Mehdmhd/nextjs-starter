import AccessToken from './AccessToken';
import Router from 'next/router';

class API {
  getDomain() {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  async send(method, route, data = null, auth = true, multiform = false) {
    const api = this.getDomain();

    const headers = !multiform ? {
      'Accept': 'application/json',
      'App-Origin': 'Panel',
      'Content-Type': 'application/json',
    } : {};

    if (auth) {
      let accessToken = AccessToken.get();
      if (!accessToken) {
        await Router.push('/login');
        return {
          data: null,
          status: -1,
        };
      }
      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    }

    if (method !== 'GET' && data && !multiform) data = JSON.stringify(data);
    else if (multiform) data;
    else data = null;

    try {
      const response = await fetch(api + route, {
        headers,
        method,
        body: data,
      });

      if (response.status === 401) {
        AccessToken.remove();
        await Router.push('/login');
        return {
          data: null,
          status: 401,
        };
      }

      return {
        data: await response.json(),
        status: response.status !== 200 ? -1 : 200,
      };
    } catch (e) {
      console.log('API error:', e);
      return {
        data: null,
        status: -1,
      };
    }
  }
}

const service = new API();
export default service;
