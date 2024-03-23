import { useContext } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Context from "../../globalContextStore/context";
const Enquiry=(props)=>{
    const {setSelectedEnquiry}=useContext(Context)
    const width=window.innerWidth
    const clickHanlder=()=>{
      if(width<1024){
        props.action()
      }
    }
    return <div className="grid w-full bg-white lg:grid-cols-12 grid-cols-3" onClick={clickHanlder}>
    <div className=" p-3  lg:col-span-2">
      <p className="lg:text-[15px] text-[12px]">{props.oppurtunity}</p>
    </div>
    <div className=" p-3  lg:block hidden col-span-2">
      <p className="text-[15px] ">{props.region}</p>
    </div>
    <div className=" p-3  lg:block hidden col-span-1">
      <p className="text-[15px] ">{props.csp}</p>
    </div>
    <div className=" p-3   lg:col-span-2">
      <p className="lg:text-[15px] text-[12px]">
        {props.products.length > 1 ?props.products[0].name +","+props.products[1].name+"..." : props.products[0].name}
      </p>
    </div>
    <div className=" p-3  lg:block hidden col-span-1">
      <p className="text-[15px] ">PAYG</p>
    </div>
    <div className=" p-3  col-span-1">
      <p className="lg:text-[15px] text-[12px]">$4400</p>
    </div>
    <div className=" p-3  lg:block hidden col-span-2">
      <p className="text-[14px] ">10/8/2022 11:57:09 AM</p>
    </div>
    <div className=" py-4 px-8  lg:block hidden col-span-1" onClick={props.action}>
    <BiDotsVerticalRounded className="cursor-pointer"/>
    </div>
  </div>
}
export default Enquiry