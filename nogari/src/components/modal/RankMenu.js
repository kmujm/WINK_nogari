import react,{useState,memo} from 'react';
import Modal from 'react-modal';
import RankMenuLeftItem from './RankMenuLeftItem';
import RankMenuRightItem from './RankMenuRightItem'

const menuModalStyle = {
	overlay: {
		position: 'absolute',
		right: 0,
		bottom: 0,
		width: '881px',
		height: '679px',
		backgroundColor: 'rgba(0, 0, 0, 0)',
		zIndex: 100,
		left: '51%',
		transform: 'translateX(-50%)',
	},

	content: {
		position: 'absolute',
		top: '40px',
		left: '40px',
		right: '40px',
		bottom: '40px',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '10px',
		outline: 'none',
		width: '750px',
		padding: '10px',
		height: '578.04px',
		backgroundColor: '#1B9659',
	}
};

const userList = [
	{
		name: "김호준",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 0,
		badges: [0, 1, 2, 3, 4,11,5,6],
	},
	{
		name: "임성원",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 1,
		badges: [0, 1, 2,6,2],
	},
	{
		name: "이종휘",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 2,
		badges: [0, 3,13,13],
	},
	{
		name: "김지성",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 3,
		badges: [13,13,13,13],
	},
	{
		name: "신재혁",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 4,
		badges: [0, 1, 2, 3, 4],
	},
	{
		name: "박정민",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 5,
		badges: [0, 11,,8,],
	},
	{
		name: "정나영",
		nickName: "청춘",
		charType: "마른 오징어",
		rank: 6,
		badges: [0, 1, 2, 3, 4],
	},
]

const RankMenu = memo(({ stateData, isMenuOpenFun }) => {
	const childIsMenuOpenFun = () => {
		isMenuOpenFun(false);
	}
	const [maxPageNum, setMaxPageNum] = useState(Math.ceil((userList.length-1)/3));
	const [pageNum,setPageNum] = useState(1);


	const onClickLeftBtn = () => {
		if (pageNum > 1) {
			setPageNum((prev)=>prev-1);
		}
		console.log(pageNum);
	}

	const onClickRightBtn = () => {
		if (maxPageNum > pageNum) {
			setPageNum((prev)=> prev+1);
		}
		console.log(pageNum);
	}

	const changeRightList = () => {
		const result = [];
		let stack = 0;
		for(let i=(pageNum === 1 ? 1 : (pageNum*2)+(pageNum-2) ); stack < 3; i++) {
			if (i >= userList.length ) {
				return result;
			}
			result.push(<RankMenuRightItem data={userList[i]}></RankMenuRightItem>);
			stack++;
		}
		return result;
	}

	return (
		<>
			<Modal id="menuModal" isOpen={stateData.isMenuOpen} style={menuModalStyle}>
				<div id="backBtn" onClick={isMenuOpenFun}>X</div>
				<div className="menuWraper">
					<div className="menuTitle">
						<div>오늘의 </div>
						<div>베스트 안주는</div>
					</div>
					<div className="menuRankContainer">
						<div className="menuRankLeft">
							<RankMenuLeftItem data={userList[0]}></RankMenuLeftItem>
						</div>
						<div className="menuRankRight">
							{changeRightList()}
							<div className="scrollBtnContainer">
								<div className="leftBtn" onClick={onClickLeftBtn}>◀︎</div>
								<div className="rightBtn" onClick={onClickRightBtn}>▶︎</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	)
})

export default RankMenu;




{/* <Modal id="menuModal" isOpen={room.isMenuOpen} onRequestClose={() => setRoomState('isMenuOpen', false)} style={menuModalStyle}>
                        <div id="backBtn" onClick={isMenuOpenFun}>X</div>
                        <div className="menuWraper">
                            <div className="menuTitle">오늘의<br/>베스트 안주는</div>
                            <div className="menuRankContainer">

                                <div className="menuRankLeft">
                                    <div className="LeftName">1위 <br/>청춘 김민석</div>
                                    <div className="LeftTitle">마른 오징어</div>
                                    <div className="LeftImage">이미지</div>
                                    <div className="LeftBadgeContainer">
                                        받은뱃지
										<div className="LeftBadges">
										<div className="LeftBadge">+</div>
										<div className="LeftBadge">+</div>
										<div className="LeftBadge">+</div>
										</div>
                                    </div>
                                </div>

                                <div className="menuRankRight">

                                    <div className="menuRankRightWrapper">
                                        <div className="menuRangkRightContainer">

                                            <div className="rightRank">2위</div>
                                            <div className="rightTitle">청춘 김민석</div>
                                            <div className="rightBadgeContainer">
                                                <div className="rightBadgeTitle">받은뱃지</div>
													<div className="rightBadges">
													<div className="rightBadge">+</div>
													<div className = "rightBadge">+</div>
													<div className = "rightBadge">+</div>
													<div className = "rightBadge">+</div>
												</div>
                                            </div>
                                        </div>
                                        <div className="rightImage">이미지</div>
                                    </div>

                                    <div className="menuRankRightWrapper">
                                        <div className="menuRangkRightContainer">

                                            <div className="rightRank">2위</div>
                                            <div className="rightTitle">청춘 김민석</div>
                                            <div className="rightBadgeContainer">
                                                <div className="rightBadgeTitle">받은뱃지</div>
													<div className="rightBadges">
													    <div className="rightBadge">+</div>
													    <div className = "rightBadge">+</div>
													    <div className = "rightBadge">+</div>
													    <div className = "rightBadge">+</div>
												</div>
                                            </div>
                                        </div>
                                        <div className="rightImage">이미지</div>
                                    </div>

                                    <div className="menuRankRightWrapper">
                                        <div className="menuRangkRightContainer">
                                            <div className="rightRank">2위</div>
                                            <div className="rightTitle">청춘 김민석</div>
                                            <div className="rightBadgeContainer">
                                                <div className="rightBadgeTitle">받은뱃지</div>
													<div className="rightBadges">
    													<div className="rightBadge">+</div>
    													<div className = "rightBadge">+</div>
														<div className = "rightBadge">+</div>
														<div className = "rightBadge">+</div>
													</div>
                                            </div>
                                        </div>
                                        <div className="rightImage">이미지</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal> */}