import React, { useState, useEffect } from 'react';
import '../../components/css/liarGame.css'
import SuggestionModal from "../../components/LiarGame/suggestionModal";
import SpeakComponent from "../../components/LiarGame/SpeakComponent";
import SelectLiarComponent from "../../components/LiarGame/SelectLiarComponent";
import { getGameRoomData, setLiarPlayerData } from "../../firebase/game-data";
import { getRoomdata } from "../../firebase/rooms";

export default function LiarGameView({ match }) {

	//게임 데이터 불러오기
	const [liarGamedata, setLiarGamedata] = useState({});
	const [users, setUsers] = useState([]);
	const [turn, setTurn] = useState([]);
	const [isStart, setIsStart] = useState(false); // 게임 실행 중 확인 여부 변수
	const [continueGame, setContinueGame] = useState(false);

	const changedgamedata = async (gamedata) => {
		setUsers(gamedata.players);
		setTurn(gamedata.turn);
		setLiarGamedata(gamedata.liar);

		console.log(turn[0]);

		const gameUserData = Object.entries(gamedata.players);

		// const callback = async () => {
		//     await setLiarPlayerData(match.params.roomId, turn[0], 'order', true);
		// }

		//제시어 확인 후 넘어감
		const isNotCheckedUsers = gameUserData.filter(([nickname, userGameData]) => !userGameData.liar.isCheckWord); // isCheckWord가 false인 array만 모아서 저장
		if (isNotCheckedUsers.length == 0) {
			setIsStart(true);
			// callback();
			console.log("!");
		}
		//만약 isNotCheckedUsers에 아무것도 없을 경우 발언화면으로 넘어가도록 함

		//라이어

	}
	useEffect(() => {
		getGameRoomData(match.params.roomId, changedgamedata)
	}, []);

	//룸 데이터 불러오기
	const roomdata = async () => {
		await getRoomdata(match.params.roomId);
	}

	//나의 게임 데이터
	const myNickname = localStorage.getItem('nickname');
	const myGameData = users[myNickname];

	//제시어
	const word = liarGamedata.liarword;

	//프론트
	const startGame = async () => { // 게임이 시작되면 발언하는 화면으로 이동
		setIsStart(true);
	}
	const goStop = (result) => { // true 이면, 투표 화면으로 이동. false 인 경우 첫 사용자부터 다시 발언 재개
		setContinueGame(result);
	}

	// useEffect(()=> {
	//     const userArray = Object.entries(users);
	//     let checkCount = 0;
	//     userArray.forEach(user => {
	//             if(user[1]['liar'].isCheckWord) checkCount +=1;
	//         }
	//     )
	//     if(checkCount==userArray.length) setIsStart(true);
	// })


	if (isStart && !continueGame) {
		return (
			<>
				<div className='container'>
					<div className='inner-container'>
						<SpeakComponent
							goStopResult={goStop}
							myGameData={myGameData}
							users={users}
							turn={turn}
						/>
					</div>
				</div>
			</>
		)
	} else if (isStart && continueGame) {
		return (
			<>
				<div className='container'>
					<div className='inner-container'>
						<SelectLiarComponent
							setIsStart={setIsStart}
							setContinueGame={setContinueGame}
							users={users}
							roomdata={roomdata}
						/>
					</div>
				</div>
			</>
		)
	} else {
		return (
			<>
				<div className='container'>
					<div className='inner-container'>
						<SuggestionModal
							word={word}
							users={users}
							myGameData={myGameData}
						/>
					</div>
				</div>
				<input type="button" value="누르면 게임 실행됨" onClick={startGame} className="tempBtn" />
			</>
		);
	}
}