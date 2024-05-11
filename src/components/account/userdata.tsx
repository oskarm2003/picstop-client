import { useNavigate } from "react-router-dom"
import CustomButton from "../common/customButton/customButton"

export default function Userdata({ id, username, email, update_timestamp }:
    { id: number, username: string, email: string, update_timestamp: number }) {

    const navigate = useNavigate()

    const convertToDate = (timestamp: number | undefined): string => {
        if (timestamp === undefined) return convertToDate(Date.now())
        const format = (str: string | number) => {
            str = str + ''
            if (str.length < 2) return "0" + str
            else return str
        }
        const date = new Date(timestamp)
        return `${format(date.getDate())}.${format(date.getMonth())}.${date.getFullYear()} ${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`
    }

    return <div>
        <h3>{username}</h3>
        <p className="description">
            <b>id:&nbsp;</b>{id}<br />
            <b>email:&nbsp;</b>{email}<br />
            <b>last modified:&nbsp;</b>{convertToDate(update_timestamp)}<br />
        </p>
        <CustomButton color="#5f5fff" justText text="view your photos" whenClicked={() => navigate("/gallery/@" + username)} />
    </div>

}