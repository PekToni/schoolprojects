import firebase from '../config/firebase'

const db = firebase.ref('/messages')

const create = (message) => {
    return db.push(message)
}

const getAll = () => {
    return db
}

export default {create, getAll}