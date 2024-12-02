import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  movieContainer: {
    position: 'relative',
    '&:hover .MuiIconButton-root': {
      opacity: 1,
    },
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
    opacity: 0,
    transition: 'opacity 0.2s ease-in-out',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
}));
