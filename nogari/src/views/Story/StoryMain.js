import React,{useState} from 'react';
import './css/Story.css';
import StoryBackImgFirst from '../img/StoryBackImage1.png';
import StoryBackImgSecond from '../img/StoryBackImage2.png';
import StoryBackImgEnd from '../img/StoryBackImage3.png';

const getBackImg = (index) => {
  if ( index === 0 ) {
    return {
      backgroundImage : `url(${StoryBackImgFirst})`,
    }
  } else if (index === 1) {
    return {
      backgroundImage: `url(${StoryBackImgSecond})`,
    }
  } else {
    return {
      backgroundImage: `url(${StoryBackImgEnd})`,
    }
  }
}




// 정답 화면을 보여주는 컴포넌트, 3초 뒤 라이어 승리 컴포넌트로 이동
export default function StoryMain ({ history }) {
  const [curIndex,setCurIndex] = useState(0);

  const getTextMsg = (index) => {
    if (index === 0) {
      return (
        <div>
          "건조되어 안주상에 올려진지도 20년.. <br/> 마른안주로 태어나 많은 사랑을 받은 나는.. 더 많은 인간들에게 사랑받는 안주가 되고싶었다!!!! <br/>그리고 드디어 오늘!!! 안주계의 최고 아웃풋 명문 안주대학교 첫 수업을 듣는 날이다!!!"
        </div>
      )
    } else if (index === 1) {
      return (
        <div>
          그렇게 입학한 국립 안주대학교에는 딸기 빙수, 치즈볼같이 별스타그램에서 <br/>팔로워가 어마어마한 연반인 뿐만 아니라 떡볶이, 치킨등 전교 1등을 놓쳐본 적 없다는 범생이들과<br/> 카라멜 팝콘 같은 해외 유학파 학생들이 득실득실했다.<br/> 나... 과연 베스트메뉴가 될 수 있을까...?
        </div>
      )
    } else {
      return (
        <div>
          <div>
            이쁘고 맛도 좋은 안주들이 판을 치는 이 험난한 안주 대학교에서<br/> 말라비틀어진 내가 살아남을 수 있게 
          </div>
          <div className="storyMsgMid">니네들이 날좀 도와줘!</div>
          <div className="storyMsgEnd">(제발)</div>
        </div>
      )
  }
}

  const BtnNext = () => {
    if(curIndex <2 ){
      setCurIndex((prev)=> prev+1);
    }
  }

  const BtnEnd = () => {
    setCurIndex(0);
  }

  const BtnStartGame = () => {
    history.push("/choose_char")
  }

  return (
  <>
    <div>노가리 스토리</div>
    <div className="StoryMainContainer" style={getBackImg(curIndex)}>
    <div className= "storyMsg">{getTextMsg(curIndex)}</div>
      {curIndex < 2 ? <div onClick={BtnNext} className="storyBtn">NEXT PAGE</div> :
      <div className="endBtnsContainer">
        <div onClick={BtnStartGame} className="storyBtn">게임하기</div>
        <div onClick={BtnEnd} className="storyBtn">다시보기</div>
      </div>
      }
      
      

    </div>
    
  </>
  )
}
