import {toast} from 'react-toastify';
import {asset} from "../../services/Helpers/Image/image";

export const showToast = (image = '', message, top = true) => {
    toast.success(
        <div className="content" style={{width: "200px", height: "100px"}}>
            <h6>{message}</h6>
            {
                image !== '' ?
                    <div className="image">
                        <img src={asset(image)} alt="toast image"/> <span>Thank you!</span>
                    </div>
                    :
                    ''
            }
        </div>,
        {
            position: top ? toast.POSITION.TOP_RIGHT : toast.POSITION.BOTTOM_LEFT
        }
    );
}
