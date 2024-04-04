// Filename - loader.js
import { red } from "@mui/material/colors";
import { TailSpin } from "react-loader-spinner";
const Spinner = () => {
  return (
    <TailSpin
      color="black"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export default Spinner;
