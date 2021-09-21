import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router";
import Badge from '../../views/img/뱃지-01.png'
import Egg from '../../views/img/계란말이_스탠딩.png'
import Kimchi from '../../views/img/김치국수 스탠딩.png'
import Nogari from '../../views/img/노가리_스탠딩1 1.png'
import DDuk from '../../views/img/떡볶이 스탠딩.png'
import Bing from '../../views/img/빙수_스탠딩.png'
import Chicken from '../../views/img/치킨_스탠딩.png'
import BadgeTimeComponent from "./BadgeTimeComponent";
import '../css/voteBadge.css'
import CompletionVoteComponent from "./CompletionVoteComponent";


function VoteBadgeComponent() {
    const history = useHistory();

    // 6명 이라는 가정 하에 voteCount 값이 6이 되면 뱃지 투표 종료
    // 나중에는 파이어베이스에서 참가자 길이 정보 받아와서 해당 길이가 되면 종료 하게끔?
    // 그리고 한 유저가 클릭하면 더 이상 그 유저는 클릭할 수 없도록 해야할 것 같은데 어떻게 하는지 모르겠음
    const [voteCount, setVoteCount] = useState(0);

    const [maxIndex, setMaxIndex] = useState(0); // 가장 많이 지목된 인원 인덱스 위치
    const [maxCount, setMaxCount] = useState(0); // 가장 많이 지목된 카운트
    const [maxUser, setMaxUser] = useState(""); // 가장 많이 지목된 유저 이름
    const [maxImg, setMaxImg] = useState(""); // 가장 많이 지목된 유저 캐릭터
    const [lastPage, setLastPage] = useState(false); // true가 되면 마지막 페이지로 이동

    // 뱃지 수여 타임 띠 생기고 사라지게 하기 위한 변수 =
    const [badgeTime, setBadgeTime] = useState(true);
    // 3초가 지나면 뱃지 수여 타임 띠 사라짐
    useEffect(() => {
        let counter = 0;
        let interval = setInterval(function () {
            counter++;
            if (counter === 3) {
                clearInterval(interval);
                setBadgeTime(false);
            }
        }, 1000);
    }, []);


    if (voteCount === 6) {
        let counter = 0;
        let elements = document.getElementById(String(maxIndex));

        elements.style.zIndex = '100';
        elements.style.border = "1px solid #FCCE39";
        elements.style.transform = "scale(1.4) translateY(-10px)";
        elements.style.transition = "1.5s";

        setInterval(() => {
            setLastPage(true);
        }, 3000);
    }
    if(lastPage) {
        history.push({
            pathname: '/badge',
            state: {user:maxUser, img: maxImg}
        });
    }


    // 임시 유저 데이터
    const [gameUser, setGameUser] = useState([
        {
            nickname: "임성원", // 닉네임
            count: 0,
            img: Egg,
        },
        {
            nickname: "김지성", // 닉네임
            count: 0,
            img: Kimchi,
        },
        {
            nickname: "이종휘", // 닉네임
            count: 0,
            img: Nogari,
        },
        {
            nickname: "김호준", // 닉네임
            count: 0,
            img: DDuk,
        },
        {
            nickname: "박정민", // 닉네임
            count: 0,
            img: Bing,
        },
        {
            nickname: "신재혁", // 닉네임
            count: 0,
            img: Chicken,
        },
    ]);

    const userList = gameUser.map((user, index) => {
        return (
            <li id={index} style={styles.listStyle} onClick={() => {
                let newArr = [...gameUser];
                newArr[index].count += 1;
                setGameUser(newArr);
                setVoteCount(voteCount + 1);

                if (gameUser[index].count > maxCount) {
                    setMaxIndex(index);
                    setMaxUser(gameUser[index].nickname);
                    setMaxImg(gameUser[index].img);
                }
            }}>
                {gameUser[index].count ? <div className="voteCount">{gameUser[index].count}</div> :
                    <div className="noneCount">{gameUser[index].count}</div>}
                <img src={user.img} alt="캐릭터 이미지" style={styles.character}/>
                <div style={styles.nickName}>{user.nickname}</div>
            </li>

        )
    });

    // voteCount == 6이 되었을 때 렌더링 되는 유저 리스트..
    const temp_list = gameUser.map((user, index) => {
        return (
            <li id={index} style={styles.listStyle}>
                {gameUser[index].count ? <div className="voteCount">{gameUser[index].count}</div> :
                    <div className="noneCount">{gameUser[index].count}</div>}
                <img src={user.img} alt="캐릭터 이미지" style={styles.character}/>
                <div style={styles.nickName}>{user.nickname}</div>
            </li>

        )
    });


    // 여기에 voteCount 값을 6이랑 비교하는 것도 6이 아니라 나중에는 참가 유저 길이 만큼으로 지정해야 할 것 같다.


    if (badgeTime && voteCount !== 6) {
        return (
            <div style={styles.container}>
                <BadgeTimeComponent/>
                <div style={styles.title}>뱃지에 어울리는 플레이어를 선택해주세요!</div>
                <img style={styles.badge} src={Badge} alt="Badge"/>
                <div style={styles.listContainer}>
                    {userList}
                </div>
            </div>
        )
    } else if (!badgeTime && voteCount !== 6) {
        return (
            <div style={styles.container}>
                <div style={styles.title}>뱃지에 어울리는 플레이어를 선택해주세요!</div>
                <img style={styles.badge} src={Badge} alt="Badge"/>
                <div>
                    {userList}
                </div>
            </div>
        )
    }
    // 투표가 완료되면 제일 많이 투표된 인원 포커스 효과
    else if (!badgeTime && voteCount === 6) {

        return (
            <>

                <div style={styles.container}>
                    <div style={styles.title}>{gameUser[maxIndex].nickname}님이 선정되었습니다!</div>
                    <img style={styles.badge} src={Badge} alt="Badge"/>
                    <div style={{position: 'relative',}}>
                        {temp_list}
                    </div>
                </div>
            </>
        )
    }
}


export default VoteBadgeComponent;

const styles = {
    container: {
        position: 'relative',
        width: '100%', height: '100%',
    },
    title: {
        fontSize: 28,
        marginTop: 149,
    },
    badge: {
        width: 226, height: 244, marginTop: 49,
    },
    listStyle: {
        listStyleType: 'none', display: 'inline-block', border: '1px solid black', borderRadius: 5,
        width: 144, boxSizing: 'border-box', height: 218, padding: 10, margin: '86px 10px 0 0',
        backgroundColor: '#032213', color: '#FCCE39', position: 'relative', cursor: 'pointer',
    },
    userContainer: {
        marginTop: 34,
    },
    character: {
        width: 120, height: 120,
    },
    nickName: {
        marginTop: 34,
    },
}
