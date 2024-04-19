import { registerFormArray } from "@/utils/registerFormArray";
import { HeaderCurrent } from "../headerCurrent";
import Footer from "../footer";

const Register: React.FC = (): React.ReactElement => {
  return (
    <>
      <HeaderCurrent />
      <form className="md:w-1/3 m-auto md:my-20">
        {registerFormArray.map((itemForm) => {
          return (
            <div key={itemForm.name} className="flex flex-col border-2">
              <label className="flex gap-4 " htmlFor={itemForm.name}>
                {itemForm.icon}
                {itemForm.label}
              </label>
              <input
                type={itemForm.type}
                name={itemForm.name}
                placeholder={itemForm.placeholder}
                required={itemForm.required}
                className="border-2 mx-1/3"
              />
            </div>
          );
        })}
          </form>
          <Footer/>
    </>
  );
};

export default Register;