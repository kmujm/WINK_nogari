import React from "react";

function WordGameQuizBox({state, value}) {
    return (
        <div className="boxwrapper">
            <div className="quizBox">
                {state !== undefined && (
                    (state.ans !== value)
                        ?
                        state.value.split('').map((letter) => (
                            <div>{letter}</div>
                        )) :
                        state.ans.split('').map((letter) => (
                            <div>{letter}</div>
                        )))
                }
            </div>
        </div>
    )
}

export default WordGameQuizBox
