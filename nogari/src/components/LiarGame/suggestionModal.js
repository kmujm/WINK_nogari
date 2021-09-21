import React, {useState, useEffect} from 'react'
import LiarModal from "./liarModal";
import UserModal from "./userModal";
import {getWordGameCategory} from "../../firebase/games/word-game";
import {updateUserData} from "../../firebase/games/liar";
import {setLiarPlayerData} from "../../firebase/game-data";

export default function SuggestionModal(props) {

    const [defaultWord, setDefaultWord] = useState('');
    const [liarModal, setLiarModal] = useState(false);
    const [userModal, setUserModal] = useState(false);

    const liarOpenModal = () => {
        setLiarModal(true);
    }
    const liarCloseModal = () => {
        setLiarModal(false);
    }

    
    const userOpenModal = () => {
        setUserModal(true);
    }
    const userCloseModal = () => {
        setUserModal(false);
    }

    const confirmLiar = () => {
        setInterval(async()=> {
            const roomNumber = localStorage.getItem('roomNumber');
            const myNickname = localStorage.getItem('nickname');
            // props.users[myNickname].liar.isCheckWord = true;
            // await updateUserData(roomNumber, props.users);
            await setLiarPlayerData(roomNumber, myNickname, 'isCheckWord', true);
        },3000)

        if (props.myGameData.liar.isliar) { // 라이어
            liarOpenModal()
        }
        else { // 일반 유저
            userOpenModal()
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.title}>제시어 확인</div>
            <div style={styles.content}>제시어 확인 버튼을 클릭해서 역할을 확인해주세요.</div>
            <button style={styles.btn} onClick={confirmLiar}>제시어 확인하기</button>
            <LiarModal open={liarModal} isOpen={liarModal} close={liarCloseModal}/>
            <UserModal open={userModal} close={userCloseModal} isOpen={userModal} word={props.word}/>
        </div>
    )
}

const styles = {
    container: {
        width: 470,
        height: 305,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        position: 'absolute',
        textAlign: 'center', backgroundColor: '#0C8247',

    },
    title: {
        color: '#FCCE39',
        fontSize: 48, fontWeight: 'bold', marginBottom: 14, marginTop: '14%',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    },
    content: {
        color: '#fff',
        fontSize: 18, fontWeight: 'normal', marginBottom: 64,
    },
    btn: {
        width: 244, border: 'none', borderRadius: 5, height: 50,
        color: '#0C8247', fontSize: 18, backgroundColor: '#FCCE39',
    },
}