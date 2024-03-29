// Filename - loader.js
import { red } from "@mui/material/colors";
import { TailSpin } from "react-loader-spinner";
const Spinner = () => {
  return (
    <TailSpin
      height="80"
      width="80"
      color="black"
      marginTop="200px"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export default Spinner;
