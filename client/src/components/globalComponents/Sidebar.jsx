import PropTypes from 'prop-types';
const Sidebar = ({ isSidebarOpen, toggleSidebar, buttons, navigate }) => (
  <div
    className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[#7782FF] to-white w-64 shadow-lg transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } transition-transform duration-300 ease-in-out z-50`}
  >
    <div className="flex justify-end p-4">
      <button onClick={toggleSidebar}>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div className="flex flex-col p-4 gap-4">
      {buttons.map((item, index) => (
        <button
          key={index}
          className="text-left mb-2 border-b border-[#FFF2F2] font-semibold px-2 py-1 hover:text-primary"
          onClick={() => {
            navigate(item.path);
            toggleSidebar();
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  </div>
);
Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired, 
  toggleSidebar: PropTypes.func.isRequired, 
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,  
      path: PropTypes.string.isRequired,  
    })
  ).isRequired, 
  navigate: PropTypes.func.isRequired, 
};
export default Sidebar;
