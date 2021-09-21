import React from 'react'
import Effect from '../../images/effect.png'

const CompletionVoteComponent = (props) => {

    // 몇 초 뒤에 대기실로 이동하는 건 구현 안했음 일단은 .. 디자인만 완성


    const user = props.location.state.user;
    const images = props.location.state.img;
    return (
        <div style={{position: 'relative'}}>
            <img style={styles.effect} src={Effect} alt=""/>
            <div style={styles.title}><span style={{color: '#FCCE39'}}>‘{user}’</span>님이 선정되었습니다!!</div>
            <div style={styles.container}>
                <div><img style={styles.imgStyle} src={images} alt=""/></div>
                <div style={styles.user}>{user}</div>
            </div>
            <div style={styles.description}>잠시후 자동으로 대기실로 이동됩니다...</div>
        </div>
    )
}
export default CompletionVoteComponent;

const styles = {
    title: {
        position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center',
        fontSize: 40, marginTop: 150,
    },
    box: {
        position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center',
    },
    container: {
        width: 260, height: 393, backgroundColor: '#032213', borderRadius: 7.19, marginTop: 311,
        position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center',
    },
    imgStyle: {
        width: 269, height: 316,
    },
    user: {
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        fontSize: 23.46, color: '#FCCE39', textAlign: 'center', marginTop: 18,
    },
    description: {
        fontSize: 20, color: '#585858', position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        marginTop: 750,
    },
    effect: {
      position: 'absolute', width: 911, height: 334, top: 480, left: '50%', transform: 'translate(-50%,-50%)',
    },
}
