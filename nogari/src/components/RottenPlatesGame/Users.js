import react, {useContext,memo} from 'react';
import {TableContext} from './RottenPlatesGame';
import User from './User';



const Users = memo(() => {
  const {curUser,setCurUser,userlist,setUserList} = useContext(TableContext);

  return (
    <>
    <div className="UserContainer">
      {userlist.map((item,index)=>{return <User userIndex={index} userName={item.userName} userId={item.id} userStatus={item.status}></User>})}
    </div>
    </>
  )

})

export default Users;