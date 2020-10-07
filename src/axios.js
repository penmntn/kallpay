// axios
import axios from 'axios'
import setting from './setting'

const baseURL = setting.domain

export default axios.create({
  baseURL: baseURL,
  timeout: 3000,
})
