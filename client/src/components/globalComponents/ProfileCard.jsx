import { FaEnvelope } from "react-icons/fa";
import Button from "./Button";
import imagePath from "../../constraints/imagepath";

const ProfileCard = ({ img, name, job, socials, button }) => {
  return (
    <div className="px-6 py-8 rounded-xl shadow-xl space-y-4 text-center">
      <img src={imagePath+ img} alt={name} className="w-32 h-32 mx-auto rounded-full object-cover" />
      <div>
        <strong className="block text-2xl">{name}</strong>
        <span className="block text-[#4B5563] text-">{job}</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        {socials.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="text-xl text-[#4B5563] hover:text-black">
            <social.icon />
          </a>
        ))}
      </div>
      <Button text={button.text} variant={button.variant} icon={button.icon || FaEnvelope} className="w-full" />
    </div>
  );
};

export default ProfileCard;
