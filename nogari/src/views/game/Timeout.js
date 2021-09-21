import Modal from 'react-modal';
import './css/Timeout.css'

Modal.setAppElement('#root')

const TimeoutModal = (props) => {
    const{open,close} = props;

    return(
        <div className={open? 'openModal modal' : 'modal'}>
            { open ? (
                <div className="body">
                    시간 종료!
                    <div>
                        잠시후 바로 다음 문제가 출제됩니다.<br/>
                        준비해주세요
                    </div>
                </div>
                ) : null
            }
        </div>
    )
}
export default TimeoutModal

