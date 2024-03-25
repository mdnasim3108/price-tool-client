import { MdDelete } from "react-icons/md";
const Product = (props) => {
  const availableProducts = [1, 2];
  return (
    <div className="w-full lg:h-[135px] h-max border-2 border-gray-300 rounded-lg mt-4 fadeFull">
      <div className="w-full h-[2.5rem] border-y-2 bg-[#eff1f3] rounded-t-lg px-4 py-2 flex justify-between items-center">
        <p className="font-semibold lg:text-xl text-lg">{props.name}</p>
        <MdDelete
          className="text-xl cursor-pointer hover:text-red-600 transition-all duration-100 ease-linear"
          onClick={() => props.remove(props.id)}
        />
      </div>
      <div className="w-full grid lg:grid-cols-8 grid-cols-1 py-2 lg:px-4 px-3 gap-5">
        <div className="lg:col-span-4">
          <p className="text-sm font-semibold mb-1">Product Name</p>
          <select className="bg-[#F7F8F9] w-full p-2 border-2 border-gray-300 rounded-lg outline-none" onChange={(e)=>props.update({id:+(e.target.value.split(" ")[1]),name:e.target.value},props.id)}>
            <option value={"Product " +props.id} >Product {props.id}</option>
            {availableProducts
              .filter(
                (product) =>
                  !(props.products.map((product) => product.id).includes(product))
              )
              .map((product) => (
                <option key={product}  value={"Product " +product}>Product {product}</option>
              ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold mb-1">Term</p>
          <select className="bg-[#F7F8F9] w-full p-2 border-2 border-gray-300 rounded-lg outline-none" onChange={(e)=>props.update({term:e.target.value},props.id)}>
            <option value="1 Year">1 Year</option>
            <option value="3 Years">3 Years</option>
            <option value="PAYG">PAYG</option>
          </select>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold mb-1 w-max">Number of Users</p>
          <select className="bg-[#F7F8F9] w-full p-2 border-2 border-gray-300 rounded-lg outline-none" onChange={(e)=>props.update({users:e.target.value},props.id)}>
            <option value={1}>1</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Product;
