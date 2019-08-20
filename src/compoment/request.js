export default function request (method, url, body) {
    method = method.toUpperCase();
    if (method === 'GET') {
      // fetch的GET不同意有body，參数仅仅能放在url中
      body = undefined;
    } else {
      body = body && JSON.stringify(body);
    }
  
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
      },
      body
    })
      .then((res) => {
        if (res.status === 401) {
          // hashHistory.push('/login');
          return Promise.reject('Unauthorized.');
        } else {
          const token = res.headers.get('access-token');
          if (token) {
            sessionStorage.setItem('access_token', token);
          }
          return res.json();
        }
      });
  }
  
  export const get = url => request('GET', url);
  export const Post = (url, body) => request('POST', url, body);
  export const put = (url, body) => request('PUT', url, body);
  export const del = (url, body) => request('DELETE', url, body);