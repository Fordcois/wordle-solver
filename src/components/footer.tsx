import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { FaGlobeEurope } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { SiKofi } from "react-icons/si";



const Footer: React.FC = () => {


return (
<div className="footer">
  <span className="Footerlink"> 
    <a href="https://github.com/Fordcois" target="_blank" rel="noopener noreferrer"><AiFillGithub className="FooterReactIcon"/></a>
    <span className="tooltiptext">Check Out my Github</span>
  </span>
  <span className="Footerlink">
    <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer"><FaGlobeEurope className="FooterReactIcon"/></a>
    <span className="tooltiptext">Visit my Website</span>
  </span>
  <span className="Footerlink">
    <a href="mailto:business@frdmedia.co.uk?subject=Solvr Feedback"><IoIosMail className="FooterReactIcon"/></a>
    <span className="tooltiptext">Email Me</span>
  </span>
  <span className="Footerlink">
    <a href="https://ko-fi.com/fordcois" target="_blank" rel="noopener noreferrer"><SiKofi className="FooterReactIcon"/></a>
    <span className="tooltiptext">Buy me a Ko-fi</span>
  </span>
</div>
  );
};

export default Footer;