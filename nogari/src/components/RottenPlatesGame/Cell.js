import react, {useContext,memo} from 'react';
import {TableContext,CODE, OTHER_TURN, PASS, UNPASS} from './RottenPlatesGame';
import no from './PlatesGameImage/no.png';
import pass from './PlatesGameImage/pass.png';


const getCellStyle = (code) => {


  if (code === CODE.NORMAL) {
    return {
    }
  } else if (code === CODE.CLICKED) {
    return {
      pointerEvents : 'none',
      opacity : '0.5',
    }
  }
}

const getCellItemStyle = (status, penalty) => {
  if (  status === CODE.CLICKED && penalty === "pass") {
    return {
      backgroundImage: `url(${pass})`,
    }
  } else if (status === CODE.CLICKED && penalty !== "pass") {
    return {
      backgroundImage: `url(${no})`,
    }
  }
}


const Cell = memo(( {cellId,cellIndex,cellPenalty} ) => {
  const {table,setTable,halted,setHalted,gameStatus,setGameStatus,curUser,setCurUser,selectPlate,setSelectPlate} = useContext(TableContext);

  const onClickCell = (e) => {
    if (halted) {
      return;
    }
    alert(`Result :  ${cellId} / ${cellPenalty}`);
    if(table[cellIndex].status === CODE.NORMAL) {
      if (table[cellIndex].penalty === "pass") {
        const temp = [...table];
        temp[cellIndex].status = CODE.CLICKED;
        setTable(temp);
        setGameStatus(OTHER_TURN);
        setCurUser((prev) => prev + 1);
        setSelectPlate({ispass: true, cellId : cellId, cellPenalty : cellPenalty});
        setHalted(true);
        setGameStatus(OTHER_TURN);

      } else {
        const temp = [...table];
        temp[cellIndex].status = CODE.CLICKED;
        setTable(temp);
        setGameStatus(OTHER_TURN);
        setCurUser((prev) => prev + 1);
        setSelectPlate({ispass: false, cellId : cellId, cellPenalty : cellPenalty});
        setHalted(true);
        setGameStatus(UNPASS);
      }
    }
    console.log("cellID : ", cellId, "cellIndex : ", cellIndex, "status : ", table[cellIndex].status, "cellPenalty : ", cellPenalty);
  }

  return (
    <>
      <div style = {getCellStyle(table[cellIndex].status)} className="cell" onClick={onClickCell}>
        <div className= "cellItem" style= {getCellItemStyle(table[cellIndex].status,cellPenalty)}></div>
        <div className= "Plate"></div>
      </div>
    </>
  )
})

export default Cell;