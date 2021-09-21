import React, { useState } from 'react'
import GameInfo from "./gameInfo";
import '../css/selectGame.css'
import { choiceGame } from "../../firebase/choiceGame";




const SelectGame = (props, { match }) => {

    const [gameList, setGameList] = useState([
        {
            id: 0,
            gameName: "상한 안주찾기",
            description: "순서대로 접시의 뚜껑을 열다가 썩은 안주접시를 선택하는 플레이어가 벌칙 수행.",
            story: "안주대학교 축제 중 발생한 악취대소동!! 썩은 접시를 선택하게 될 플레이어는 누구일 것인가!",
            runningTime: "1분 내외",
            isSelected: false,
        },
        {
            id: 1,
            gameName: "노가리마블",
            description: "순서대로 룰렛을 돌려 나온 숫자대로 앞으로 전진한다. 도착한 칸의 문구의 맞게 벌칙을 수행한다. 게임을 그만하고 싶으면 finish버튼을 클릭하여 게임종료 투표를 한다.",
            story: "안주대학교의 체육대회에서 학생들의 우당탕탕 벌칙 육상경주!!",
            runningTime: "플레이어 재량",
            isSelected: false,
        },
        {
            id: 2,
            gameName: "안주 라이어",
            description: "방장이 원하는 카테고리를 선택한다. 카테고리에 맞는 제시어와 라이어 카드가 플레이어들에게 보여진다. 플레이어들은 돌아가면서 해당 제시어를 표현해야하며, 라이어는 그것을 유추해서 그럴듯이 표현해야한다. 한바퀴의 순서가 돌아가면 플레이어들은 투표를 통해 한바퀴 더 설명할 것인지, 아니면 라이어를 지목할 것인지 투표를 통해 결정한다.",
            story: "안주대학교의 즐거운 엠티!! 여러 안주들 사이에서 거짓말을 하고 있는 안주를 찾을 수 있을것인가!!",
            runningTime: "5~8분 내외",
            isSelected: false,
        },
        {
            id: 3,
            gameName: "중간고사 서바이벌",
            description: "방장이 원하는 카테고리를 선택한다. 카테고리에 해당되는 문제가 초성으로 출시 되면 정답란에 정답을 적는다. 마지막까지 정답을 맞추지 못한 플레이어가 낙제생이 되어 벌칙을 수행.",
            story: "안주대학교의 베스트 메뉴를 가려내는 중간고사!! 과연 꼴등을 차지하는 낙제생은 누가될 것인가!!",
            runningTime: "3~5분 내외",
            isSelected: false,
        },
    ]);

    // const getGameListStyle = (i) => {
    //     if (gameList[i].isSelected === true) {
    //         return {
    //             backgroundColor: '#FCCE39',
    //         }
    //     } else {
    //         return {
    //             backgroundColor: 'black'
    //         }
    //     }
    // }

    const [infoModal, setInfoModal] = useState(false);
    const [gameInfo, setGameInfo] = useState({});
    const infoOpenModal = () => {
        setInfoModal(true);

    }
    const infoCloseModal = () => {
        setInfoModal(false);
    }

    const clearSelectedGame = () => {
        const temp = [...gameList];
        for (let i = 0; i < gameList.length; i++) {
            temp[i].isSelected = false;
        }
        setGameList(temp);
    }

    // 게임 선택 '나가기' 버튼 클릭 시 팝업창 종료 및 '선택하기' 버튼 비활성화
    // const exitMenu = () => {
    //     props.close();
    //     setIsSelected(false);
    //     setSelectedGame("");
    // }



    const [isSelected, setIsSelected] = useState(false); // 게임 선택 유무
    const [selectedGame, setSelectedGame] = useState(""); // 선택된 게임 이름
    //gameList
    const game_info = gameList.map((idx, index) => (
        <li li tabindex={index}
            className={"gameList" + (gameList[index].isSelected ? "active" : '')}
            onClick={
                () => {
                    clearSelectedGame();
                    const dump = [...gameList];
                    dump[index].isSelected = true;
                    setGameList(dump);
                    gameList[index].isSelected = true;
                    console.log(gameList);
                    for (let i = 0; i < gameList.length; i++) {
                        if (gameList[i].id === idx.id) {
                            setSelectedGame(gameList[i].gameName);
                            choiceGame(localStorage.getItem('roomNumber'), gameList[i].gameName);
                            console.log(localStorage.getItem('roomNumber'));
                            setGameInfo(gameList[i]);
                            setIsSelected(true);
                        }
                    }
                }}>
            <div style={styles.contentContainer}>
                <div className="infoBtn" style={styles.infoIcon} onClick={infoOpenModal}>i</div>
                <div style={styles.gameName}>{idx.gameName}</div>
            </div>
        </li>
    ));

    const sendToParent = () => {
        props.parentFunction(gameList.find((i) => i.gameName === selectedGame));
        props.close();
    }

    return (
        <div style={styles.container}>
            {props.open ? (
                <div style={styles.innerContainer}>
                    <h2 style={styles.title}>게임 선택!!</h2>
                    <div style={styles.listContainer}>{game_info}</div>
                    <div style={styles.btnContainer}>
                        {isSelected ? <button style={styles.btnStyleSelected} onClick={sendToParent}>선택 완료</button> :
                            <button style={styles.btnStyle} disabled>선택 완료</button>}
                        {/*<span>선택된 게임 : {selectedGame}</span>*/}
                    </div>
                </div>
            ) : null}
            <GameInfo open={infoModal} close={infoCloseModal} gameInfo={gameInfo} />
        </div>
    );
}

export default SelectGame

const styles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '7%',
        transform: 'translateX(-50%)',
        zIndex: 100,
    },
    innerContainer: {
        width: 850, height: 700, border: '2px solid #FCCE39', backgroundColor: '#1B9659', color: '#FCCE39',
        borderRadius: 15,
    },
    title: {
        textAlign: 'center', fontSize: 40, marginTop: 32, marginBottom: 16,
    },
    listContainer: {
        textAlign: 'center', backgroundColor: '#08552E', borderRadius: 10, border: '1px solid black',
        margin: '0 20px 0 20px',
    },
    btnContainer: {
        width: '100%', textAlign: 'center', marginTop: 30,
    },
    btnStyle: {
        width: 220, height: 35, backgroundColor: '#DDDDDD', border: 'none', color: '#FFF', fontSize: 18,
        borderRadius: 10,
    },
    btnStyleSelected: {
        width: 220, height: 35, backgroundColor: '#FCCE39', border: 'none', color: '#1B9659', fontSize: 18,
        borderRadius: 10, cursor: 'pointer',
    },
    contentContainer: {
        position: 'relative'
    },
    infoIcon: {
        position: 'absolute', display: 'block', width: 20, height: 20, lineHeight: '22px',
        borderRadius: 100, right: 0, zIndex: 99,
    },
    gameName: {
        marginTop: 94,
        fontSize: 32,
        zIndex: 99,
        position: 'absolute',
        width: 280,
        left: '50%',
        transform: 'translateX(-50%)',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    },
}
