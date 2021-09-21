import react, {useState,useContext,memo} from 'react';
import {TableContext} from './RottenPlatesGame';
import user0 from './PlatesGameImage/1.png';
import user1 from './PlatesGameImage/2.png';
import user2 from './PlatesGameImage/3.png';
import user3 from './PlatesGameImage/4.png';
import user4 from './PlatesGameImage/5.png';
import user5 from './PlatesGameImage/6.png';


const getUserStyle = (index) => {

  if ( index == 0 ) {
    return {
    backgroundImage: `url(${user0})`,
    }
  }
  if ( index == 1 ) {
    return {
    backgroundImage: `url(${user1})`,
    }
  }
  if ( index == 2 ) {
    return {
    backgroundImage: `url(${user2})`,
    }
  }
  if ( index == 3 ) {
    return {
    backgroundImage: `url(${user3})`,
    }
  }
  if ( index == 4 ) {
    return {
    backgroundImage: `url(${user4})`,
    }
  }
  if ( index == 5 ) {
    return {
    backgroundImage: `url(${user5})`,
    }
  }
  
}

const getUserWrapperStyle = (index,curIndex) => {
  if (curIndex == index) {
    return {
      border: '5px yellow solid',
    }
  } else {
    return {
      border: '',
    }
  }
}


const User = memo(( {userId,userName,userIndex} ) => {
  const {curUser,setCurUser,userlist,setUserList} = useContext(TableContext);

  return (
    <>
      <div className = "userWrapper" style = {getUserWrapperStyle(userIndex, curUser)}>
        <div className="userImage" style={getUserStyle(userIndex)}>
        </div>
        <div className="userName">
          {userName}
        </div>
      </div>
    </>
  )

})

export default User;