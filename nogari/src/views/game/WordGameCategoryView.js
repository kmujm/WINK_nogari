import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import Category from "../../components/common/Category";
import './css/WordGameCategoryView.css'

export default function WordGameCategoryView({ match } ) {
    const [isChoice, setIsChoice] = useState(false);

    const history = useHistory();
    const roomId = match.params.roomId;

    const WordGameCategoryChoice = () => {
        history.push(`/rooms/${roomId}/word`);
    }
    return (
        <>
            <div id='WordGameCategoryContainer'>
                <p id='WordGameCategoryHeader'>중간고사 서바이벌!</p>
                <Category
                    setIsChoice = {setIsChoice}
                    roomId={roomId}
                />
                {isChoice ? <button id='WordGameCategoryChoice_after' onClick={() => WordGameCategoryChoice()}>선택하기</button> :<button id='WordGameCategoryChoice_before'>선택하기</button> }
            </div>

        </>
    )
}
