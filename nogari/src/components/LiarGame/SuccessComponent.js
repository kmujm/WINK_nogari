import React, {useEffect, useState} from 'react'
import Circle from "./images/greenCircle.png";
import EnterAnswerComponent from "./EnterAnswerComponent";

const SuccessComponent = (props) => {
    const [answer, setAnswer] = useState(false); // true 이면 라이어가 정답을 입력하는 화면, 다른 플레이어는 대기 화면으로 이동


    // 5초 뒤에 라이어 제시 화면 또는 대기 플레이어 화면으로 넘어가는 함수
    useEffect(() => {
        let counter = 0;
        let interval = setInterval(function () {
            counter++;
            if (counter === 5) {
                clearInterval(interval);
                setAnswer(true);
            }
        }, 1000);
    }, [])

    if (!answer) {
        return(
            <>
                <div style={styles.container}>
                    <div style={styles.title}>라이어 지목 성공!</div>
                    <div style={styles.innerContainer}>
                        <img style={styles.imgStyle} src={props.profile} alt=""/>
                        <div style={styles.nameStyle}>{props.name}</div>
                    </div>
                    <img src={Circle} style={styles.circle} alt="greencircle"/>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <EnterAnswerComponent name={props.name} profile={props.profile}/>
            </>
        )
    }
}

export default SuccessComponent

const styles = {
    container: {
        position: 'relative',
    },
    imgStyle: {
        width: 340,
        height: 386,
    },
    nameStyle: {
        color: '#FCCE39',
        fontSize: 36,
    },
    title: {
        fontSize: 32, color: '#FFF',
        marginTop: 86,
    },
    innerContainer: {
        position: 'absolute',
        width: 328,
        height: 497,
        backgroundColor: '#032213',
        left: '50%', transform: 'translateX(-50%)',
        marginTop: 86,
        borderRadius: 15,
    },
    circle: {
        position: 'absolute', top: -90, left: '50%', zIndex: -1, transform: 'translateX(-50%)',
        width: 850, height: 850,
    },
}
