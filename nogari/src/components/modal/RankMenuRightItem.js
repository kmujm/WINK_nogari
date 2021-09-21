import React,{memo} from 'react';
import bedge1 from '../../views/img/뱃지-01.png';
import bedge2 from '../../views/img/뱃지-02.png';
import bedge3 from '../../views/img/뱃지-03.png';
import bedge4 from '../../views/img/뱃지-04.png';
import bedge5 from '../../views/img/뱃지-05.png';
import bedge6 from '../../views/img/뱃지-06.png';
import bedge7 from '../../views/img/뱃지-07.png';
import bedge8 from '../../views/img/뱃지-08.png';
import bedge9 from '../../views/img/뱃지-09.png';
import bedge10 from '../../views/img/뱃지-10.png';
import bedge11 from '../../views/img/뱃지-11.png';
import bedge12 from '../../views/img/뱃지-12.png';


const getBedgeImg = (id) => {
  if (id == 0) {
    return {
      backgroundImage: `url(${bedge1})`,
      backgroundSize: 'contain',
    }
  } else if (id == 1) {
    return {
      backgroundImage: `url(${bedge2})`,
      backgroundSize: 'contain',
    }
  } else if (id == 2) {
    return {
      backgroundImage: `url(${bedge3})`,
      backgroundSize: 'contain',
    }
  } else if (id == 3) {
    return {
      backgroundImage: `url(${bedge4})`,
      backgroundSize: 'contain',
    }
  } else if (id == 4) {
    return {
      backgroundImage: `url(${bedge5})`,
      backgroundSize: 'contain',
    }
  } else if (id == 5) {
    return {
      backgroundImage: `url(${bedge6})`,
      backgroundSize: 'contain',
    }
  } else if (id == 6) {
    return {
      backgroundImage: `url(${bedge7})`,
      backgroundSize: 'contain',
    }
  } else if (id == 7) {
    return {
      backgroundImage: `url(${bedge8})`,
      backgroundSize: 'contain',
    }
  } else if (id == 8) {
    return {
      backgroundImage: `url(${bedge9})`,
      backgroundSize: 'contain',
    }
  } else if (id == 9) {
    return {
      backgroundImage: `url(${bedge10})`,
      backgroundSize: 'contain',
    }
  } else if (id == 10) {
    return {
      backgroundImage: `url(${bedge11})`,
      backgroundSize: 'contain',
    }
  } else if (id == 11) {
    return {
      backgroundImage: `url(${bedge12})`,
      backgroundSize: 'contain',
    }
  }else {
    return {
      backgroundColor : 'black',
    }
  }
}

const RankMenuRightItem = memo(({data}) => {

  const makeBadges = () => {
    const badges = [];
    for (let i = 0; i < data.badges.length; i++) {
      if (i >= 8) {
        return badges;
      }
      badges.push(<div key={"rightBade" + i} className="rightBadge" style={getBedgeImg(data.badges[i])}></div>);
    }
    return badges;
  }

  return (
    <>
      <div className="menuRankRightWrapper">
        <div className="menuRangkRightContainer">
          <div className="rightRank">{data.rank+1}위</div>
          <div className="rightTitle">{data.nickName} {data.name}</div>
          <div className="rightBadgeContainer">
            <div className="rightBadgeTitle">받은뱃지</div>
            <div className="rightBadges">
              {makeBadges()}
            </div>
          </div>
        </div>
        <div className="rightImage">이미지</div>
      </div>
    </>
  )
})

export default RankMenuRightItem;

{/* <div className="menuRankRightWrapper">
  <div className="menuRangkRightContainer">
    <div className="rightRank">2위</div>
    <div className="rightTitle">청춘 김민석</div>
    <div className="rightBadgeContainer">
      <div className="rightBadgeTitle">받은뱃지</div>
      <div className="rightBadges">
        <div className="rightBadge">+</div>
        <div className="rightBadge">+</div>
        <div className="rightBadge">+</div>
        <div className="rightBadge">+</div>
      </div>
    </div>
  </div>
  <div className="rightImage">이미지</div>
</div> */}