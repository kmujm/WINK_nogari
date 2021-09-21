import React, {useEffect, useState} from 'react';
import '../css/WordGamePlayer.scss'
import Graduation_Hat from '../../views/img/졸업모자.png'
import Input_Bubble from '../../views/img/말풍선.png'
import {getUserInfo} from "../../firebase/users";
import {getRoomInfo} from "../../firebase/waiting-room";
import {Chr} from "../../views/beforeGame/Choose_Char";

function WordGamePlayer({player, myNickname, roomNumber, updateUserData, round}) {
    useEffect(() => {
        if (player !== undefined) {
            player[myNickname].wordGame.isCorrected = false;
            player[myNickname].wordGame.inputWord = "";
            updateUserData(roomNumber, player);
        }
    }, [])

    const [userProfile, setUserProfile] = useState([]);

    // 게임에 참가한 유저들 프로필 이미지, 이름 가져오기
    const setUserInfo = async (roomInfo) => {
        // await console.log(roomInfo);
        let members = [];

        for await (let member of roomInfo.members) {
            const memberInfo = await getUserInfo(member);
            if (!memberInfo) continue;

            members.push(memberInfo);
        }
        setUserProfile(members)
    }
    // 렌더링 시 해당 방의 참가 유저 정보를 가져오는 함수 호출
    useEffect(() => {
        getRoomInfo(roomNumber, setUserInfo);
    }, []);

    return (
        <>
            <div className="footer">
                {player !== undefined && Object.entries(player).map((mem) => (
                    <div className="playerBox">
                        {mem[1].wordGame.inputWord === ""
                            ?
                            <div className="inputword" style={{visibility: "hidden"}}>
                                <img src={Input_Bubble}/>
                                <h3>{mem[1].wordGame.inputWord}</h3>
                            </div>
                            :
                            <div className={mem[1].wordGame.isCorrected ? "inputword-correct" : "inputword"}>
                                <img src={Input_Bubble}/>
                                <h3>{mem[1].wordGame.inputWord}</h3>
                            </div>
                        }

                        <div className="playerInfo">
                            {userProfile.map((user) => (
                                <>
                                    <img style={{width:"inherit"}} src={Chr[user.profile]}/>
                                </>
                            ))}
                            {mem[1].wordGame.isCorrected ? <div><img src={Graduation_Hat}/> {mem[0]}</div> :
                                <div>{mem[0]}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WordGamePlayer
