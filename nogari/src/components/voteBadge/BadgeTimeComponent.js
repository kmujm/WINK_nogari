import React from 'react'


const BadgeTimeComponent = () => {
    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>뱃지 수여 TIME~♬</div>
        </div>
    )
}
export default BadgeTimeComponent;

const styles = {
    container: {
        position: 'relative', width: '100%',
    },
    innerContainer: {
        // width 이렇게 하면 안될 듯?
        width: '100%',
        height: 163,
        backgroundColor: '#FCCE39',
        fontSize: 100,
        marginTop: 150,
        position: 'absolute',
        lineHeight: 1.5,
        zIndex: 100,
    },
}
