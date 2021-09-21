import React from 'react';
import Modal from 'react-modal'
import {useHistory} from "react-router";
import {useState, useEffect} from "react";
import './css/WordGameView.css';
import TimeoutModal from './Timeout'
import {getPlayersOnTrigger} from "../../firebase/games/word-game";
import StartModal from '../../components/common/gameStart'
import {updateUserData, updateGameState} from "../../firebase/games/word-game";
import WordGamePlayer from "../../components/WordGame/WordGamePlayer";
import WordGameTimer from "../../components/WordGame/WordGameTimer";
import WordGameQuizBox from "../../components/WordGame/WordGameQuizBox";
import Result from "../../components/common/result";

export default function WordGameView({match}) {
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [wordGame, setWordGame] = useState([
        {
            quiz: '',
            answer: '',
        }
    ]);

    const [random, setRandom] = useState([]);
    const [state, setState] = useState()
    const [round, setRound] = useState(0);
    const [player, setPlayer] = useState();
    const [totalRound, setTotalRound] = useState(0);
    const [gameState, setGameState] = useState(false);

    const [value, setValue] = useState();
    const [seconds, setSeconds] = useState(30);

    const [modalOpen, setModalOpen] = useState(false);

    const roomNumber = localStorage.getItem('roomNumber');
    const myNickname = localStorage.getItem('nickname');

    const gameOver = () => {
        if(gameState === true) {
            history.push(`/result`);
        }
    }

    const init = async (playerData) => {
        // const  = await getPlayers(match.params.roomId);
        setPlayer(playerData['players']);
        setSelectedCategory(playerData['wordGame'].category);
        setRandom(playerData['wordGame'].test)
        if (Object.keys(playerData['players']).length === 1) {
            setTotalRound(1)}
            else {
                setTotalRound(Object.keys(playerData['players']).length - 2);
        }
        setGameState(playerData['wordGame'].isFinished);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    const handleSearch = async () => {
        player[myNickname].wordGame.inputWord = value;
        if (state.ans === value) {
            player[myNickname].wordGame.isCorrected = false;
            alert("정답");
            // 일단은 라운드 2까지 밖에 없으니까 라운드 다 되면 0으로 다시 초기화 해줍니다
            setTimeout(() => {
                if(totalRound !== round) {
                    setRound(round + 1);
                    updateGameState(roomNumber, 'isFinished', gameState);
                    setState({value: random[round].quiz, ans: random[round].answer});
                    setSeconds(30);
                }
                else {
                    setGameState(true);
                }
            }, 3000);
        } else {
            alert('오답!');
            player[myNickname].wordGame.isCorrected = false;
        }
        setValue('');
        await updateUserData(roomNumber, player);
    }

    useEffect(()=> {
        updateGameState(roomNumber, 'isFinished', gameState);
        gameOver();
    },[gameState])

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        const exit = setInterval(() => {
            setModalOpen(false)
        }, 3000)
    }
    const [startModalOpen, setStartModalOpen] = useState(true);

    const openStartModal=()=>{
        setStartModalOpen(true)
    }
    const closeStartModal = () => {
        setInterval(() => {
            setStartModalOpen(false)
        }, 5000)
    }
    closeStartModal()

    useEffect(() => {
        getPlayersOnTrigger(roomNumber, init);
        // init();
    }, []);

    useEffect(() => {
        random !== [] && random[0] !== undefined && setState({
            //isSubmitted: false,
            value: random[round].quiz,
            ans: random[round].answer
        })
    }, [random])

    console.log(random)


    // round가 증가하면 quiz state를 set
    useEffect(() => {
        random[0] !== undefined && setState({value: random[round].quiz, ans: random[round].answer});
        if (player !== undefined) {
            player[myNickname].wordGame.inputWord = "";
            updateUserData(roomNumber, player)
        }
    }, [round])

    return (
        <>
            <div className="main_wordgame">
                <div className="category"
                     style={{fontFamily: "DungGeunMo", fontWeight: "bold", fontSize: "28.4571px", textAlign: "center"}}>
                    카테고리 : {selectedCategory}
                </div>
                {!startModalOpen ? <WordGameTimer seconds={seconds} setSeconds={setSeconds} totalRound={totalRound} round={round} setRound={setRound} setValue={setValue} setGameState={setGameState}/> : null}
                <WordGameQuizBox state={state} value={value}/>
                <div style={{display: "block"}}>
                    <input className="input" type="text" value={value} placeholder={(player !== undefined && player[myNickname].wordGame.isCorrected) ? "이미 정답을 맞추셨습니다!" : "정답을 입력해주세요"}
                           onKeyPress={handleKeyPress}
                           onChange={e => setValue(e.target.value)}
                           disabled={player !== undefined && player[myNickname].wordGame.isCorrected}/>
                </div>
                <div>
                    {
                        !seconds && <TimeoutModal open={openModal} close={closeModal}>Timeout</TimeoutModal>
                    }
                </div>
                <WordGamePlayer player={player} myNickname={myNickname} roomNumber={roomNumber} round={round} updateUserData={updateUserData}/>
            </div>
            <StartModal open={startModalOpen} close={startModalOpen}/>
        </>
    );
}
