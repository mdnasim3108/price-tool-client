import Dashboard from "../../layout/dashboard/Dashboard";
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import Product from "./Product";
import { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {api} from "../../constants"
import { Cookies } from "react-cookie";
import ClipLoader from "react-spinners/ClipLoader";
import Context from "../../globalContextStore/context";
import convertTime from "../../../utils/convertTime";
const CreateEnquiry = () => {
  const cookies=new Cookies();
  const availableProducts = [1, 2];
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", term: "1 Year", users: 1 },
  ]);
  const [info, setInfo] = useState({
    oppurtunity: null,
    csp: null,
    region: null,
  });
  const [regions,setRegions]=useState([])
  useEffect(()=>{
    axios.get(`${api}/fetchRegions`)
    .then(res=>setRegions(res.data))
  },[])
  const {setEnquiries,enquiries}=useContext(Context)
  const [loading,setLoading]=useState(false)
  const { oppurtunity, csp, region } = info;
  const navigate = useNavigate();
  const addProductHandler = () => {
    const addedProducts = products.map((product) => product.id);
    const nextProduct = availableProducts.find(
      (product) => !addedProducts.includes(product)
    );
    if (nextProduct) {
      setProducts((previousProducts) => {
        return [
          ...previousProducts,
          {
            id: nextProduct,
            name: "Product " + nextProduct,
            term: "1 Year",
            users: "1",
          },
        ];
      });
    } else {
      toast.error("Maximum number of products added");
      return;
    }
  };
  const removeProductHandler = (id) => {
    if (products.length == 1) {
      toast.error("You must have at least one product");
      return;
    }
    setProducts((previousProducts) =>
      previousProducts.filter((product) => product.id != id)
    );
  };
  const updateProductHandler = (action, id) => {
    const index = products.findIndex((product) => product.id == id);
    const updatedProducts = [...products];
    updatedProducts[index] = { ...updatedProducts[index], ...action };
    setProducts(updatedProducts);
  };

  const informationChangeHandler = (field, value) => {
    setInfo((previousInfo) => {
      return { ...previousInfo, [field]: value };
    });
  };
  const submitHandler = () => {
    
    if (!oppurtunity || !csp || !region) {
      toast.error("please fill all fields in general information");
      return;
    }
    setLoading(true)
    axios.post(`${api}/createEnquiry`,{email:cookies.get("user"),info,products})
    .then(res=>{
      const {csp,oppurtunity,products,region,totalPrice,createdAt}=res.data;
      setEnquiries([...enquiries,{csp,oppurtunity,products,region,totalPrice,time:convertTime(createdAt)}])
      setLoading(false)
      toast.success("Enquiry created successfully")
      navigate("/list")
    })
    .catch(error=>{
      setLoading(false)
      toast.error(error.message)
    })
  };
  return (
    <Dashboard>
      <Toaster />
      <div className="w-full h-full">
        <div className="w-full h-[calc(100%-1.5rem)]  relative">
          <div className="w-full lg:h-full  lg:p-5 py-5 px-3">
            <div className="lg:h-[20%]">
              <div>
                <span className="mr-3 text-blue-400 text-sm">Homepage</span>
                <span className="mr-3 text-sm">/</span>
                <span className="text-sm">Create Enquiry</span>
              </div>

              <p className="font-semibold lg:text-3xl text-2xl tracking-wide mt-5">
                Create Enquiry
              </p>
            </div>

            <div className="flex lg:flex-row flex-col w-full lg:mt-0 mt-5  lg:h-[calc(80%-3rem)] ">
              <div className="h-[300px] w-full flex flex-col justify-between shadow-lg lg:flex-[8] mr-3 rounded-lg border lg:px-7 px-5 pb-5 pt-6 mb-5">
                <p className="font-semibold lg:text-3xl text-2xl tracking-wide w-max">
                  General Information
                </p>

                <div>
                  <p className="text-sm font-semibold tracking-wide mb-2">
                    Opportunity Name
                  </p>
                  <input
                    type="text"
                    id="oppurtunity"
                    className="  border-2 border-gray-300 rounded-lg outline-none text-gray-900 text-sm   lock w-full p-2.5  bg-transparent"
                    placeholder="Company 1"
                    onChange={(e) =>
                      informationChangeHandler(e.target.id, e.target.value)
                    }
                    required
                  />
                </div>

                <div className="">
                  <p className="text-sm font-semibold tracking-wide mb-2">
                    Preferred Cloud Service Provider
                  </p>
                  <input
                    type="radio"
                    name="csp"
                    value="AWS"
                    onChange={(e) =>
                      informationChangeHandler(e.target.name, e.target.value)
                    }
                  />
                  <span className="ml-2 mr-3 relative bottom-[1px]">AWS</span>
                  <input
                    type="radio"
                    name="csp"
                    value="Azure"
                    className="ml-3"
                    onChange={(e) =>
                      informationChangeHandler(e.target.name, e.target.value)
                    }
                  />
                  <span className="ml-2 relative bottom-[1px]">Azure</span>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2 ">Region</p>
                  <select
                    className="bg-[#F7F8F9] w-full p-2 border-2 border-gray-300 rounded-lg outline-none"
                    id="region"
                    onChange={(e) =>
                      informationChangeHandler(e.target.id, e.target.value)
                    }
                  >
                    <option hidden value="">
                      Select region
                    </option>

                    {
                     regions.length && regions.map(region=><option value={region}>{region}</option>)
                    }
                    {/* <option value="South Africa North">South Africa North</option>
                    <option value="North America">North America</option> */}
                  </select>
                </div>
              </div>

              <div
                className={`${
                  products.length > 1
                    ? "h-full border-t border-x shadow-lg"
                    : "border shadow-lg lg:h-[300px]"
                }    lg:flex-[15] rounded-lg  lg:px-7 px-5 pb-5 pt-6 lg:mb-0 mb-[4rem] transition-all duration-100 ease-linear`}
              >
                <div
                  className={`w-full flex justify-between ${
                    products.length > 1 && "lg:h-[10%]"
                  }`}
                >
                  <p className="font-semibold lg:text-3xl text-2xl tracking-wide">
                    Product List
                  </p>
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={addProductHandler}
                  >
                    <IoMdAdd className="text-lg" />
                    <p className="lg:text-lg text-sm font-semibold ml-1">
                      Add Product
                    </p>
                  </div>
                </div>

                <div
                  className={` w-full  ${
                    products.length > 1 && "lg:h-[90%] lg:overflow-scroll"
                  }`}
                >
                  {products.map((product) => (
                    <Product
                      {...product}
                      key={product.id}
                      products={products}
                      remove={removeProductHandler}
                      update={updateProductHandler}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2 border-gray-300 lg:bg-transparent bg-white z-10 w-full h-[3rem] text-right  lg:absolute lg:bottom-0 fixed bottom-[3rem] lg:pr-5 pr-3 lg:pt-[6px] pt-[6px]">
            <button
              className="bg-[#e0e3e6] py-1 px-4 rounded-lg"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
            <button
              className={`py-1 w-[5rem] rounded-lg  ${(!oppurtunity || !csp || !region)?"bg-[#e8eced] text-[#818f99]":"bg-[#2b3847] text-white"}  ml-3 transition-all duration-150 ease-linear`}
              onClick={submitHandler}
              disabled={(!oppurtunity || !csp || !region || loading) }
            >
              {loading?<ClipLoader size={15} color="white"/>:"Create"}
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};
export default CreateEnquiry;
