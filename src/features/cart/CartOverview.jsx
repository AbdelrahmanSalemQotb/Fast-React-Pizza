import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalQuantities } from "./cartSlice";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalQuatities = useSelector(getTotalQuantities);
  const totalPrice = useSelector(getTotalCartPrice);

  if (totalQuatities === 0) return null;
  return (
    <div className="flex justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuatities} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
