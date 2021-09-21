import firebase from './firebase-manager';

export async function choiceGame(roomNumber,game) {
    await firebase.firestore().collection('rooms').doc(`${roomNumber}`).update({
        game
    });
}