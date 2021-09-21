import React, {createElement, useState} from 'react';
import '../css/AlcoholMarblePlayer.css';

export default function AlcoholMarblePlayer(props){
    const user = useState({
        '김지성' : 0,
        '박정민' : 0,
        '정나영' : 0,
        '이종휘' : 0,
    });

    return <div>
        {user.map((user) => {
            return <div content={user} > </div>; //original={[{nickname: field + '/'}]}
        })}
    </div>;
}
