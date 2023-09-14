import Footer from "../components/footer/Footer"
import MainNavigationBar from "../components/header/MainNavigationBar"
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <>
            <MainNavigationBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RootLayout