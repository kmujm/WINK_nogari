import React, {useEffect, useState} from 'react'
import AnswerViewComponent from "./AnswerViewComponent";
import WrongViewComponent from "./WrongViewComponent";

// 라이어가 입력한 정답을 보여주는 컴포넌트
const LiarAnswerComponent = (props) => {

    const [answerData, setAnswerData] = useState('7번방의 선물'); // 파이어베이스로부터 가져온 정답을 저장할 변수
    const [isAnswer, setIsAnswer] = useState(false); // 해당 변수가 true이면, 라이어가 정답을 맞춘 것
    const [changeComponent, setChangeComponent] = useState(false); // 해당 변수가 true가 되면, 정답 또는 오답 화면으로 이동

    // 라이어가 입력한 답을 5초 동안 보여주고 정답, 오답 여부 화면으로 이동
    useEffect(() => {
        let counter = 0;
        let interval = setInterval(function () {
            counter++;
            if (counter === 5) {
                clearInterval(interval);
                if (answerData === props.answer) {
                    setIsAnswer(true);
                    setChangeComponent(true);
                } else {
                    setIsAnswer(false);
                    setChangeComponent(true);
                }

            }
        }, 1000);
    }, []);

    if (!changeComponent) {
        return (
            <>
                {/*liar nickname도 파이어베이스에서 받아와야 할 것 같음*/}
                <div style={styles.title}>''님이 입력한 제시어</div>
                <div style={styles.answer}>{props.answer}</div>
            </>
        )
    }
    // 라이어가 정답을 맞추었을 때 이동할 컴포넌트
    else if (changeComponent && isAnswer) {
        return (
            <>
                <AnswerViewComponent name={props.name} profile={props.profile}/>
            </>
        )
    }
    // 라이어가 정답을 맞추지 못했을 때 이동할 컴포넌트
    else if (changeComponent && !isAnswer) {
        return (
            <>
                <WrongViewComponent name={props.name} profile={props.profile}/>
            </>
        )
    }

}

export default LiarAnswerComponent

const styles = {
    title: {
        fontSize: 43.28,
        marginTop: 200, marginBottom: 46,
    },
    answer: {
        color: '#0C8247',
        fontSize: 160,
    },
}
