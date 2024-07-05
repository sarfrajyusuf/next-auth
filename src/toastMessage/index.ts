// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";

const CustomToaster = (status: any, message: any) => {
  if (status) {
    return toast.success(message);
  } else {
    return toast.error(message);
  }
};

export default CustomToaster;
