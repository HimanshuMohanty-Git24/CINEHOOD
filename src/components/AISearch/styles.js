import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    padding: '20px',
    width: '100%',
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      width: '80%',
    },
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10px 15px',
    marginBottom: '20px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1f1f1f',
  },
  input: {
    flex: 1,
    marginRight: '10px',
  },
  aiResponseCard: {
    marginBottom: '30px',
    backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#2a2a2a',
  },
  movieIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
