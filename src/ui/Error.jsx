import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const error = useRouteError();
  console.log({ error, message: error.message, data: error.data });

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message || error.data || error}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
