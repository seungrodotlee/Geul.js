import { Link } from "gatsby";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <div className="w-full p-2 pl-0">
      <div className="flex justify-end w-full px-6 py-4 rounded-md border border-neutral-200">
        <Link to="/">
          <FaGithub />
        </Link>
      </div>
    </div>
  );
};

export default Header;
