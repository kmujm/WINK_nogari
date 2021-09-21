import React,{useState} from 'react';
import "./css/Choose_Char.css";
import unchosen from "../img/unchosen.png";
import EggRoll from '../img/계란말이_스탠딩.png'
import KimchiRollNoodle from '../img/김치국수 스탠딩.png'
import RiceCake from '../img/떡볶이 스탠딩.png'
import Nogari from '../img/노가리_스탠딩1.png'
import Chicken from '../img/치킨_스탠딩.png'
import Kkochi from '../img/꼬치 3인방_스탠딩.png'
import DdalBing from '../img/빙수_스탠딩.png'
import CheezeBall from '../img/치즈볼_스탠딩.png'
import CaramelPop from '../img/카라멜팝곤_스탠딩.png'
import {Link} from "react-router-dom";
import * as members from "../../firebase/users";
import {updateLastConnection} from '../../firebase/users'


const title = {
    marginLeft:"4px",
    float: "left",
    display: "flex",
    fontSize:"18px",
    lineHeight:"28px",
    color:"#0C8247"
}
const subtitle = {
    position: "absolute",
    paddingLeft: "5px",
    color: "#0C8247",
    marginLeft:"0px",
    marginTop: "-50px",
    fontSize: "10Px",
    lineHeight: "16px",
    float: "left",
    display: "flex",
    marginBottom: "0px"
}
const CharName = {
    color: "#FCCE39",
    fontSize: "13px",
    float: "left",
    paddingLeft: "23px",
    paddingTop: "10px",
}
const Category = {
    color:"#0C8247",
    fontSize: "13px",
    letterSpacing: "-0.03em",
    lineHeight:'28px'
}



export const Chr = [unchosen, EggRoll, KimchiRollNoodle, RiceCake, Nogari, Chicken, Kkochi, DdalBing, CheezeBall, CaramelPop];
export const Ch_name = ["캐릭터 선택", "계란말이", "김치말이 국수", "시골 떡볶이", "청춘 노가리", "치킨", "꼬치구이","딸기 빙수", "치즈볼", "카라멜 팝콘"];

export default function Choose_Char({ history }) {
    const Catego = ["식사류", "안주류", "간식류"]
    const [count, setCount] = useState(0);
    const [idx, setIdx] = useState(0);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [nickname, setNickname] = useState(''); // 닉네임
    const [character,setCharacter] = useState(0); // 프로필
    const [snack, setSnack] = useState('');

    const previous = ()=>{
        if(idx <=0) setIdx(0)
        else setIdx(idx-1)
    }
    const next = ()=>{
        if(idx >=2) setIdx(2)
        else setIdx(idx+1)
    }
    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const handleOnChange = (e) => { // 닉네임 변화 감지
        setNickname(e.target.value);
    }

    const createID = async () => {
        if (character === 0) { // 프로필 설정 안 했을 때 에러
            alert("error")
        }
        else {
            const userId = await members.createUser(nickname, character);
            await updateLastConnection(userId);
            localStorage.setItem('myId', userId);
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('character', character);
            localStorage.setItem('snack', snack);

            setCharacter(0);
            history.push('/find');
        }
    }

    return(

        <>
            <div className="choose_main">
                <div className="sel_hero">
                    <a style={title}>안주 선택</a><br></br>
                    <a style={subtitle}>원하시는 안주 캐릭터를 선택해주세요!</a><br></br>
                    <div className="sel_header">
                        <button className='PreNextBT' onClick={previous}>&lt;</button>
                        <a style={Category}> {Catego[idx]}</a>
                        <button className='PreNextBT' onClick={next}>&gt;</button>
                    </div>
                    <div>
                        {
                            idx===0 && <div className="container_select">
                                <img src={EggRoll}  alt='계란말이' onClick={()=>{setCount(1); setCharacter(1); setSnack('계란말이');}}/>
                                <img src={KimchiRollNoodle} alt='김치말이국수' onClick={()=>{setCount(2); setCharacter(2); setSnack('김치말이국수');}} />
                                <img src={RiceCake} alt='떡볶이' onClick={()=>{setCount(3); setCharacter(3); setSnack('떡볶이');}}/>
                                <span>comming<br/>soon</span>
                                <span>comming<br/>soon</span>
                                <span>comming<br/>soon</span>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===1 && <div className="container_select">
                                <img src={Nogari}  alt='청춘 노가리' onClick={()=>{setCount(4); setCharacter(4); setSnack('청춘 노가리');}}/>
                                <img src={Chicken} alt='치킨'  onClick={()=>{setCount(5); setCharacter(5); setSnack('치킨');}} />
                                <img src={Kkochi} alt='꼬치' onClick={()=>{setCount(6); setCharacter(6); setSnack('꼬치');}}/>
                                <span>comming<br/>soon</span>
                                <span>comming<br/>soon</span>
                                <span>comming<br/>soon</span>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===2 && <div className="container_select">
                                <img src={DdalBing}  alt='딸기빙수' onClick={()=>{setCount(7); setCharacter(7); setSnack('딸기빙수');}}/>
                                <img src={CheezeBall} alt='치즈볼'  onClick={()=>{setCount(8); setCharacter(8); setSnack('치즈볼');}} />
                                <img src={CaramelPop} alt='카라멜 팝콘' onClick={()=>{setCount(9); setCharacter(9); setSnack('캬라멜 팝콘');}}/>
                                <span>comming<br/>soon</span>
                                <span>comming<br/>soon</span>
                                <span>comming<br/>soon</span>
                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===0 && <div className="category_button_box">
                                <button className="category_button" style={{backgroundColor:"black"}} onClick={()=>{setIdx(0)}}/>
                                <button className="category_button" onClick={()=>{setIdx(1)}}/>
                                <button className="category_button" onClick={()=>{setIdx(2)}}/>

                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===1 && <div className="category_button_box">
                                <button className="category_button" onClick={()=>{setIdx(0)}}/>
                                <button className="category_button" style={{backgroundColor:"black"}} onClick={()=>{setIdx(1)}}/>
                                <button className="category_button" onClick={()=>{setIdx(2)}}/>

                            </div>
                        }
                    </div>
                    <div>
                        {
                            idx===2 && <div className="category_button_box">
                                <button className="category_button" onClick={()=>{setIdx(0)}}/>
                                <button className="category_button" onClick={()=>{setIdx(1)}}/>
                                <button className="category_button" style={{backgroundColor:"black"}} onClick={()=>{setIdx(2)}}/>
                            </div>
                        }
                    </div>


                </div>
                <div className="chosen_hero">
                    <img className="image_chosen" src={Chr[count]} alt={'unchosen'} />
                    <div className="Chr_Name_box" style={CharName}>{Ch_name[count]}</div>
                    <input id="id" type="text"  placeholder="닉네임 입력" value={nickname} className="input_box" onChange={handleOnChange} />
                </div>
                <div className="complete_button_wrapper">
                    <div>
                        { nickname===""
                            ?<button disabled={nickname===""} className="complete_button2">캐릭터 생성 완료</button>
                            :<button className="complete_button1" onClick={createID}>캐릭터 생성 완료</button>
                        }
                    </div>
                </div>

            </div>

        </>
    );
}
