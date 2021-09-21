import Modal from 'react-modal'
import React from 'react';

Modal.setAppElement('#root')


function StartModal(props){
    const{open,close} = props;
    const style={
        position:'absolute',
        width : '100vw',
        top:'35%',
        left:'0',
        height: '300px',
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        fontFamily: 'DungGeunMo',
        textAlign:'center',
        background:'#21AB66',
        color:'white',
        fontSize:'100px'
    }

    return(
        <>
        { open ? (
                    <div style={style}>
                        <p style={{marginTop:'100px'}}>게임 시작</p>
                    </div>
                ) : null
        }
        </>
    );
}
export default StartModal;
