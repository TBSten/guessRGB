import {
    AppBar ,
    Toolbar ,
    Typography ,
} from "@material-ui/core/" ;


export default function Head(){
    return (
        // <div className="head">HEAD</div>
        <AppBar position="static">
            <Toolbar>
                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton> */}

                <Typography variant="h6">
                    guess RGB
                </Typography>

                {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
        </AppBar>
    ) ;
}

