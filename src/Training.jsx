import {useState, } from "react" ;
import {
    Slider,
    Chip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    root: {
        width: "75%" ,
    },
    slider: {
        width: "75%" ,
    },
    red: {
        color: "red",
    },
    green: {
        color: "green",
    },
    blue: {
        color: "blue",
    },
    colors:{
        display:"flex",
        justifyContent:"center",
        flexWrap:"wrap",
        margin:"1rem 0 ",
        "& > *":{
            margin:"5px 0.5rem",
        }
    },
    tnum:{
        display:"inline-block",
        padding:"0.5rem ",
        width:"3rem",
    },

});

export default function Guess(){
    const classes = useStyles();
    const names = ["赤(R)","緑(G)","青(B)"] ;
    const enNames = ["red","green","blue"] ;
    const ableAns = true ;
    const handleChange = (idx,value)=>{
        const newRgbValue = [...rgbValue] ;
        newRgbValue[idx] = value ;
        setRgbValue(newRgbValue);
    }

    const [rgbValue,setRgbValue] = useState([0,0,0]);

    const samples = [
        {lb:"赤", rgb:[255,0,0], },
        {lb:"緑", rgb:[0,255,0], },
        {lb:"青", rgb:[0,0,255], },
        {lb:"黄", rgb:[255,2255,0], },
        {lb:"水色", rgb:[0,255,255], },
        {lb:"ピンク", rgb:[255,0,255], },
        {lb:"白", rgb:[255,255,255], fore:[0,0,0] },
        {lb:"黒", rgb:[0,0,0], },
    ];
    return (
        <div className="guess">
            <h1>RGB値をテストできます</h1>
            
            <div className="square" style={{backgroundColor:`rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`,}}/>
            
            <table className={classes.root}>
                <tbody>{
                    rgbValue.map((ele,idx)=>(
                        <tr key={idx}>
                            <td className={enNames[idx]}>
                                {names[idx]}
                            </td>
                            <td className={`${enNames[idx]} `}>
                                <span className={`${classes.tnum}`}>
                                    {ele}
                                </span>
                            </td>
                            <td className={classes.slider}>
                                <Slider 
                                    className={classes[enNames[idx]]}
                                    value={ele} 
                                    disabled={!ableAns}
                                    onChange={(e,nv)=> handleChange(idx,nv) } 
                                    min={0}
                                    step={1}
                                    max={255}
                                    valueLabelDisplay="auto"/>
                            </td>
                        </tr>
                    ))
                }</tbody>
            </table>
            <div className={classes.colors}>
                {
                    samples.map((ele,idx)=>(
                        <Chip 
                            key={idx}
                            variant="outlined"
                            label={ele.lb} 
                            onClick={()=>{setRgbValue(ele.rgb)}}
                            style={{
                                backgroundColor:`rgb(${ele.rgb[0]},${ele.rgb[1]},${ele.rgb[2]})`,
                                color:ele.fore?`rgb(${ele.fore[0]},${ele.fore[1]},${ele.fore[2]})`:"white",
                            }}/>
                    ))
                }
            </div>

        </div>
    ) ;
}
