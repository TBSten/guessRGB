import {
    BottomNavigation ,
    BottomNavigationAction ,
} from "@material-ui/core" ;
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        position:"fixed",
        bottom:0,
        left:0,
        width:"100%",
    },
});

export default function Head({navs,nav}){
    const classes = useStyles();
    const navValue = nav[0] ;
    const setNavValue = nav[1] ;
    const handleChange = (e,newValue)=>{
        setNavValue(newValue);
    };
    return (
        <BottomNavigation 
            className={classes.root}
            value={navValue} 
            onChange={handleChange}
            showLabels>
            {
                navs.map((ele,idx)=>(
                    <BottomNavigationAction 
                        label={ele.lb} 
                        icon={ele.ic} 
                        key={idx}/>
                ))
            }
        </BottomNavigation>
    ) ;
}

