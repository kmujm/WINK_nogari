import React,{useState,useEffect,useRef} from 'react'

export default function LiarModal(props) {
    const {open, close} = props;
    const [sec, setSec] = useState(3);
    const userTimer = useRef();

    useEffect(() => {
        console.log(props.isOpen);
        if (sec <= 0) {

        } else if (props.isOpen) {
            userTimer.current = setTimeout(() => {
                setSec((prev) => prev - 1);
            }, 1000)
        }
        return () => {
            clearTimeout(userTimer);
        }
    }, [sec, props.isOpen])



    return (
        <div>
            {open ? (
                <div style={styles.container}>
                    <div style={styles.headerTitle}>당신은</div>
                    <div style={styles.title}>라·이·어</div>
                    <div style={styles.content}>정체를 숨기고 제시어를 알아내세요!</div>
                    <div style={styles.userCount}>{sec}</div>
                    <span style={styles.description}>다른 플레이어들이 제시어를 확인할 때까지 잠시 기다려주세요.</span>
                </div>
            ) : null}
        </div>
    )
}
const styles = {
    container: {
        width: 1920,
        height: 1080,
        top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        position: 'absolute',
        textAlign: 'center', backgroundColor: '#000',
    },
    headerTitle: {
        marginTop: 261, marginBottom: 31, color: '#fff', fontSize: 24,
    },
    title: {
        color: '#FF0000',
        fontSize: 120, fontWeight: 'bold', marginBottom: 59.72,
    },
    content: {
        color: '#fff',
        fontSize: 18, fontWeight: 'normal', marginBottom: 168,
    },
    btn: {
        width: 112,
        height: 40,
        color: '#8f8f8f', fontSize: 18,
    },
    description: {
        color:'#FCCE39', fontSize: 19.12,
    },
    userCount: {
        color: '#fff', marginBottom: 29,
    }
}
