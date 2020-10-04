
export const makeAPICall = (params, successCallback) => {
  return fetch(params.url, {
    headers: {
      "Accept-Encoding": "gzip"
    },
    method: params.method || 'GET',
    data: params.data
  })
    .then((response) => response.json())
    .then((data) => {
      if (successCallback) {
        successCallback(data)
      }
    })
    .catch((err) => {
      alert("Error : " + err)
    })
}

export const createStckData = (item) => {
  let stockData = item.split(",")
  if (stockData && stockData.length) {
    return {
      x: new Date(+stockData[0]),
      y: [stockData[1], stockData[2], stockData[3], stockData[4]]
    }
  }
}
