import firebase from './firebase-manager';

const db = firebase.firestore();

export async function getUserInfo(userId) {
    try{
        const user = await db.collection("users").doc(userId).get();
        return user.data() ?? null;
    }catch (e) {
        return null;
    }

}

export function updateLastConnection(userID) {
    setInterval(async () => { // 유저 접속 시간 주기적으로 받기
        const time = new Date().getTime()
        localStorage.setItem('connection',time)
        await firebase.firestore().collection('users').doc(`${userID}`).update({
            lastConnection : time
        }, {merge:true})
    }, 6000);
}

export async function createUser(nickname, profile) {
    const res = await firebase.firestore().collection('users').add({ // 닉네임+프로필 데이터 추가
        nickname,
        profile,
        badges: [],
        lastConnection: new Date().getTime()
    });
    return res.id;
}
