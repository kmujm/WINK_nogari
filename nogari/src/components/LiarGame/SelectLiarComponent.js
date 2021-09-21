import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router";
import '../css/selectLiar.css'
import {getUserInfo} from "../../firebase/users";
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'
import NominateLiar from "./NominateLiar";
import {updateUserData} from "../../firebase/games/liar";
import {setLiarPlayerData} from "../../firebase/game-data";
import {getRoomInfo} from "../../firebase/waiting-room";
import {Chr} from "../../views/beforeGame/Choose_Char";
import firebase from "../../firebase/firebase-manager";
import {getGameData} from "../../firebase/game-data";

export default function SelectLiarComponent(props) {
    let [allUserSelect, setAllUserSelect] = useState(false);
    let [mostVotedUser, setMostVotedUser] = useState({});
    const [userProfile, setUserProfile] = useState([]);
    const [vote, setVote] = useState(true);
    let [userLiar, setUserLiar] = useState(false);

    const roomNumber = localStorage.getItem('roomNumber');
    const myNickname = localStorage.getItem('nickname');

    const setUserInfo = async (roomInfo) => {
        // await console.log(roomInfo);
        let members = [];

        for await (let member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            if (!memberInfo) continue;

            members.push(memberInfo);
        }
        setUserProfile(members);
        console.log(userProfile);
    }

    // 렌더링 시 해당 방의 참가 유저 정보를 가져오는 함수 호출
    useEffect(() => {
        getRoomInfo(roomNumber, setUserInfo);
    }, []);

    let user = userProfile.map((user, index) => {

        return (
            <li className="userContainer" key={index} onClick={async () => {
                const count = props.users[user.nickname].liar.count
                console.log("count: ",count);
                if(vote) {
                    await setLiarPlayerData(roomNumber, user.nickname, 'count', count+1);
                    setVote(false);
                }

            }}>
                {props.users[user.nickname].liar.count!=0 ? <div className="voteCount">{props.users[myNickname].liar.count}</div> : <div className="noneCount">{}</div>}
                <img src={Chr[user.profile]} alt='#'  className="userImage"/>
                <span>{user.nickname}</span>
            </li>
        )
    });

    const nominate = async () => {
        // const temp_list = [...userList];
        // let maxCount = temp_list[0].count;
        // let user = temp_list[0].nickname;
        // let profile = temp_list[0].profile;
        // let isLiar = temp_list[0].isLiar;
        //
        // for(let i=0; i<temp_list.length; i++) {
        //     if (maxCount < temp_list[i].count) {
        //         maxCount = temp_list[i].count;
        //         user = temp_list[i].nickname;
        //         profile = temp_list[i].profile;
        //         isLiar = temp_list[i].isLiar;
        //     }
        // }

        // const gameData = await getGameData(roomNumber);
        // console.log(gameData);

        const gameData = await getGameData(roomNumber);
        const userData = await Object.entries(gameData.players);

        let maxCount = userData[0][1].liar.count; // 첫번째 유저의 count 값
        let max_user = userData[0][1].member; // 첫번재 유저의 userId 값
        for (let i=1; i < userData.length; i++) {
            if (maxCount < userData[i][1].liar.count) {
                maxCount = userData[i][1].liar.count;
                max_user = userData[i][1].member;
            }
        }
        const user = await getUserInfo(max_user);


        setMostVotedUser(user);
        // setProfile(profile);
        // setUserLiar(isLiar);
        setAllUserSelect(true);
    }
    // 모든 유저가 선택하지 않았을 때 화면
    if (!allUserSelect) {
        return (
            <>
                <div className="container">
                    <div className="selectLiar">라이어를 지목해주세요!</div>
                    <div className="description">동점일 시 게임으로 다시 돌아갑니다.</div>
                    <div className="userList">{user}</div>

                    <button onClick={nominate} className="selectBtn">선택 완료</button>
                </div>
            </>
        )
    }
    // 모든 유저가 선택했을 때 넘어가는 화면
    else {
        return (
            <>
                <NominateLiar name={mostVotedUser} profile='#' isLiar={userLiar}/>
            </>
        )
    }

    //임시 게임끝
    // const test = () => {
    //     props.setIsStart(false);
    //     props.setContinueGame(false);
    // }
    // return (
    //     <>
    //         <div className="container">
    //             <div className="selectLiar">라이어를 지목해주세요!</div>
    //             <div className="description">동점일 시 게임으로 다시 돌아갑니다.</div>
    //             {user}
    //             <button onClick={test} className="selectBtn">선택 완료</button>
    //         </div>
    //     </>
    // )
}

