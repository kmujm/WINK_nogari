import firebase from '../firebase-manager';

const db = firebase.firestore();


export async function getWordGameCategory() {
  const category = await db.collection("game").doc("category").get();
  return category.data();
}

export async function getPlayers(roomId) {
  const players = await db.collection('game').doc(roomId).get();
  return players.data();
}

export async function getPlayersOnTrigger(roomId, callback) {
  db.collection("game").doc(roomId).onSnapshot((doc) => {
    callback(doc.data());
  });
}



export async function updateGameState(roomNumber, state, stateValue) {
  const room = await getPlayers(roomNumber);
  if (room) {
    await db.collection("game").doc(`${roomNumber}`).update({
      wordGame: {
        ...room.wordGame,
        [state]: stateValue,
      }
    });
  }
}


export async function setCategory(roomNumber, category) {
  console.log(roomNumber);
  await db.collection("game").doc(`${roomNumber}`).update({
    wordGame: {
      category: category,
      isFinished: false,
    }
  });
}


export async function updateUserData(roomNumber,data) {
  await db.collection("game").doc(roomNumber).update({
    players: data
  })
}

