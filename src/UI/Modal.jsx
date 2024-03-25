import { useContext,useState } from "react";
import Context from "../globalContextStore/context";

const Modal = () => {
  const { setSelectedEnquiry,selectedEnquiry } = useContext(Context);
  console.log(selectedEnquiry)
  const {csp,oppurtunity,products,region  }=selectedEnquiry
  const [selectedOption,setSelectedOption]=useState({monthly:true})

  const priceOfMainProduct=selectedEnquiry.products[0].term=="PAYG"?selectedEnquiry.products[0].price:(selectedEnquiry.products[0].price)/12
  const monthlyPrices=selectedEnquiry.products.map(product=>{
    return product.term=="PAYG"?(product.price)*product.users:(product.price/12)*(product.users)
  })
  const totalMonthlyPrice=monthlyPrices.reduce((acc,curr)=>acc+curr,0)
  return (
    <>
      <div className="fixed w-full h-screen bg-black/75  flex justify-center items-center z-[20]" onClick={()=>setSelectedEnquiry(null)}></div>

      <div className="w-full flex h-screen items-center justify-center absolute">
        <div className=" lg:h-[60%] h-[65%] bg-white z-30 w-[45rem] max-w-[95%] lg:p-10 p-5 flex flex-col justify-between scaleOut fadeFull">
          <p className="font-semibold lg:text-3xl text-2xl tracking-wide ">
            Enquiry Details
          </p>

          <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-0 gap-4">
            <div>
              <p className="text-sm tracking-wide mb-[2px] text-[#3b4957]">
                Oppurtunity Name
              </p>
              <p className="text-sm tracking-wide font-semibold text-[#3e4b59]">
                {oppurtunity}
              </p>
            </div>

            <div className="lg:text-left text-right">
              <p className="text-sm tracking-wide mb-[2px] text-[#3b4957]">
                Region
              </p>
              <p className="text-sm tracking-wide font-semibold text-[#3e4b59]">
                {region}
              </p>
            </div>

            <div>
              <p className="text-sm tracking-wide mb-[2px] text-[#3b4957]">
                CSP
              </p>
              <p className="text-sm tracking-wide font-semibold text-[#3e4b59]">
                {csp}
              </p>
            </div>
            <div className="lg:text-left text-right">
              <p className="text-sm tracking-wide mb-[2px] text-[#3b4957]">
                Term
              </p>
              <p className="text-sm tracking-wide font-semibold text-[#3e4b59]">
                {selectedEnquiry.products[0].term}
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center mr-5 cursor-pointer" onClick={()=>setSelectedOption({monthly:true})}>
              <div className={` rounded-full ${selectedOption.monthly?"bg-black w-[10px] h-[10px]":"w-[13px] h-[13px] border-[2.5px]"}  mr-3 transition-all duration-150 ease-linear`}></div>
              <p>Monthly</p>
            </div>
            <div className="flex items-center cursor-pointer" onClick={()=>setSelectedOption({annually:true})}>
              <div className={` rounded-full ${selectedOption.annually?"bg-black w-[10px] h-[10px]":"w-[13px] h-[13px] border-[2.5px]"}  mr-3 transition-all duration-150 ease-linear`}></div>
              <p>Annual</p>
            </div>
          </div>

          <p className="text-[#3e4b59] tracking-wide text-lg font-semibold">
            Main Products
          </p>

          <div className="w-full flex justify-between">
            <div>
              <p className="text-lg tracking-wide font-normal">
                {selectedEnquiry.products[0].name} (Singapore)
              </p>
              <p className="text-sm text-[#818F99] font-semibold    ">
                ${priceOfMainProduct.toFixed(2)} x {selectedEnquiry.products[0].users} users x {selectedOption.monthly?" 1 month":"12 months"}
              </p>
            </div>
            <p className="text-lg">${selectedOption.monthly?priceOfMainProduct.toFixed(2)*selectedEnquiry.products[0].users:(priceOfMainProduct*selectedEnquiry.products[0].users*12).toFixed(2)}</p>
          </div>

          <div className="bg-[#818F99] h-[1px]"></div>

          <div className="flex justify-between">
            <p>Total</p>
            <p>${selectedOption.monthly?totalMonthlyPrice.toFixed(2):(totalMonthlyPrice*12).toFixed(2)}</p>
          </div>

          <div className="text-right">
            <button
              className="bg-[#e0e3e6] py-1 px-4 rounded-lg"
              onClick={() => setSelectedEnquiry(null)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
