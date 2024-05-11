import './userPanel.less'

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import getCookie from '../../../getCookie';
import searchIcon from '../../../assets/search.svg'

export default function UserPanel() {

    const navigate = useNavigate()

    const searchInput = useRef<HTMLInputElement>(null)

    //get logged user
    const username = getCookie('username')

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            search()
        }
    }

    const search = () => {
        if (searchInput.current === undefined) return
        if (searchInput.current?.value === "")
            navigate("/gallery")
        else
            navigate("/gallery/" + searchInput.current?.value)
    }

    const onUserPanelClick = () => {
        if (username === undefined) navigate("/")
        else navigate("/account")
    }

    return <div className="panel-wrapper">

        <div className="user-panel">
            <div className="account-wrapper" onClick={onUserPanelClick}>
                <div className="title">
                    <h1>{username === undefined ? "log in" : "account"}</h1>
                </div>
            </div>
            <div className="post-wrapper" onClick={() => navigate('../postPhoto')}>
                <div className="title">
                    <h1>post a photo</h1>
                </div>
            </div>
            <div className="search-wrapper">
                <input
                    ref={searchInput}
                    onKeyDown={(e) => onKeyDown(e)}
                    placeholder='search'
                    type="text"
                    className="search-bar" />
                <img src={searchIcon} alt="looking glass" onClick={search} />
            </div>
        </div>
        {username ?
            <div className='login-panel'><p>logged in as <b>{username}</b></p></div>
            : null}
    </div>


}