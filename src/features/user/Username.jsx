import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

function Username() {
  const username = useSelector(getUsername);

  if (!username) return null;
  return (
    <span className="hidden text-sm font-semibold md:block">{username}</span>
  );
}

export default Username;
