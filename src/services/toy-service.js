import { storageService } from './async-storage.service.js'
import { utilService } from './util-service.js'

const KEY = 'toyDB'

export const toyService = {
  query,
  getById,
  remove,
  save,
  getEmptyToy,
}

var gToys = _createToys()
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']

function query() {
  return storageService.query(KEY)
}

function getById(id) {
  return storageService.get(KEY, id)
}

function remove(id) {
  return storageService.remove(KEY, id)
}

function save(toy) {
  const savedToy = toy._id
    ? storageService.put(KEY, toy)
    : storageService.post(KEY, toy)
  return savedToy
}

function getEmptyToy() {
  return {
    _id: 't101',
    name: 'Talking Doll',
    price: 123,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    createdAt: 1631031801011,
    inStock: true
  }
}

function _createToys() {
  var toys = JSON.parse(localStorage.getItem(KEY))
  if (!toys || !toys.length) {
    toys = [
      _createToy('Puki',300,false),
      _createToy('Muki',100,true),
      _createToy('Shuki',150,true),
    ]
    localStorage.setItem(KEY, JSON.stringify(toys))
  }
  return toys
}

function _createToy(name,price,inStock) {
  return {
    _id: utilService.makeId(),
    name,
    price,
    labels:['On wheel','Art'],
    createdAt:Date.now(),
    inStock
  }
}