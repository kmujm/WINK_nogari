import React from 'react';
import AlcoholMarbleCard from './AlcoholMarbleCard'
import AlcoholMarblePlayer from './AlcoholMarblePlayer'

export default function AlcoholMarbleField(){
    return(
        <>
            <ul>
                <AlcoholMarbleCard myPosition="end"/>
                <AlcoholMarbleCard myPosition="mid"/>
                <AlcoholMarbleCard myPosition="mid"/>
                <AlcoholMarbleCard myPosition="mid"/>
                <AlcoholMarbleCard myPosition="mid"/>
                <AlcoholMarbleCard myPosition="start"/>
                <AlcoholMarblePlayer name="A"/>
                <AlcoholMarblePlayer name="B"/>
                <AlcoholMarblePlayer name="C"/>
                <AlcoholMarblePlayer name="D"/>
            </ul>

        </>
    )
}