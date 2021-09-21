import {useState, React, useEffect} from 'react'
import {useHistory} from "react-router";
import Modal from 'react-modal'
import './css/Link_input.css'
import firebase from "firebase";
import {addMember} from "../../firebase/waiting-room";
import {getUserInfo} from "../../firebase/users";

Modal.setAppElement('#root')

const LinkModal = (props) => {
    const{open,close} = props;
    const[value,setValue]=useState("");
    const[roomId, setRoomId] = useState('');

    const history = useHistory();

    const inRoom = () => {
        firebase.firestore().collection('rooms').get().then((snapshot) => {
            snapshot.forEach(doc => {
                if (doc.id === value) { // 이미 생성된 룸넘버 입력 시에만 유저 정보 추가
                    console.log(value);
                    localStorage.setItem('roomNumber', value);
                    firebase.firestore().collection("users").doc(`${localStorage.getItem('myId')}`).get().then((doc) => {
                        if (doc.exists) { // 현재 웹스토리지에 있는 유저아이디로 된 문서가 있는지 확인
                            const addUser = async () => {
                                await addMember(value, localStorage.getItem('myId'));
                            }
                            addUser();
                            history.push(`/rooms/${value}`);
                            // setInterval(async () => { // 유저 접속 시간 주기적으로 받기
                            //     const time = new Date().getTime()
                            //     localStorage.setItem('connection',time)
                            //     await firebase.firestore().collection('rooms').doc(`${goRoom}`).collection('members').doc(`${getUserID()}`).update({
                            //         lastConnection : time
                            //     }, {merge:true})
                            // }, 6000);
                        } else {
                            console.log("No user data");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }
            })
        })
    }
    const onKeyPress=(e)=>{
        if(e.key==='Enter'){
            inRoom()
        }
    }
    return(
        <div className={ open ? 'openModal modal' : 'modal' }>
            { open ? (
                <div className='linkmain'>
                    <button className="close" onClick={close}> &times;</button>
                    <input onKeyPress={onKeyPress} placeholder="링크를 입력해주세요" value={value} onChange={e=>setValue(e.target.value)} />
                    { value===""
                        ?<button disabled={value===""} className="enter1" >입장</button>
                        :<button className="enter2" onClick={inRoom} >입장</button>

                    }

                </div>
            ) : null }
        </div>
    )
}

export default LinkModal
