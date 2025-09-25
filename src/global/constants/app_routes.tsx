import { IoCreateSharp, IoSearchOutline } from "react-icons/io5";
import { MdCalculate } from "react-icons/md";
import { PiPlus } from "react-icons/pi";

export const APP_ROUTES = [
  {
    path: "/",
    label: "Explore Vaults",
    icon: <IoSearchOutline className="size-5" />,
    value: "explore",
  },
  {
    path: "/create-vault-page",
    label: "Create a Vault",
    icon: <PiPlus className="size-5" />,
    value: "create",
  },
  {
    path: "/calculate-mkt-cap",
    label: "Mkt Cap Calculator",
    icon: <MdCalculate className="size-5" />,
    value: "calculate",
  },
  {
    path: "/create-token",
    label: "Create ERC20 token",
    icon: <IoCreateSharp className="size-5" />,
    value: "create-token",
  },
];
