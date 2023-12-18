import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    toolbar: {
        height: '80px',
        display: 'flex',
        justifyContent: 'space-between',
        marginleft:'240px',
        [theme.breakpoints.down('sm')]:{
            marginleft:0,
            flexWrap:'wrap',
        }
    },
    menuButton:{
        marginRight:theme.spacing(2),
        [theme.breakpoints.up('sm')]:{
            display:'none',
        }
    },
    
}));