import React, {useState} from 'react';
import LiarAnswerComponent from "./LiarAnswerComponent";

// 라이어가 정답을 입력하는 컴포넌트, 라이어가 아닌 유저는 대기 화면이 나타난다.
const EnterAnswerComponent = (props) => {

    // *********라이어 화면일 때 쓰이는 코드들*********
    const [answer, setAnswer] = useState("");
    const setData = (e) => {
        setAnswer(e.target.value);
    }

    /* 내 정보, 내가 라이어 이면 정답 입력 화면 보여주고, 아니면 대기 화면 보여주게끔..
    우선 임시로 데이터 만들었음
    */
    const [userInfo, setUserInfo] = useState({
        nickname: "홍길동",
        profile: "",
        isLiar: true, // 실제로 쓰이는 변수
    });

    // '확인' 버튼 클릭 시 실행되는 함수.
    const [confirmAnswer, setConfirmAnswer] = useState(false); // true 이면, 라이어가 적은 답 보여주는 화면으로 이동
    const liarAnswerConfirm = () => {
        setConfirmAnswer(true);
    }



    // 라이어 일 때 화면
    if (userInfo.isLiar && !confirmAnswer) {
        return (
            <>
                {/*카테고리도 파이어베이스에서 가져와서 보여줘야 할 듯*/}
                <div style={styles.category}>카테고리 : 인물</div>
                <div style={styles.title}>제시어를 입력해주세요</div>
                <div>
                    <input type="text" style={styles.textInput} onChange={setData}/>
                </div>
                <div>
                    {answer ? <input type="button" value="확인" style={styles.yesBtn} onClick={liarAnswerConfirm}/> :
                        <input type="button" value="확인" style={styles.noBtn} disabled/>}
                </div>
            </>
        )
    }
    // 대기 유저 화면
    else if (!userInfo.isLiar && !confirmAnswer) {
        return (
            <>
                <div style={styles.category}>카테고리 : 인물</div>
                <div style={styles.waitTitle}>지목된 라이어가 제시어를 입력중입니다!</div>
                <div style={styles.innerContainer}>
                    <img src={props.profile} style={styles.imgStyle} alt="profile"/>
                    <div style={styles.nameStyle}>{props.name}</div>
                </div>
                <div style={styles.bottomTitle}>잠시만 기다려주세요...</div>
            </>
        )
    }
    // 라이어가 적은 답을 보여주는 화면으로 이동
    else {
        return (
            <>
                <LiarAnswerComponent answer={answer} profile={props.profile} name={props.name}/>
            </>
        )
    }
}
export default EnterAnswerComponent
const styles = {
    category: {
        fontSize: 32, marginTop: 125, marginBottom: 29,
    },
    title: {
        fontSize: 60,
    },
    textInput: {
        marginTop: 123, width: 620, fontSize: 48, textAlign: 'center',
        background: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: '1px solid black',
    },
    yesBtn: {
        marginTop: 64,
        width: 380, height: 100, backgroundColor: '#FCCE39', border: 'none',
        borderRadius: 10, fontSize: 40, color: '#FFF', cursor: 'pointer',
    },
    noBtn: {
        marginTop: 64,
        width: 380, height: 100, backgroundColor: '#7A7A7A', border: 'none',
        borderRadius: 10, fontSize: 40, color: '#FFF', cursor: 'pointer',
    },
    waitTitle: {
        fontSize: 48,
    },
    innerContainer: {
        position: 'absolute',
        width: 195,
        height: 296,
        backgroundColor: '#032213',
        left: '50%', transform: 'translateX(-50%)',
        marginTop: 86,
        borderRadius: 15,
    },
    imgStyle: {
        width: 190,
        height: 243,
    },
    nameStyle: {
        color: '#FCCE39',
        fontSize: 21.44,
    },
    bottomTitle: {
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        fontSize: 32,
        color: '#545454',
        marginTop: 438,
    },
}
