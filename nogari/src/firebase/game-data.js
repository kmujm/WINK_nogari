import firebase from './firebase-manager';


export async function getGameData(roomNumber) {
    console.log(roomNumber);
    const game = await firebase.firestore().collection('game').doc(roomNumber).get();
    return game.data();
}


export async function getGameRoomData(roomNumber, callback) {
    await firebase.firestore().collection('game').doc(roomNumber).onSnapshot((doc) => {
        callback(doc.data());
    });
}

export async function setPlayers(roomNumber, players) {
    console.log(players);
    await firebase.firestore().collection("game").doc(roomNumber).update({
        players
    });
}

export async function setLiarPlayerData(roomNumber, nickname, field, fieldValue) {
    const gameData = await getGameData(roomNumber);
    console.log("!");

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                liar: {
                    ...gameData.players[nickname].liar,
                    [field]: fieldValue,
                }
            },
        },
    });
}

export async function setLiarData(roomNumber, field, fieldValue){
    const gameData = await getGameData(roomNumber);
    console.log("!");

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        liar : {
            ...gameData.liar,
            [field]: fieldValue,
        }
    });
}


export async function updateTurn(roomNumber, nickname, nextNickname) {
    const gameData = await getGameData(roomNumber);

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [nickname]: {
                ...gameData.players[nickname],
                liar: {
                    ...gameData.players[nickname].liar,
                    'order': false,
                }
            },
            [nextNickname]: {
                ...gameData.players[nextNickname],
                liar: {
                    ...gameData.players[nextNickname].liar,
                    'order': true,
                }
            },
        },
    });
}

// 주루마블 관련 파이어스토어 업데이트 함수
export async function setFirstUserOder(roomId) {
    const gameData = await getGameData(roomId);
    const userData = Object.entries(gameData.players);
    let flag = false;

    for (let i = 0; i < userData.length; i++) {
        if (userData[i][1].alcoholRoulette.order) {
            flag = true;
        }
    }

    if (!flag) {
        let firstTurn = gameData.turn[0];
        await firebase.firestore().collection("game").doc(roomId).update({
            ...gameData,
            players: {
                ...gameData.players,
                [firstTurn]: {
                    ...gameData.players[firstTurn],
                    alcoholRoulette: {
                        ...gameData.players[firstTurn].alcoholRoulette,
                        order: true,
                    }
                }

            }
        });
    }
}

export async function setRoulettePlayerData(roomNumber, point, field, fieldValue) {
    const gameData = await getGameData(roomNumber);
    let name = gameData.turn[point];

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [name]: {
                ...gameData.players[name],
                alcoholRoulette: {
                    ...gameData.players[name].alcoholRoulette,
                    [field]: fieldValue,
                }
            },
        },
    });
}


export async function updateLocationAndOrder(roomNumber, userName, location) {
    const gameData = await getGameData(roomNumber);
    const userLength = gameData.turn.length;
    let nextUserIndex = 0;

    const userData = await Object.values(gameData.turn);
    for (let i=0; i < userData.length; i++) {
        if (userName === userData[i]) {
            nextUserIndex = i+1;
        }
    }
    const nextName = await gameData.turn[nextUserIndex % userLength];

    // const userData = Object.entries(gameData.players).map(([nickname, data]) => ({
    //     [nickname]: {
    //         ...data,
    //         alcoholRoulette: {
    //             ...data.alcoholRoulette,
    //             order: false,
    //         },
    //     }
    // })).reduce((x, y) => ({ ...x, ...y }));

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...gameData.players,
            [userName]: { // [userName] 이와 같이 해야 key 값이 파라미터에서 넘어온 대로 저장. userName: 으로 하면 키 값이 userName 스트링 자체로 바뀜
                ...gameData.players[userName],
                alcoholRoulette: {
                    ...gameData.players[userName].alcoholRoulette,
                    location: location, // value는 파라미터 넘어온 그대로 사용 가능
                    order: false,
                }
            },
            [nextName]: {
                ...gameData.players[nextName],
                alcoholRoulette: {
                    ...gameData.players[nextName].alcoholRoulette,
                    order: true,
                }
            },
        }
    });
}

export async function updateRoulettePlayersOrder(roomNumber, point, nextPoint) {
    const gameData = await getGameData(roomNumber);
    let userLength = gameData.turn.length;
    let name = gameData.turn[point % userLength];
    const nextName = gameData.turn[nextPoint % userLength];

    const userData = Object.entries(gameData.players).map(([nickname, data]) => ({
        [nickname]: {
            ...data,
            alcoholRoulette: {
                ...data.alcoholRoulette,
                order: false,
            },
        }
    })).reduce((x, y) => ({...x, ...y}));

    await firebase.firestore().collection("game").doc(roomNumber).update({
        ...gameData,
        players: {
            ...userData,
            [nextName]: {
                ...gameData.players[nextName],
                alcoholRoulette: {
                    ...gameData.players[nextName].alcoholRoulette,
                    order: true,
                }
            },
        },
    });
}
