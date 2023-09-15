import './home.less'
import HomeBackground from '../../components/background/homeBackground'
import Login from '../../components/login/login'

export default function Home() {

    return (
        <>
            <HomeBackground vertical_density={10} />
            <Login></Login>
        </>
    )

}