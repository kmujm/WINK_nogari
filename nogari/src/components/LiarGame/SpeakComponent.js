import React, { useEffect, useState, useRef,memo} from 'react'
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'
import GoStopModal from "./goStopModal";
import { getUserInfo } from "../../firebase/users";
import { updateUserData } from "../../firebase/games/liar";
import { getGameData, setLiarPlayerData, updateTurn } from "../../firebase/game-data";
import { getRoomInfo } from "../../firebase/waiting-room";
import { Chr } from "../../views/beforeGame/Choose_Char";

const SpeakComponent = memo((props) => {

	const [count, setCount] = useState(20);
	const [userProfile, setUserProfile] = useState([]);
	const roomNumber = localStorage.getItem('roomNumber');
	const liarTimer = useRef();
	let point = 0;



	const setUserInfo = async (roomInfo) => {
		// await console.log(roomInfo);
		let members = [];

		for await (let member of roomInfo.members) {
			const memberInfo = await getUserInfo(member);
			if (!memberInfo) continue;

			members.push(memberInfo);
		}
		setUserProfile(members);
		await setLiarPlayerData(roomNumber, props.turn[0], 'order', true);
	}

	// 렌더링 시 해당 방의 참가 유저 정보를 가져오는 함수 호출
	useEffect(() => {
		getRoomInfo(roomNumber, setUserInfo);
	}, []);

	useEffect(() => {
		if (count <= 0) {
		} else {
			liarTimer.current = setTimeout(() => {
				setCount((prev) => prev - 1)
			}, 1000)
		}
		return () => clearTimeout(liarTimer.current)
	}, [count]);


	const userList = userProfile.map((user) => {


		return (
			<li style={styles.listStyle}>
				<div style={styles.userContainer}>
					<img src={Chr[user.profile]} alt='#' style={props.users[user.nickname].liar.order ? styles.startUser : styles.stopUser} />
					<div style={styles.nickName}>{user.nickname}</div>
				</div>
			</li>

		)
	});

	const [voteModal, setVoteModal] = useState(false);

	const userLength = Object.entries(props.users).length;

	const openVoteModal = async () => {
		// console.log(props.turn[point]);
		// await updateTurn(roomNumber, props.turn[point], props.turn[++point]);
		await setLiarPlayerData(roomNumber, props.turn[point], 'order', false);
		point++;
		if (userLength > point) {
			await setLiarPlayerData(roomNumber, props.turn[point], 'order', true);
		} else {
			setVoteModal(true);
		}
	}
	const closeVoteModal = () => {
		setVoteModal(false);
	}

	// goStopModal 으로 부터 받아온 데이터, 게임 진행 여부를 받았고, 다시 LiarGameView에 해당 결과를 반환
	const getFromVoteModal = (data) => {
		props.goStopResult(data);
	}

	const next = async () => {
	}


	return (
		<div style={styles.container}>
			<div style={styles.title}>‘{props.turn[point]}’님 차례입니다!!</div>
			<div style={styles.description}>제한시간 내 발언을 마치고 ‘발언 종료’ 버튼을 눌러주세요!</div>
			<span style={styles.count}>{count}<span style={styles.countText}>초</span></span>
			<button style={styles.stopBtn} onClick={openVoteModal}>발언 종료</button>
			<div>
				{userList}
			</div>
			<GoStopModal open={voteModal} isOpen={voteModal} close={closeVoteModal} userList={props.users}
				goStopResult={getFromVoteModal} userProfile={userProfile} turn={props.turn} />
		</div>
	)
})

const styles = {
	container: {
		textAlign: 'center',
	},
	title: {
		color: '#000', fontStyle: 'Roboto', fontWeight: 'black',
		fontSize: 30, marginBottom: 18, marginTop: 68,
	},
	description: {
		color: '#000', fontSize: 14, marginBottom: 68,
	},
	count: {
		fontSize: 120, fontStyle: 'Roboto',
		fontWeight: 'bold', display: 'block',
	},
	stopBtn: {
		marginTop: 73, width: 320, height: 70, backgroundColor: '#FCCE39', color: '#08552E',
		fontStyle: 'Roboto', fontWeight: 'bold', fontSize: 25, border: '4px solid #08552E', borderRadius: 10,
		cursor: 'pointer',

	},
	startUser: {
		width: 100, height: 100, border: '1px solid #FCCE39',
	},
	stopUser: {
		width: 100, height: 100,
	},
	listStyle: {
		listStyleType: 'none', display: 'inline-block', border: '1px solid black', borderRadius: 5,
		width: 144, boxSizing: 'border-box', height: 218, padding: 10, margin: '86px 8px 0 0',
		backgroundColor: '#032213', color: '#FCCE39'
	},
	countText: {
		fontSize: 24,
	},
	userContainer: {
		marginTop: 34,
	},
	nickName: {
		marginTop: 8,
	},
}

export default SpeakComponent;