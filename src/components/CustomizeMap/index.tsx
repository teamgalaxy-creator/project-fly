import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useStyles from './styles';
import { Box } from '@mui/material';
import { useState } from 'react';
import { Console } from 'console';
import { useDispatch } from '~/redux/store';
import ActionsCreator from '~/redux/actions';
interface customizeMapProps {
  handleClose: () => void;
}

const CustomizeMap = (props: customizeMapProps) => {
  const [selectedImage, setSelectedImage] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const imageList = [
    { src: 'icons/Map1.png', alt: 'map1' },
    { src: 'icons/Map2.png', alt: 'map2' },
    { src: 'icons/Map3.png', alt: 'map3' },
    { src: 'icons/Map4.png', alt: 'map4' },
    // { src: 'icons/Map4.svg', alt: 'map5' },
    // { src: 'icons/Map5.svg', alt: 'map6' },
  ];

  const handleImageClick = (imageName: string, index: number) => {
    if (selectedImage === imageName) {
      setSelectedImage('');
    } else {
      setSelectedImage(imageName);
    }
    dispatch(ActionsCreator.setMapStyleIndex(index));
  };

  return (
    <div>
      <Box className={classes.boxStyle}>
        <Grid>
          <img
            src="icons/cross.svg"
            alt="cancel"
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              padding: '24px',
              cursor: 'pointer',
            }}
            onClick={props.handleClose}
          />
          <Typography variant="h4" className={classes.heading}>
            Customize Map
          </Typography>
          <div className={classes.imageGrid}>
            {imageList.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => handleImageClick(image.alt, index)}
                className={`${
                  selectedImage === image.alt ? classes.selected : ''
                } ${classes.mapType} ${classes.imageGap}`}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default CustomizeMap;
