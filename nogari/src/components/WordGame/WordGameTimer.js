import {useEffect} from "react";

function WordGameTimer({seconds, setSeconds, round, setRound, setValue, totalRound, setGameState}) {
    useEffect(() => {
        const countdown = setTimeout(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            } else {
                setTimeout(() => {
                    setSeconds(30);
                }, 3000)
                totalRound !== round ? setRound(round + 1) : setGameState(true);
                // setState({value: random[round].quiz, ans: random[round].answer});
                setValue('');
            }
        }, 1000);
        return () => (clearTimeout(countdown));
    }, [seconds]);

    return (
        <div style={{
            fontFamily: "DungGeunMo",
            marginTop: "26px",
            fontSize: "22.2893px",
            textAlign: "center",
            lineHeight: "26px",
            lineSpacing: "0.01em",
            color: "#535353"
        }}> 남은시간
            {
                seconds >= 20 && <div style={{
                    marginTop: "15px",
                    fontFamiy: "DungGeunMo",
                    fontSize: "37.1488px",
                    textAlign: "center",
                    lineHeight: "44px",
                    lineSpacing: "0.01em",
                    color: "#1B9659"
                }}>{seconds}</div>
            }
            {
                seconds >= 10 && seconds < 20 && <div style={{
                    marginTop: "15px",
                    fontFamiy: "DungGeunMo",
                    fontSize: "37.1488px",
                    textAlign: "center",
                    lineHeight: "44px",
                    lineSpacing: "0.01em",
                    color: "#FF8F1D"
                }}>{seconds}</div>
            }
            {
                seconds < 10 && <div style={{
                    marginTop: "15px",
                    fontFamiy: "DungGeunMo",
                    fontSize: "37.1488px",
                    textAlign: "center",
                    lineHeight: "44px",
                    lineSpacing: "0.01em",
                    color: "#FF0000"
                }}>{seconds}</div>
            }

        </div>
    )
}

export default WordGameTimer
