const { default: Link } = require("next/link");

const NotFound = () => {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go to Home Page</Link>
    </div>
  );
};

export default NotFound;
