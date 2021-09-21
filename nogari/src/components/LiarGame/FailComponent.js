import React, {useEffect, useState} from 'react'
import Circle from "./images/redCircle.png";
import WinLiarComponent from "./WinLiarComponent";

// 라이어 지목 실패했을 때 나타나는 컴포넌트, 5초 뒤에 라이어 승리 컴포넌트로 이동한다.
const FailComponent = (props) => {
    const [winLiar, setWinLiar] = useState(false);

    useEffect(() => {
        let counter = 0;
        let interval = setInterval(function () {
            counter++;
            if (counter === 5) {
                clearInterval(interval);
                setWinLiar(true);

            }
        }, 1000);
    }, [])

    if(!winLiar) {
        return(
            <>
                <div style={styles.container}>
                    <div style={styles.title}>라이어 지목 실패!</div>
                    <div style={styles.innerContainer}>
                        <img style={styles.imgStyle} src={props.profile} alt=""/>
                        <div style={styles.nameStyle}>{props.name}</div>
                    </div>
                    <img src={Circle} style={styles.circle} alt="redcircle"/>
                </div>
            </>
        )
    }
    // 라이어 승리 화면으로 넘어감
    else {
        return (
            <>
                <WinLiarComponent name={props.name} profile={props.profile}/>
            </>
        )
    }
}

export default FailComponent

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
