import React from 'react';
import {useHistory} from "react-router";

function Exit(props) {
    const {open, close} = props;
    const history = useHistory();

    const exitModal = () => {
        history.push("/find");
    }
    return (
        <div style={styles.container}>
            {open ? (
                <div style={styles.innerContainer}>
                    <div style={styles.title}>다른방 찾기</div>
                    <div style={styles.content}>다른방을 찾으러 이 방에서 나가시겠습니까?</div>
                    <div style={styles.btnContainer}>
                        <button style={styles.firstBtn} onClick={() => exitModal()}>나갈래용!</button>
                        <button onClick={close} style={styles.secondBtn}>취소</button>
                    </div>

                </div>
            ) : null}
        </div>
    )
}

export default Exit

const styles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        zIndex: 999,

    },
    innerContainer: {
        position: 'relative', width: 450, height: 332, borderRadius: '5%', backgroundColor: '#0c8247', border: '1px solid black',
    },
    title: {
        position: 'absolute',
        width: '100%', top: 30, fontSize: 28,
        textAlign: 'center', marginBottom: 49, color: '#fcce39', marginTop: 36,
    },
    content: {
        position: 'absolute',
        textAlign: 'center', width: '100%', fontSize: 18, color: '#fcce39', marginTop: 142,
    },
    btnContainer: {
        position: 'absolute', textAlign: 'center', width: '100%', marginTop: 241,
    },
    firstBtn: {
        backgroundColor: '#08552E', width:146, color: '#fcce39', height: 43, borderRadius: 5, border: 'none', fontSize: 20, marginRight: 28.51,
    },
    secondBtn: {
        backgroundColor: '#21AB66', width:146, color: '#fcce39', height: 43, borderRadius: 5, border: 'none', fontSize: 20,
    },
}
