import { FaHome } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import halliburtonImg from "../../assets/halliburton-logo.webp";
import { useContext, useState } from "react";
import { FaThList } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import Context from "../../globalContextStore/context";
import Modal from "../../UI/Modal";
const Dashboard = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { navOpen, setNavOpen } = useContext(Context);
  const {selectedEnquiry}=useContext(Context)
  const menus = [
    {
      label: "Home",
      path: "/home",
      icon: <FaHome className="text-red-600 text-2xl mr-2" />,
    },
    {
      label: "Create",
      path: "/create",
      icon: <IoIosCreate className="text-red-600 text-2xl mr-2 ml-[2px] " />,
    },
    {
      label: "List",
      path: "/list",
      icon: <FaThList className="text-red-600 text-xl mr-3 ml-1" />,
    },
  ];
  return (
    <div className="w-full h-screen relative flex">
      {selectedEnquiry && <Modal/>}
      <div
        className={`h-full ${
          navOpen ? "flex-[2]" : "[1]"
        }  bg-[rgb(247,248,249)]  shadow-2xl  border-r transition-all duration-150 ease-linear lg:block hidden`}
      >
        <div
          className={`w-full bg-red-600 h-[3rem] flex flex-col pl-3 justify-center  cursor-pointer`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <div
            className={`w-[24px] h-[3px] mb-1 bg-white ${
              navOpen && "rotate-45 relative top-[3px]"
            } transition-all duration-200 ease-linear`}
          ></div>
          <div
            className={`w-[24px] h-[3px] mb-1 bg-white ${
              navOpen && "rotate-[-45deg] relative bottom-1"
            } transition-all duration-200 ease-linear`}
          ></div>
          {!navOpen && <div className="w-[24px] h-[3px]  bg-white"></div>}
        </div>

        {menus.map((menu, index) => (
          <div
            key={index}
            className={`w-full ${
              location.pathname == menu.path && "bg-gray-200"
            }  h-[3rem] flex  ${
              navOpen
                ? "flex-row justify-start items-center"
                : "flex-col justify-center"
            }  pl-3 cursor-pointer `}
            onClick={() => navigate(menu.path)}
          >
            {menu.icon}
            {navOpen && (
              <p className="text-xl tracking-wide font-semibold visibility">
                {menu.label}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="h-full flex-[10] bg-[#F7F8F9]">
        <div className="w-full border-b h-[3rem] shadow-lg flex justify-between lg:px-5 pr-5 items-center">
          <div
            className={`w-[3rem] bg-red-600 h-[3rem] flex flex-col pl-3 justify-center  cursor-pointer lg:hidden`}
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className={`w-[24px] h-[3px] mb-1 bg-white `}></div>
            <div className={`w-[24px] h-[3px] mb-1 bg-white `}></div>
            <div className="w-[24px] h-[3px]  bg-white"></div>
          </div>

          <p className="text-lg font-sans">Infra Pricing Tool</p>
          <div className="flex items-center">
            <FaBell className="text-xl mr-4" />
            <FaUser className="text-xl" />
          </div>
        </div>

        <div className="h-[calc(100%-3rem)] w-full overflow-scroll">{props.children}</div>
      </div>

      <div className="w-full border-t lg:h-[1.5rem] h-[3rem] shadow-lg absolute bottom-0 bg-[#F7F8F9] lg:p-1 p-2  grid grid-cols-3">
        <p className="text-gray-400  text-[12px] lg:text-right  col-span-2">
          Copywright &copy; 2023 Halliburton.All Rights Reserved.|Terms of
          use|Privacy Notice
        </p>
        <img src={halliburtonImg} className="w-[7rem] col-span-1 mx-auto" />
      </div>

      <div
        className={`fixed  flex flex-col bg-white 
          w-[45%]
        h-full z-20  border-r-gray-200 ${
          !navOpen ? "left-[-999px]" : "left-0"
        } transition-all duration-300 ease-in-out lg:hidden`}
      >
        <div
          className={`w-full bg-red-600 h-[3rem] flex flex-col pl-3 pt-1 justify-center  cursor-pointer lg:hidden`}
          onClick={() => setNavOpen(!navOpen)}
        >
          <div
            className={`w-[24px] h-[3px] mb-1 bg-white rotate-45 relative top-[3px]`}
          ></div>
          <div
            className={`w-[24px] h-[3px] mb-1 bg-white rotate-[-45deg] relative bottom-1`}
          ></div>
        </div>

        {menus.map((menu, index) => (
          <div
            key={index}
            className={`w-full ${
              location.pathname == menu.path && "bg-gray-200"
            }  h-[3rem] flex  ${
              navOpen
                ? "flex-row justify-start items-center"
                : "flex-col justify-center"
            }  pl-3 cursor-pointer `}
            onClick={() => {
              setNavOpen(false)
              navigate(menu.path);
            }}
          >
            {menu.icon}
            {navOpen && (
              <p className="text-xl tracking-wide font-semibold visibility">
                {menu.label}
              </p>
            )}
          </div>
        ))}
      </div>

      {navOpen && (
        <div
          className="bg-black opacity-[0.5] w-full h-screen absolute lg:hidden z-10 fade"
          onClick={() => setNavOpen(false)}
        ></div>
      )}
    </div>
  );
};
export default Dashboard;
