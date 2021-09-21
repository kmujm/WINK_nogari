import React, {useEffect, useState} from 'react'
import Circle from './images/yellowCircle.png'
import SuccessComponent from "./SuccessComponent";
import FailComponent from "./FailComponent";

const NominateLiar = (props) => {
    const [liarIsYou, setLiarIsYou] = useState(false);

    useEffect(() => {
        let counter = 0;
        let interval = setInterval(function () {
            counter++;
            if (counter === 5) {
                clearInterval(interval);
                setLiarIsYou(true);
            }
        }, 1000);
    }, [])

    if (!liarIsYou) {
        return (
            <div style={styles.container}>
                <div style={styles.title}>라이어는 바로 너!!</div>
                <div style={styles.innerContainer}>
                    <img src={props.profile} style={styles.imgStyle} alt="profile"/>
                    <div style={styles.nameStyle}>{props.name}</div>
                </div>
                <img src={Circle} style={styles.circle} alt="yellowcircle"/>
            </div>
        )
    }
    // 5초 지나고 지목 성공 여부 컴포넌트로 이동
    else {
        if (props.isLiar) {
            return (
                <>
                    <SuccessComponent profile={props.profile} name={props.name}/>
                </>
            )
        }
        else {
            return (
                <>
                    <FailComponent profile={props.profile} name={props.name}/>
                </>
            )
        }
    }
}
export default NominateLiar

const styles = {
    container: {
        position: 'relative',
        // border: '3px solid red',
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
    imgStyle: {
        width: 340,
        height: 386,
    },
    nameStyle: {
        color: '#FCCE39',
        fontSize: 36,
    },
    title: {
        fontSize: 32, color: '#fff',
        marginTop: 86,
    },
    circle: {
        position: 'absolute', top: -90, left: '50%', zIndex: -1, transform: 'translateX(-50%)',
        width: 850, height: 850,
    },
}
