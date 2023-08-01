import Type from "../components/Type"
import { AiFillGithub } from "react-icons/ai";
import { SiMedium } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

export const LandingPage = () => {
  
  return (
    <div className="flex flex-col text-center font-bold w-full">
      <p className="text-black text-4xl leading-8 my-8">Every </p>
      <div className="text-orange-500 font-extrabold text-6xl"><Type /></div>
      <div className="text-black text-4xl leading-8 my-8"> knows what <span className="text-orange-500">StackOverflow</span> is.</div>
      <p className="text-2xl leading-8 my-8 text-orange-500">Here's my version.</p>
      <p className="text-black text-2xl leading-8 my-8">Click on the links below to reach out!</p>
      <ul className="flex flex-row justify-center text-5xl my-8">
        <li className="mx-2 text-orange-600 hover:text-orange-500 hover:scale-110">
          <a
            href="https://github.com/binh-ngo"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub />
          </a>
        </li>
        <li className="mx-2 text-orange-600 hover:text-orange-500 hover:scale-110">
          <a
            href="https://www.linkedin.com/in/binh-nguyen-ngo/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </li>
        <li className="mx-2 text-orange-600 hover:text-orange-500 hover:scale-110">
          <a
            href="https://www.binhngo.me/"
            target="_blank"
            rel="noreferrer"
          >
            <CgWebsite />
          </a>
        </li>
        <li className="mx-2 text-orange-600 hover:text-orange-500 hover:scale-110">
          <a
            href="https://medium.com/@binhnngo"
            target="_blank"
            rel="noreferrer"
          >
            <SiMedium />
          </a>
        </li>
      </ul>
    </div>
  )
}
