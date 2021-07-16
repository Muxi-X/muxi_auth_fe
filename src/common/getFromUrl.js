function getQueryVariable(variable) {
  let query = window.location.href.substring(1);
  let vars = query.split('&');
  let var_ex = vars[0].split('?');
  vars.push(var_ex[1]);
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (pair[0] === variable) {
      return pair[1];
    }
  }
  return null;
}
export default getQueryVariable;
