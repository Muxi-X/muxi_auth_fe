import { name } from 'store/storages/cookieStorage';

function getQueryVariable(name) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return null;
}
export default getQueryVariable;
