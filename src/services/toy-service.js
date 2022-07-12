import { utilService } from './util-service.js'
import axios from 'axios'

const TOY_URL = (process.env.NODE_ENV !== 'development')
  ? '/api/toy/'
  : '//localhost:3030/api/toy'

export const toyService = {
  getLabels,
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

function getLabels() {
  return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
}

function query(filterBy) {
  return axios.get(TOY_URL, { params: filterBy }).then(res => res.data)
}

function getById(toyId) {
  return axios.get(TOY_URL + toyId).then(res => res.data)
}

function remove(toyId) {
  return axios.delete(TOY_URL + toyId).then((res) => res.data)
}

function save(toy) {
  const savedToy = toy._id
    ? axios.put(TOY_URL, toy).then(res => res.data)
    : axios.post(TOY_URL, toy).then((res) => res.data)
  return savedToy
}

function getEmptyToy() {
  return {
    _id: '',
    name: '',
    price: 0,
    labels: [],
    createdAt: 0,
    inStock: true
  }
}