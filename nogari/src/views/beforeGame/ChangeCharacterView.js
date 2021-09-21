import React, {useState} from "react";
import firebase from "firebase";

export default function ChangeCharacterView() {
    const [newNickname,setNewNickname] = useState('');
    const [newCharacter, setNewCharacter] = useState(0);

    function getUserID() {
        const userID = localStorage.getItem('myId'); // 방을 만드는 유저의 아이디
        return userID;
    }

    function getRoomNumber() {
        const userRoomNumber = localStorage.getItem('roomNumber');
        return userRoomNumber;
    }

    const nicknameHandleOnChange = (e) => {
        setNewNickname(e.target.value);
    }

    const reCharacter = async () => {
        localStorage.setItem('nickname', newNickname)
        localStorage.setItem('character', newCharacter)
        await firebase.firestore().collection('rooms').doc(`${getRoomNumber()}`).collection('members').doc(`${getUserID()}`).update({
            nickname : newNickname,
            character : newCharacter
        }, {merge:true})
        await firebase.firestore().collection('users').doc(`${getUserID()}`).update({
            nickname : newNickname,
            character : newCharacter
        }, {merge:true})
    }

    return (
        <>
            <div>
                <>
                    <div>
                        <h2>닉네임 재설정</h2>
                        <input type="text" onChange={nicknameHandleOnChange} value={newNickname} />
                        <h2> 캐릭터 설정 </h2>
                        <button onClick={()=>{setNewCharacter(1)}}>1</button>
                        <button onClick={()=>{setNewCharacter(2)}}>2</button>
                        <button onClick={()=>{setNewCharacter(3)}}>3</button>
                        <button onClick={reCharacter}>캐릭터 재설정</button>
                    </div>
                </>
            </div>
        </>
    )
}
