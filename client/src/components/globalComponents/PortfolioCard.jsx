import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useState } from "react";

const PortfolioCard = ({ img, title, description, year }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="card rounded-xl shadow-xl relative">
      <div className="absolute mb-5 top-4 right-4 text-[#4B5563] flex items-center gap-2">
        <span className='block  rounded-full bg-white p-2 shadow-xl' onClick={handleLike}>
          {isLiked ? <FaHeart className="text-red-500"  /> : <FaRegHeart />}
        </span>
        <span className='block rounded-full bg-white p-2 shadow-xl'>
          <svg width="16" height="16" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.59375 0.0875192C9.23438 0.246894 9 0.606269 9 1.00002V3.00002H5.5C2.4625 3.00002 0 5.46252 0 8.30002C0 12.0406 2.54688 13.6219 3.13125 13.9406C3.20937 13.9844 3.29688 14 3.38438 14C3.725 14 4 13.7219 4 13.3844C4 13.15 3.86562 12.9344 3.69375 12.775C3.4 12.4969 3 11.95 3 11C3 9.34377 4.34375 8.00002 6 8.00002H9V10C9 10.3938 9.23125 10.7531 9.59375 10.9125C9.95625 11.0719 10.375 11.0063 10.6687 10.7438L15.6687 6.24377C15.8781 6.05314 16 5.78439 16 5.30002C16 5.21564 15.8812 4.94689 15.6687 4.75627L10.6687 0.256269C10.375 -0.00935575 9.95312 -0.0749808 9.59375 0.0875192Z" fill="#4B5563"/>
          </svg>
        </span>
      </div>
      <div className="min-h-[15rem]">
        <img src={img} alt={title} className='h-full min-h-[20rem] rounded-t-xl'/>
      </div>
      <div className="p-4">
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-s text-[#4B5563]'>{description} • {year}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
