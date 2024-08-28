import { toast } from "react-toastify";
const GlobalNotify = (message, type) => {
  switch (type) {
    case "s":
      toast.success(message, {
        position: "top-center",
        autoClose: 2000, // 2 seconds
      });
      break;
    case "e":
      toast.error(message, {
        position: "top-center",
        autoClose: 2000, // 2 seconds
      });
      break;
    case "i":
      toast.info(message, {
        position: "top-center",
        autoClose: 2000, // 2 seconds
      });
      break;
    default:
      toast(message, {
        position: "top-center",
        autoClose: 2000, // 2 seconds
      });
  }
};
export default GlobalNotify;
