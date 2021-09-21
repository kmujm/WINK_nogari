import '../css/selectGame.css'

function GameInfo(props) {
    let {open, close, gameInfo} = props;


    if (gameInfo.id === 0) {
        return (
            <div className="firstContainer">
                {open ? (
                    <div className="first-inner-container">
                        <div className="gameName">{gameInfo.gameName}</div>
                        <div className="story">스토리: <span className="story-title">{gameInfo.story}</span></div>
                        <div className="method">게임 방법: <span className="method-title">{gameInfo.description}</span></div>
                        <div className="runningTime">플레이 시간: <span className="time-title">{gameInfo.runningTime}</span></div>
                        <span className="exit-btn" onClick={close}></span>
                    </div>
                ) : null}
            </div>
        )
    }
    else if (gameInfo.id === 1) {
        return (
            <div className="secondContainer">
                {open ? (
                    <div className="second-inner-container">
                        <div className="gameName">{gameInfo.gameName}</div>
                        <div className="story">스토리: <span className="story-title">{gameInfo.story}</span></div>
                        <div className="method">게임 방법: <span className="method-title">{gameInfo.description}</span></div>
                        <div className="runningTime">플레이 시간: <span className="time-title">{gameInfo.runningTime}</span></div>
                        <span className="exit-btn" onClick={close}></span>
                    </div>
                ) : null}
            </div>
        )
    }
    else if (gameInfo.id === 2) {
        return (
            <div className="thirdContainer">
                {open ? (
                    <div className="third-inner-container">
                        <div className="gameName">{gameInfo.gameName}</div>
                        <div className="third-story">스토리: <span className="story-title">{gameInfo.story}</span></div>
                        <div className="third-method">게임 방법: <span className="method-title">{gameInfo.description}</span></div>
                        <div className="third-runningTime">플레이 시간: <span className="time-title">{gameInfo.runningTime}</span></div>
                        <span className="exit-btn" onClick={close}></span>
                    </div>
                ) : null}
            </div>
        )
    }
    else {
        return (
            <div className="fourthContainer">
                {open ? (
                    <div className="fourth-inner-container">
                        <div className="gameName">{gameInfo.gameName}</div>
                        <div className="story">스토리: <span className="story-title">{gameInfo.story}</span></div>
                        <div className="method">게임 방법: <span className="method-title">{gameInfo.description}</span></div>
                        <div className="runningTime">플레이 시간: <span className="time-title">{gameInfo.runningTime}</span></div>
                        <span className="exit-btn" onClick={close}></span>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default GameInfo
