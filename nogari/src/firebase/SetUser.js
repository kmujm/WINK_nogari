import firebase from "./firebase-manager";
import {getUserInfo} from "./users";
import {getGameData} from "./game-data";

const db = firebase.firestore()

export async function getNickname(roomNumber) {
    const res = await db.collection('rooms').doc(roomNumber).get().then(async (doc) => {
        if (doc.exists) {
            const docData = doc.data();
            const memberList = docData.members;
            let members = [];
            for (const member of memberList) {
                const memberInfo = await getUserInfo(member); //user컬렉션의 문서 가져오기
                if (!memberInfo) continue;
                members.push(memberInfo.nickname);
            }
            return members;
        } else {
            console.log("No such document!");
        }
    })
    return res;
}

export async function setUser(roomNumber) {
    const gameData = await getGameData(roomNumber);

    const shuffle = (array) => {
        const shuffleArray = [...array];
        shuffleArray.sort( ()=> Math.random() - 0.5 );
        return shuffleArray;
    }

    const members = await getNickname(roomNumber);
    console.log(members);
    await db.collection('game').doc(roomNumber).update({
        ...gameData,
        turn: shuffle(members)
    })
}