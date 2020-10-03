import axios from 'axios'

export const makeAPICall = (params, successCallback)=>{
    return fetch(params.url, {
        headers:{
            // "Accept­Encoding": "gzip"
        },
        method: params.method || 'GET',
        data : params.data
      })
      .then((response)=> response.json())
      .then((data)=>{
        if(successCallback){
            successCallback(data)
        }
      })
      .catch((err)=>{
        alert("Error : "+err)
      })
}
