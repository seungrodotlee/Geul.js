import { Link } from "gatsby";
import { FaGithub } from "react-icons/fa";
import { RiSearch2Fill } from "react-icons/ri";
import "twin.macro";
import { useOverlay } from "../../domains/@ui/overlay/use-overlay.hook";

const Header = () => {
  useOverlay("Search_Modal", );

  return (
    <div className="w-full p-2 pl-0 mb-3">
      <div className="flex items-center justify-end w-full px-6 py-2 rounded-md border border-neutral-200">
        <button tw="flex items-center px-4 py-1 rounded-full bg-neutral-100 border border-neutral-200 mr-4">
          <p tw="mr-2">Search</p>
          <RiSearch2Fill />
        </button>
        <Link to="/">
          <FaGithub tw="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
