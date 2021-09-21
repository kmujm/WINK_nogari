import firebase from './firebase-manager';
import {getRoomdata} from "./rooms";

const db = firebase.firestore();

export async function getRoomInfo(roomNumber, callback) {
  db.collection("rooms").doc(roomNumber).onSnapshot((doc) => {
    callback(doc.data());
  });
}

export async function addMember(roomNumber, userId) {
  const userArray = await getRoomdata(roomNumber);
  userArray.members.push(userId);
  firebase.firestore().collection("rooms").doc(roomNumber).update({
    members : userArray.members
  });
}