
import { RecoilRoot } from 'recoil'
import { DashBoard0 } from './DashBoard/DashBoard0'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './DashBoard/DashBoard'
import { LoginDashBoard } from './DashBoard/LoginDashBoard'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {

    return (
        <div>
            <BrowserRouter>
                <RecoilRoot>
                    <Routes>
                        <Route path='/' element={<DashBoard0 />} />
                        <Route path='/main' element={<LoginDashBoard />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Routes>

                </RecoilRoot>
            </BrowserRouter>
            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

    )

}


export default App

