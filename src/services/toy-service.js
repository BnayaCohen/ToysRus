import { utilService } from './util-service.js'
import axios from 'axios'

// const KEY = 'toyDB'
const TOY_URL = '/api/toy/'

export const toyService = {
  getLabels,
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

// var gToys = _createToys()

function getLabels() {
  return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']
}

function query(filterBy) {
  // return storageService.query(KEY)
  return axios.get(TOY_URL, { params: filterBy }).then(res => res.data)
}

function getById(toyId) {
  // return storageService.get(KEY, id)
  return axios.get(TOY_URL + toyId).then(res => res.data)
}

function remove(toyId) {
  // return storageService.remove(KEY, id)
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

// function _createToys() {
//   var toys = JSON.parse(localStorage.getItem(KEY))
//   if (!toys || !toys.length) {
//     toys = [
//       _createToy('Puki', 300, false),
//       _createToy('Muki', 100, true),
//       _createToy('Shuki', 150, true),
//     ]
//     localStorage.setItem(KEY, JSON.stringify(toys))
//   }
//   return toys
// }

// function _createToy(name, price, inStock) {
//   return {
//     _id: utilService.makeId(),
//     name,
//     price,
//     labels: ['On wheel', 'Art'],
//     createdAt: Date.now(),
//     inStock
//   }
// }