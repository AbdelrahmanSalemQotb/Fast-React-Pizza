import { useDispatch } from "react-redux";
import { deleteCartItem } from "./cartSlice";
import Button from "../../ui/Button";

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <Button type="small" onClick={() => dispatch(deleteCartItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
