function getQueryVariable(variable) {
  // 获取完整的 hash 部分（包括 # 后面的所有内容）
  const hash = window.location.hash;

  // 如果 hash 中包含 ?，则从 hash 中解析参数
  if (hash.includes('?')) {
    const queryString = hash.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(variable);
  }

  // 如果 hash 中没有找到，则尝试从普通 URL 参数中获取
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(variable);
}

export default getQueryVariable;
