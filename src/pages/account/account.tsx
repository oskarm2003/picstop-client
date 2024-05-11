import { useNavigate } from "react-router-dom";
import AccountPanel from "../../components/account/accountPanel";
import CustomButton from "../../components/common/customButton/customButton";
import './account.less'

export default function Account() {

    const navigate = useNavigate()

    return <div className="account-wrapper">
        <AccountPanel />
        <CustomButton
            text="back to browsing"
            whenClicked={() => navigate("/gallery")}
            justText
            color="white"
        />
    </div>

}