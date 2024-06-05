import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useState, useEffect } from 'react';
import PropTypes from "prop-types";

const MessageBox = ({ message, onClose, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); // Optionally, you can call a callback function onClose when the message box closes automatically
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <>
      {isVisible && (
        <div className="fixed right-10 p-1 bottom-10" style={{ zIndex: '1000' }}>
        <article className="relative max-w-md border border-blue-500 py-3 px-4 bg-blue-100 rounded-sm">
            <div className="flex items-center justify-center">
                <CheckCircleIcon className=" size-5" />
                <h1 className="text-sm font-semibold ml-4 mr-4">{message}</h1>
                <button onClick={onClose} className="absolute right-4">
                    <XMarkIcon className="size-5" />
                </button>
            </div>
            <p className="text-xs mt-2 ml-7"></p>

        </article>
    </div>
      )}
    </>
  );
};

MessageBox.propTypes = {
  message: PropTypes.node.isRequired,
  onClose: PropTypes.node.isRequired,
  duration: PropTypes.node.isRequired,
}

export default MessageBox;