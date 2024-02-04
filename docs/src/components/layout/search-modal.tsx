import tw, { css } from "twin.macro";
import Modal from "../overlay/modal/modal";

const searchModalCSS = tw`
  fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30
`;

const SearchModal = () => {
  return (
    <Modal>
      <Modal.Header></Modal.Header>
    </Modal>
  );
};
