import React from 'react';
import {AlcoholFieldGrid} from "../../components/AlcoholMarble/AlcoholFieldGrid";

import MarbleField from '../../images/background.png';
import MarbleBG from '../../images/background.png'

export default function AlcoholMarbleView() {
    return (
        <>
            <div style={styles.marbleBg}>
                <div style={styles.rouletteBgParent}>
                    <div style={styles.rouletteBg}>
                        <AlcoholFieldGrid/>
                    </div>
                </div>
            </div>

        </>
    );
}
const styles = {
    marbleBg: {
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${MarbleBG})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },

    rouletteBgParent: {
        height: '100vh',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    rouletteBg:{
        backgroundImage: `url(${MarbleField})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        width: '822px',
        height: '740px',
        position:'relative'

        // position:'absolute',
        // left:'50%',
        // top:'50%',
        // marginLeft: '-411px',
        // marginTop: '-370px',
    }
};
