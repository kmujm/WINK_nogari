import React from 'react';
import '../css/AlcoholMarbleCard.css'

export default function AlcoholMarbleCard(props){
    const Data = ['주루마블','주루마블','주루마블','주루마블','주루마블','주루마블'];
    const StartData = ['Start','주루마블','주루마블','주루마블','주루마블','주루마블'];
    const isMid = props.myPosition === "mid";
    const isStart = props.myPosition === "start";

    return(
        <>
            {	isMid ?
                (<ul>
                    {Data.map((item,index)=>{
                        return (index === 0 || index === 5) ? (<div className="card">{item}</div>) : (<div className="hidden">{item}</div>)
                    })}
                </ul>) : (
                    isStart ?
                        (<ul>
                            {StartData.map((item,index)=>{
                                return (<div className="card">{item}</div>)
                            })}
                        </ul>) :
                        (<ul>
                            {Data.map((item,index)=>{
                                return (<div className="card">{item}</div>)
                            })}
                        </ul>)
                )

            }

        </>
    )
}
