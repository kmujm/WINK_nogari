import {useState,useEffect} from 'react';
import {useHistory} from "react-router";
import "./css/MainView.css"

import icon from '../main_img/main_icon.png'
import bottles from '../main_img/main_bottles.png'
import first from '../main_img/Mask Group1.png'
import second1 from '../main_img/Mask Group2-1.png'
import second2 from '../main_img/Mask Group2-2.png'
import third1 from '../main_img/Mask Group3-1.png'
import third2 from '../main_img/Mask Group3-2.png'
import third3 from '../main_img/Mask Group3-3.png'
import third4 from '../main_img/Mask Group3-4.png'
import fourth from '../main_img/Mask Group4.png'



export default function MainView() {
    const history = useHistory();
    const[sec,setSec] = useState(0)

    useEffect(()=>{
        const countdown= setInterval(()=>{
            setSec(parseInt(sec)+1)
            console.log(sec)
        },10)
        return()=> clearInterval(countdown);
    },[sec])

    const play = () => {
        history.push("/choose_char")
    }

    const story = () => {
        history.push("/story")
    }
    return (
        <>
            <div className="mainwrapper">
                <div className="main">
                    {
                        sec >10 &&<img className='bottles' src={bottles} alt='bottles'/>
                    }

                    {
                        sec > 60 && <img style={{
                            position: 'absolute',
                            zIndex: '3',
                            marginLeft: '-802px'
                        }} src={first} alt='characters'/>
                    }
                    {
                        sec>110 && <img className='second1_animate' style={{
                            position: 'absolute',
                            zIndex: '3',
                            marginTop: '60px',
                            marginLeft: '-752px'
                        }} src={second1} alt='characters'/>}
                    {
                        sec > 110 && <img className='second1_animate' style={{
                            position: 'absolute',
                            zIndex: '3',
                            width: '230px',
                            marginTop: '250px',
                            marginLeft: '-240px'
                        }} src={second2} alt='characters'/>}
                    {
                        sec>160 &&<img className='third_bl' style={{
                            position: 'absolute',
                            zIndex: '3',
                            marginTop: '310px',
                            marginLeft: '-715px'
                        }} src={third1} alt='characters'/>}
                    {
                        sec > 160 && <img className='third_bl' style={{
                            position: 'absolute',
                            zIndex: '3',
                            width: '125px',
                            marginTop: '70px',
                            marginLeft: '-295px'
                        }} src={third2} alt='characters'/>}
                    {
                        sec > 160 && <img className="third_tr" style={{
                            position: 'absolute',
                            zIndex: '3',
                            width: '120px',
                            marginTop: '200px',
                            marginLeft: '-285px'
                        }} src={third3} alt='characters'/>}
                    {
                        sec > 160 && <img className='third_tl' style={{
                            position: 'absolute',
                            zIndex: '3',
                            marginTop: '215px',
                            marginLeft: '-75px'
                        }} src={third4} alt='characters'/>}
                    {
                        sec >210 && <img className='fourth_top' style={{
                            position: 'absolute',
                            zIndex: '3',
                            marginTop: '160px',
                            marginLeft: '-605px'
                        }} src={fourth} alt='characters'/>}
                    {
                        sec > 260 && <img className="fourth_top" style={{
                            position: 'absolute',
                            zIndex: '3',
                            width: '280px',
                            marginTop: '400px',
                            marginLeft: '-545px'
                        }} src={icon} alt='characters'/>}

                    {
                        sec > 260 && <button className='fourth_top' id="btnPlay">
                            <a onClick={play}>PLAY</a>
                        </button>}
                    {
                        sec > 290 && <p className='blinking' onClick={story}>노가리 이야기 보러가기 &#9654;</p>}
                </div>
            </div>
        </>
    );
}