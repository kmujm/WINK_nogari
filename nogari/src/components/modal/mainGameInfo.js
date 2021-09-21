import React from 'react'

function MainGameModal(props) {
    let {open, close, gameInfo} = props;
    return (
        <div>
            {open ? (
                <div style={styles.container}>
                    <div style={styles.gameName}>{gameInfo.selectedGameName}</div>
                    <div style={styles.gameStory}>스토리: <span style={styles.content}>{gameInfo.selectedGameStory}</span></div>
                    <div style={styles.gameRule}>게임 방법: <span style={styles.content}>{gameInfo.selectedGameRule}</span></div>
                    <div style={styles.playTime}>플레이 시간: <span style={styles.content}>{gameInfo.playTime}</span></div>
                    <span className="exit-btn" onClick={close}></span>
                </div>) : null}
        </div>
    )
}

export default MainGameModal

const styles = {
    container: {
        color: '#fcce39',
        textAlign: 'left',
        width: 440,
        height: 315.46,
        backgroundColor: '#323232',
        borderRadius: 15,
        zIndex: 100,
        position: 'absolute',
        // border: '5px solid #323232',


    },
    gameName: {
        marginTop: 57,
        marginLeft: 32,
        fontSize: 32,
        marginBottom: 18,
    },
    gameStory: {
        marginLeft: 32,
        width: '80%',
        marginBottom: 18,
        fontSize: 14,
    },
    gameRule: {
        marginLeft: 32,
        width: '80%',
        marginBottom: 18,
        fontSize: 14,
    },
    playTime: {
        marginLeft: 32,
        width: '80%',
        fontSize: 14,
    },
    content: {
        opacity: 0.7,
    },
}
