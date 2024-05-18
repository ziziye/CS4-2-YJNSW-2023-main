import { Alert } from "nsw-ds-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>We’re sorry about this...</h1>
      <Alert as="info" title="The page you’re looking for has been moved or no longer exists.">
        <p>
          Click here to navigate to the{" "}
          <Link to="/" target="_parent" data-cy="notfound-homelink">
            homepage
          </Link>
          .
        </p>
      </Alert>
    </>
  );
}

export default NotFound;
