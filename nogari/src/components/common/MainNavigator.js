import React from 'react';
import { Link } from 'react-router-dom';
import {choiceGame} from "../../firebase/choiceGame";

export default function MainNavigator() {
  const roomId = localStorage.getItem('roomNumber');
  return (
      <>
        <div>
          <ul style={styles.gameList}>
            <li style={styles.gameBtn}><Link to="/" style={styles.link}>메인으로</Link></li>
            <li style={styles.gameBtn}><Link to="/marble" style={styles.link} onClick={()=> choiceGame(roomId,"주루마블")}>주루마블</Link></li>
            <li style={styles.gameBtn}><Link to="/liar" style={styles.link} onClick={()=> choiceGame(roomId,"라이어게임")}>라이어게임</Link></li>
            <li style={styles.gameBtn}><Link to="/roulette" style={styles.link} onClick={()=> choiceGame(roomId,"룰렛게임")}>룰렛게임</Link></li>
            <li style={styles.gameBtn}><Link to="/word" style={styles.link} onClick={()=> choiceGame(roomId,"초성 게임")}>초성 게임</Link></li>
          </ul>
        </div>
      </>
  );
}

const styles = {
  gameList: {
    padding:0,
    display: 'flex',
    justifyContent: 'space-around',
    listStyle: 'none'
  },
  gameBtn: {
    width: '15%',
    height: '15%',
    backgroundColor: "yellow",
    padding:'20px',
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'none',
    color:'black'
  }
}

