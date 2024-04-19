import { getDataProduct } from "@/utils/getData";
import { RiShoppingCartLine } from "@remixicon/react";
import { IProduct } from "../types";
import { HeaderCurrent } from "@/components/headerCurrent";
import Footer from "@/components/footer";

const productById = async ({ params }: { params: { profile: string } }) => {
  const dataProducts = await getDataProduct("http://localhost:3000/products");
  const productbyid = dataProducts.find(
    (product: IProduct) => String(product.id) === params.profile
  );
if (!productbyid) {
  return <div>No se encontró el producto</div>; // O manejar el caso de producto no encontrado de otra manera
}

const { id, name, description, price, stock, image, categoryId } = productbyid;
 

  return (
    <>
      <HeaderCurrent />
      <div
        key={id}
        id={String(id)}
        className="border-2 flex flex-col justify-between items-center h-auto  py-2 bg-slate-100
        md:w-3/4 md:flex-row  md:m-auto md:gap-8 md:px-8 md:bg-inherit">
        <div className=" bg-white w-full ">
          <img src={image} alt={name} className="h-80 mx-auto md:p-0 rounded-lg  p-2 " />
        </div>

        <div className="flex flex-col items-center  justify-around px-8 gap-8 my-2 bg-white">
          <h1 className="text-2xl">{name}</h1>
          <h3 className="text-red-500 text-3xl">{`${price} $`}</h3>
          <p>{description}</p>
          <div className="flex justify-between items-center w-full px-8 py-4 ">
            <div className="flex justify-between items-center gap-4">
              <div className="w-auto  border-2 border-red-300 flex fl">
                <button>+</button>
                <input
                  type="text"
                  value="1"
                  className="text-center block w-8"
                />
                <button>-</button>
              </div>
              <h3 className="text-red-500 text-xl">{`${stock} Unidades Disponibles`}</h3>
            </div>

            <div className="bg-red-500 rounded-full w-8 h-8 flex justify-center items-center" >
              <RiShoppingCartLine color="#ffffff" size={25} />
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default productById;