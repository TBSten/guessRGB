import {useState, useEffect, } from "react" ;

import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
    const [ableAns,setAbleAns] = useState(true);
    const [ansValue, setAnsValue] = useState([0, 0, 0]);
    const [rgbValue, setRgbValue] = useState([0, 0, 0]);
    const handleChange = (idx,value)=>{
        const newRgbValue = [...rgbValue] ;
        newRgbValue[idx] = value ;
        setRgbValue(newRgbValue);
    }
    const [showAns,setShowAns] = useState(false);
    const handleCheck = ()=>{
        if(!showAns){
            //false -> true  
            setTimeout(()=>{
                window.location = "#answers" ;
            },50);
            setAbleAns(false);

            let total = 0 ;
            ansValue.forEach((ele,idx)=>{
                    total += Math.floor((255-Math.abs(ele-rgbValue[idx]))/255*100 )
            })
            if(total >= 90*3){  //9割以上
            }else{
            }
        }else{
            //true -> false  
            setAbleAns(false);
        }
        setShowAns(prev => !prev);
    }
    const handleReset = ()=>{
        //ansValue random
        setAnsValue([
            Math.floor(Math.random()*256),
            Math.floor(Math.random()*256),
            Math.floor(Math.random()*256)
        ]);
        //rgbValue all 0
        setRgbValue([0,0,0]);
        //showAns false
        setShowAns(false);
        //ableAns true
        setAbleAns(true);
    };
    useEffect(()=>{
        handleReset();
    },[]);
    return (
        <div className="guess">
            <h1>この色のRGB値を予想してください！</h1>
            
            <div className="square" style={{backgroundColor:`rgb(${ansValue[0]},${ansValue[1]},${ansValue[2]})`,}}/>
            
            <table className={classes.root}>
                <tbody>{
                    rgbValue.map((ele,idx)=>(
                        <tr key={idx}>
                            <td className={enNames[idx]}>
                                {names[idx]}
                            </td>
                            <td className={`${enNames[idx]} ${classes.tnum}`}>
                                {ele}
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

            
            {
                showAns ? 
                    <>
                        <div className="answer" id="answers">
                            <h1>正解</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <td>  </td>
                                        <td> あなた </td>
                                        <td> 正解 </td>
                                    </tr>
                                </thead>
                                <tbody>{
                                ansValue.map((ele,idx)=>(
                                    <tr className={classes[enNames[idx]]} key={idx}>
                                        <td>{names[idx]}</td>
                                        <td>　{rgbValue[idx]}　</td>
                                        <td>　{ele}　</td>
                                    </tr>
                                ))
                            }</tbody></table>
                        </div>
                        <div className="answer">
                            <h1>あなたの得点</h1>
                            <table><tbody>
                                {
                                    ansValue.map((ele,idx)=>{
                                        return (
                                            <tr className={classes[enNames[idx]]} key={idx}>
                                                <td>{names[idx]}</td>
                                                <td><b>　{Math.floor((255-Math.abs(ele-rgbValue[idx]))/255*100 ) } ポイント　</b></td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td><b>合計</b></td>
                                    <td><b>{(function(){
                                        let total = 0 ;
                                        ansValue.forEach((ele,idx)=>{
                                                total += Math.floor((255-Math.abs(ele-rgbValue[idx]))/255*100 )
                                        })
                                        return total ;
                                    })()} ポイント</b></td>
                                </tr>
                            </tbody></table>
                            {(function(){
                                let total = 0 ;
                                ansValue.forEach((ele,idx)=>{
                                        total += Math.floor((255-Math.abs(ele-rgbValue[idx]))/255*100 )
                                })
                                if(total >= 290){
                                    return <h3>コンピュータですか？</h3> ;
                                }else if(total >= 270){
                                    return <h3>す、すげぇ、、、</h3> ;
                                }else if(total >= 230){
                                    return <h3>いい調子！</h3> ;
                                }else if(total >= 200){
                                    return <h3>いいね！</h3> ;
                                }else if(total <= 50){
                                    return <h3>だ、大丈夫？</h3> ;
                                }
                            })()}
                        </div>
                        
                    </>
                     :
                    ""
            }

            <ButtonGroup orientation="vertical">
                <Button variant="contained" color="primary" onClick={handleCheck}>
                    {
                        showAns ?
                        "答えを隠す"
                        :
                        "答え合わせする"
                    }
                </Button>
                <Button variant="contained" color="primary" onClick={handleReset}>
                    次の問題へ
                </Button>
            </ButtonGroup>
        </div>
    ) ;
}
