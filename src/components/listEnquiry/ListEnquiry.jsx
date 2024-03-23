import { useNavigate } from "react-router-dom";
import Dashboard from "../../layout/dashboard/Dashboard";
import Enquiry from "./Enquiry";
import { useContext, useState } from "react";
import Context from "../../globalContextStore/context";
import { ClipLoader } from "react-spinners";
const ListEnquiry = () => {
  const navigate = useNavigate();
  const { enquiries, setSelectedEnquiry } = useContext(Context);
  return (
    <Dashboard>
      <div className="w-full h-full lg:px-8 px-4 ">
        <div className="w-full flex justify-between items-center h-[10%]">
          <p className="font-semibold lg:text-3xl text-2xl tracking-wide ">
            Enquiry List
          </p>
          <button
            className={`py-1 px-5 rounded  bg-[#2b3847] text-white ml-3 transition-all duration-150 ease-linear`}
            onClick={() => navigate("/create")}
          >
            Create Enquiry
          </button>
        </div>

        {enquiries ? (
          enquiries.length?
          <div className="lg:h-[90%]">
            <div className="lg:h-[80%]">
              <div className="grid w-full bg-[#e8eced] lg:grid-cols-12 grid-cols-3  lg:h-[10%]  lg:mt-0 mt-5">
                <div className="lg:border-r-[3px] border-r-[1px] border-gray-300 p-3  lg:col-span-2">
                  <p className="lg:text-[12px] sm:text-[11px] text-[9px] font-semibold">
                    OPPURTUNITY NAME
                  </p>
                </div>
                <div className="border-r-[3px] border-gray-300 p-3  lg:block hidden col-span-2">
                  <p className="text-[12px] font-semibold">REGION</p>
                </div>
                <div className="border-r-[3px] border-gray-300 p-3  lg:block hidden col-span-1">
                  <p className="text-[12px] font-semibold">CSP</p>
                </div>
                <div className="lg:border-r-[3px] border-r-[1px] border-gray-300 p-3   lg:col-span-2">
                  <p className="lg:text-[12px] sm:text-[11px] text-[9px] font-semibold">
                    PRODUCTS
                  </p>
                </div>
                <div className="border-r-[3px] border-gray-300 p-3  lg:block hidden col-span-1">
                  <p className="text-[12px] font-semibold">TERM</p>
                </div>
                <div className="lg:border-r-[3px] border-r-[1px] border-gray-300 p-3  col-span-1">
                  <p className="lg:text-[12px] sm:text-[11px] text-[9px] w-max font-semibold">
                    TOTAL PRICE
                  </p>
                </div>
                <div className="border-r-[3px] border-gray-300 p-3  lg:block hidden lg:col-span-2">
                  <p className="text-[12px] font-semibold">LAST UPDATED</p>
                </div>
                <div className="border-r-[3px] border-gray-300 p-3  lg:block hidden col-span-1">
                  <p className="text-[12px] font-semibold">ACTIONS</p>
                </div>
              </div>
              <div
                className={`lg:h-[90%]  overflow-scroll lg:overflow-scroll `}
              >
                {
                  enquiries.map((enquiry, index) => (
                    <Enquiry
                      {...enquiry}
                      key={index}
                      action={() => setSelectedEnquiry(enquiry)}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          : (
            <div className="flex items-center justify-center lg:h-[90%] mb-10">
              <p className="font-bold text-2xl tracking-wider">
                You dont have any Enquiries
              </p>
            </div>
          )
        ) : (
          <div className="lg:h-[90%] flex items-center justify-center mb-10">

            <ClipLoader size={50}/>

          </div>
        )}
      </div>
    </Dashboard>
  );
};
export default ListEnquiry;
