import { useDispatch, useSelector } from "react-redux";
import { addCartItem, getCurrentQuantityById } from "../cart/cartSlice";

import { formatCurrency } from "../../utils/helpers";

import Button from "../../ui/Button";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import DeleteItem from "../cart/DeleteItem";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      name,
      pizzaId: id,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addCartItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut && "opacity-50 grayscale"}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {!soldOut && !isInCart && (
            <Button type={"small"} onClick={handleAddToCart}>
              Add to Cart
            </Button>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <DeleteItem pizzaId={id} />

              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
