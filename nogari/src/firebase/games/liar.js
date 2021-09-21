import firebase from '../firebase-manager';

const db = firebase.firestore();

export async function setWord(roomNumber, word) {
    console.log(roomNumber);
    await db.collection("game").doc(`${roomNumber}`).update({
        liar:{
            liarword: word
        }
    });
}

export async function updateUserData(roomNumber,data) {
    await db.collection("game").doc(roomNumber).update({
        players: data
    })
}
