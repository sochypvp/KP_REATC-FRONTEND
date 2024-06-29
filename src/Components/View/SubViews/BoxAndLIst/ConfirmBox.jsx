const ConfirmBox = ({ close, action }) => {
  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-75"
    >
      <div className="relative w-full max-w-md p-2 bg-white rounded-lg shadow dark:bg-gray-800">
        {/* Modal content */}
        <div className="relative p-4 text-center sm:p-5">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-2.5 right-2.5 p-1.5 ml-auto text-gray-700 bg-transparent rounded-lg text-sm hover:bg-gray-200"
            onClick={close}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {/* Trash icon */}
          {/* Modal text */}
          <p className="mb-4 text-gray-900">We will contact you after you order?</p>
          {/* Modal action buttons */}
          <div className="flex justify-center items-center space-x-4">
            <button
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
              onClick={close}
            >
              No, cancel
            </button>
            <button
              onClick={action}
              type="submit"
              className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmBox;