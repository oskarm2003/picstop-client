import './home.less'
import HomeBackground from '../../components/home/background/homeBackground'
import Login from '../../components/home/login/login'

export default function Home() {

    return (
        <>
            {/* <h1 className="app-title">PicStop</h1> */}
            <HomeBackground vertical_density={10} />
            <Login></Login>
        </>
    )

}