import axios from "axios"
const API_KEY = 'f108452aaa53b430589723851d6d30f2'
const HASH = '5db59286421571a810c7a9b757676cb3'

const api = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public`,
  params: {
    apikey: API_KEY,
    hash: HASH,
    ts: 1,
    limit: 10
  }
})

export default api;