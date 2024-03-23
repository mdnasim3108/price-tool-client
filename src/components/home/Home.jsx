import Dashboard from "../../layout/dashboard/Dashboard"
import enquiryImg from "../../assets/enquiryImage.png"
import { useNavigate } from "react-router-dom"
const Home=()=>{
    const navigate=useNavigate()
    return <Dashboard>
        <div className="w-full h-full pt-20">
            <div className="text-center md:p-0 px-3">
                    <p className="text-3xl font-semibold tracking-wide">Welcome to Infra Pricing Tool</p>
                    <p className="text-[16px] leading-[19.69px] text-gray-400 font-semibold tracking-wide mt-2 mb-4">Great to have you on board! Feel free to explore or getting start below!</p>
                    <div className="border hover:shadow-lg hover:scale-[1.01] transition-all duration-100 ease-linear w-[212px] h-[186px] bg-white rounded flex flex-col items-center justify-center mx-auto cursor-pointer"
                    onClick={()=>navigate("/create")}
                    >
                            <img src={enquiryImg} className="w-[4rem]"/>
                            <p className="text-lg font-bold mt-3">Create Enquiry</p>
                    </div>
            </div>
        </div>
    </Dashboard>
}
export default  Home;