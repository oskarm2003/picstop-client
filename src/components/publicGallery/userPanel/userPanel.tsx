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

    const search = () => { }

    return <div className="user-panel">
        <div className="account-wrapper">
            <div className="title">
                <h1>account</h1>
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
            <img src={searchIcon} alt="looking glass" />
        </div>
    </div>

}