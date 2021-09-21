import React, {useEffect, useState} from 'react'
import LoseLiarComponent from "./LoseLiarComponent";

// 오답 화면을 보여주는 컴포넌트, 3초 뒤 라이어 패배 컴포넌트로 이동
const WrongViewComponent = (props) => {

    const [changeComponent, setChangeComponent] = useState(false);

    useEffect(() => {
        let counter = 0;
        let interval = setInterval(function () {
            counter++;
            if (counter === 3) {
                clearInterval(interval);
                setChangeComponent(true);

            }
        }, 1000);
    }, []);

    if (!changeComponent) {
        return (
            <>
                <div style={styles.container}><span style={styles.answer}>오 - 답</span></div>
            </>
        )
    }
    else {
        return (
            <>
                <LoseLiarComponent name={props.name} profile={props.profile}/>
            </>
        )
    }
}

export default WrongViewComponent

const styles = {
    container: {
        width: '100%', height: 363, marginTop: 180,
        backgroundColor: '#B00404', position: 'relative',
    },
    answer: {
        position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)', fontSize: 100, color: '#FFF', left: '50%',
    }
}
