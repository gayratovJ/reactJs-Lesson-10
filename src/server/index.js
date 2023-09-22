import axios from "axios"

const request  =axios.create({
  baseURL:"https://64e9cf89bf99bdcc8e66fc65.mockapi.io/ex/",
  timeout:1000,
})
export default request