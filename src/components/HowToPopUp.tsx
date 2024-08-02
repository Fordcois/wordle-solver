import React from "react";
import { ImCross } from "react-icons/im";

type setshowHelpPopUp = (show: boolean) => void;
interface HeaderProps {
  setshowHelpPopUp: setshowHelpPopUp;
}

const HowToPopUp: React.FC<HeaderProps> = ({ setshowHelpPopUp }) => {
  return (
    <div className="PopUpShade">
      <div className="PopUpWindow">
        <div
          onClick={() => setshowHelpPopUp(false)}
          style={{ textAlign: "right" }}
        >
          <ImCross className="PopUpReactIcon" />
        </div>
        <div className="Title">help</div>
        <p>
          Solvr will suggest the best guess based on the remaining possible
          options, with anagrams grouped together for your convenience.{" "}
        </p>

        <p>
          Enter your chosen word into the Wordle client and submit it to Solvr,
          ensuring that the colors match the feedback provided by Wordle. You
          can click the circles under the letters to change the current colour.
        </p>
        <p>
          Solvr will then filter the remaining options and offer you the next
          best guess based on the updated possibilities.
        </p>
      </div>
    </div>
  );
};

export default HowToPopUp;
