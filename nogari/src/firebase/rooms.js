import firebase from './firebase-manager';

export async function createRoom() {
    const res = await firebase.firestore().collection('rooms').add({ // 닉네임+프로필 데이터 추가

    });
    return res.id;
}

export async function getRoomdata(roomNumber) {
    const room = await firebase.firestore().collection("rooms").doc(roomNumber).get();
    return room.data() ?? null;
}