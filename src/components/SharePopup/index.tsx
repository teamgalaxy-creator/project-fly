import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FilledInput,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSelector } from '~/redux/reducers';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
import { Icon } from '@iconify/react';
import copy from 'copy-to-clipboard';

const useStyles = makeStyles(() => ({
  paper: {
    width: '100%',
    maxWidth: '600px',
  },
  container: {
    display: 'flex',
    overflow: 'auto',
    borderRadius: '8px',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const SharePopup = ({ link }: { link: string }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false); // State to track whether link is copied

  const sharePopupState: boolean = useSelector(
    (state: any) => state.AnimationReducers.sharePopupState,
  );

  const handleCopyLink = () => {
    copy(link);
    setIsCopied(true);

    // Reset the 'Copied' state after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Dialog
      maxWidth="md"
      open={sharePopupState}
      classes={{ paper: classes.paper }}
      onClose={() => dispatch(ActionsCreator.showSharePopup(false))}
    >
      <DialogTitle className={classes.headingContainer}>
        <Typography variant="h5" sx={{ fontFamily: 'Futura Hv BT' }}>
          Share
        </Typography>
        <Icon
          icon="material-symbols:close"
          width="30"
          height="30"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => dispatch(ActionsCreator.showSharePopup(false))}
        />
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ fontFamily: 'Futura Medium' }}>
          Link for sharing:
        </Typography>
        <FilledInput
          fullWidth
          value={link}
          disableUnderline
          sx={{ input: { padding: '8px', fontFamily: 'Futura Bk BT Italic' } }}
          endAdornment={
            <Button
              sx={{
                cursor: 'pointer',
                width: '150px',
                fontFamily: 'Futura Medium',
                border:1,
              }}
              onClick={handleCopyLink}
              // disabled={isCopied} // Disable the button if link is already copied
            >
              {isCopied ? 'Copied ✅' : 'Copy Link'}
            </Button>
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default SharePopup;
