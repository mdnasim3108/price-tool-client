import { useEffect, useState } from "react";
import Context from "./context";
import { Cookies } from "react-cookie";
import { api } from "../constants";
import axios from "axios";
import convertTime from "../../utils/convertTime";
const Provider = (props) => {
  const cookies = new Cookies();
  const [navOpen, setNavOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiries, setEnquiries] = useState(null);
  const fetchEnquiries = (email) => {
    axios.post(`${api}/getEnquiries`,{email}).then((res) => {
      setEnquiries(res.data.map(enquiry=>{
        return {...enquiry,time:convertTime(enquiry.createdAt)}
      }));
    }) 
    .catch(er=>console.log(er))
  };
  useEffect(() => {
    if (cookies.get("user")) {
        fetchEnquiries(cookies.get("user"))
    }
  },[]);
  const contextValues = {
    navOpen,
    setNavOpen,
    selectedEnquiry,
    setSelectedEnquiry,
    enquiries,
    setEnquiries,
    fetchEnquiries
  };
  return (
    <Context.Provider value={contextValues}>{props.children}</Context.Provider>
  );
};
export default Provider;