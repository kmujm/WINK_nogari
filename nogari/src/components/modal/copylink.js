import React from 'react';

function CopyLink(props) {
    const {open, close} = props;
    return (
        <div style={styles.container}>
            {open ? (
                <div style={styles.innerContainer}>
                    <div style={styles.title}>링크로 초대하기</div>
                    <div style={styles.content}>링크가 복사되었습니다.</div>
                    <div style={styles.content2}>같이 할 친구에게 보내 게임에 초대하세요!</div>
                    <div style={styles.btnContainer}>
                        <button onClick={close} style={styles.btn}>알겠슴둥!</button>
                    </div>

                </div>
            ) : null}
        </div>
    )
}

export default CopyLink

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
    content2: {
        position: 'absolute',
        textAlign: 'center', width: '100%', fontSize: 18, color: '#fcce39', marginTop: 164,
    },
    btnContainer: {
        position: 'absolute', textAlign: 'center', width: '100%', marginTop: 241,
    },
    btn: {
        backgroundColor: '#21AB66', width:146, color: '#fcce39', height: 43, borderRadius: 5, border: 'none', fontSize: 20,
    },
}
