import { Link } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { RiSearch2Fill } from "react-icons/ri";
import "twin.macro";

const Header = () => {
  return (
    <div className="w-full p-2 pl-0">
      <div className="flex justify-end w-full px-6 py-4 rounded-md border border-neutral-200">
        <div tw="flex">
          Search
          <RiSearch2Fill />
        </div>
        <Link to="/">
          <FaGithub />
        </Link>
      </div>
    </div>
  );
};

export default Header;
