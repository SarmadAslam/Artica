const RelatedWorkCard = ({ img, title, description, price, onClick }) => {
  return (
    <div 
      className="card rounded-xl shadow-xl cursor-pointer hover:shadow-2xl transition duration-300 h-[350px] flex flex-col" 
      onClick={onClick}
    >
      <div className="h-[60%]">
        <img src={img} alt={title} className="w-full h-full object-cover rounded-t-xl" />
      </div>
      <div className="p-3 h-[40%] flex flex-col justify-between">
        <h3 className="text-lg text-[#421983] font-medium">{title}</h3>
        <p className="text-sm text-[#F35E21]">{description} • {price}</p>
      </div>
    </div>
  );
};

export default RelatedWorkCard;
