import './userPanel.less'

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import getCookie from '../../../getCookie';
import searchIcon from '../../../assets/search.svg'
import CustomButton from '../../common/customButton/customButton';

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
            navigate("/publicGallery")
        else
            navigate("/publicGallery/" + searchInput.current?.value)
    }

    const logOut = () => {
        document.cookie = 'username=; Max-Age=0'
        document.cookie = 'token=; Max-Age=0'
        navigate("/publicGallery")
    }

    return <div className="panel-wrapper">

        <div className="user-panel">
            <div className="account-wrapper" onClick={() => navigate("/publicGallery/@" + username)}>
                <div className="title">
                    <h1>your work</h1>
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
            <div className='login-panel'><p>logged in as <b>{username}</b></p><CustomButton justText text='log out' whenClicked={logOut} text_size={1.1} color='#cfcfcf' /></div>
            : null}
    </div>


}