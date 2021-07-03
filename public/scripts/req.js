async function postRequest(url, method, item) {
  let data = JSON.stringify(item);
  let config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  let request = await axios(config).then(function (response) {
    return response.data;
  });
  return request;
}

