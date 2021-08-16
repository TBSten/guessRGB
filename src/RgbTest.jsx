import {useState, } from "react" ;

import {
    School ,
    ColorLens ,
} from "@material-ui/icons" ;

import Head from "./comps/Head.jsx" ;
import Foot from "./comps/Foot.jsx" ;
import Training from "./Training" ;
import Guess from "./Guess" ;
import Help from "./Help" ;

import "./css/RgbTest.css" ;

function RgbTest() {
  const navs = [
    {lb:"guess", ic:<ColorLens />, com: <Guess /> },
    {lb:"training", ic:<School />, com: <Training /> },
    {lb:"help", ic:<School />, com: <Help /> },
  ] ;
  const [navValue, setNavValue] = useState(0);
  return (
    <div className="rgb-container">
      <Head />
      <div className="main">
        {
          navs[navValue].com
        }
      </div>
      <Foot navs={navs} nav={[navValue,setNavValue]}/>
    </div>
  );
}

export default RgbTest;
