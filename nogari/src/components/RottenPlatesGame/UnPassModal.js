import react, {useContext,memo,useState} from 'react';
import {TableContext,CODE, OTHER_TURN, PASS, UNPASS, END_GAME} from './RottenPlatesGame';
import userImg from './PlatesGameImage/계란말이_스탠딩.png';

const getUserImg = () => {
  return {
    backgroundImage : `url(${userImg})`,
  }
}

const EndBtnStyle = () => {
  return {
    
    
  }
}

const UnPassModal = memo(() => {
  const {owner,selectedPlate,curUser,gameStatus,setGameStatus} = useContext(TableContext);
  const [isEndClicked,setIsEndClicked] = useState(false);

  const onClickEndBtn = () => {
    setIsEndClicked(true);
    // setGameStatus(END_GAME);
  }

  return (
    <div className = "UnPassModal" >
      <div className ="UnPassTrash">폐기</div>

      <div className="ImgContainer">
        <div className ="UnPassUserImg" style={getUserImg()}></div>
        <div className = "UnPassUserName">청춘 김민석</div>
      </div>

      { owner === true ?
      <div>
        <div className = "btnContainer">
          <div className= "UnPassModalBtn">다시 하기</div>
          <div className= "UnPassModalBtn" onClick={onClickEndBtn}>끝내기</div>
        </div>
          {isEndClicked && <div className="EndMessage">게임 종료</div>}
      </div>
      
      :
      <div className= "UnPassMessage">
        <div>술래가 게임 재시작 여부를 확인하는 중입니다.</div>
        <div>잠시만 기다려주세요!</div>
      </div>
      }
    </div>
  )
})

export default UnPassModal;