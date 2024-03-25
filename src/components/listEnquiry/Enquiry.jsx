import { useContext } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Context from "../../globalContextStore/context";
const Enquiry = (props) => {
  const { setSelectedEnquiry } = useContext(Context);

  //converting the UTC time to IST time zone
  const utcTimestamp = new Date(props.time);
  const istTimestamp =new Date( utcTimestamp.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  }));
  istTimestamp.setHours(istTimestamp.getHours() + 5);
  istTimestamp.setMinutes(istTimestamp.getMinutes() +30)
  const originalTimestamp = new Date(istTimestamp);
  const formattedTimestamp = `${originalTimestamp.getMonth() + 1}/${originalTimestamp.getDate()}/${originalTimestamp.getFullYear()} ${originalTimestamp.toLocaleTimeString('en-US', { hour12: true })}`;
  
  const width = window.innerWidth;
  const clickHanlder = () => {
    if (width < 1024) {
      props.action();
    }
  };
  return (
    <div
      className="grid w-full bg-white lg:grid-cols-12 grid-cols-3"
      onClick={clickHanlder}
    >
      <div className=" p-3  lg:col-span-2">
        <p className="lg:text-[15px] md:text-[12px] text-[9px]">
          {props.oppurtunity}
        </p>
      </div>
      <div className=" p-3  lg:block hidden col-span-2">
        <p className="text-[15px] ">{props.region}</p>
      </div>
      <div className=" p-3  lg:block hidden col-span-1">
        <p className="text-[15px] ">{props.csp}</p>
      </div>
      <div className=" p-3   lg:col-span-2">
        <p className="lg:text-[15px] md:text-[12px] text-[9px]">
          {props.products.length > 1
            ? props.products[0].name +
              "," +
              props.products[1].name +
              (props.products.length > 2 ? "..." : "")
            : props.products[0].name}
        </p>
      </div>
      <div className=" p-3  lg:block hidden col-span-1">
        <p className="text-[15px] ">{props.products[0].term}</p>
      </div>
      <div className=" p-3  col-span-1">
        <p className="lg:text-[15px] md:text-[12px] text-[9px]">
          ${props.totalPrice}
        </p>
      </div>
      <div className=" p-3  lg:block hidden col-span-2">
        <p className="text-[14px] ">{formattedTimestamp}</p>
      </div>
      <div
        className=" py-4 px-8  lg:block hidden col-span-1"
        onClick={props.action}
      >
        <BiDotsVerticalRounded className="cursor-pointer" />
      </div>
    </div>
  );
};
export default Enquiry;
