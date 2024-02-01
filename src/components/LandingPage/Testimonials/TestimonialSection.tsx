import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import useStyles from './styles';
import Carousal from './Carousal';
import { Ref } from 'react';

const MyButton = styled(Button)({
  padding: '10px 20px',
  backgroundColor: '#FE7138',
  color: 'white',
  borderRadius: '8px',
  textTransform: 'none',
  transition: 'all 0.3s ease',

  '&:hover': {
    backgroundColor: '#FE7138',
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
});

interface TestimonialsSectionProps {
  testimonialsRef: Ref<HTMLElement>;
}

const TestimonialSection = ({ testimonialsRef }: TestimonialsSectionProps) => {
  const classes = useStyles();

  return (
    <section
      id="testimonials"
      ref={testimonialsRef}
      className={classes.mainContainer}
    >
      <div className={classes.mainTitleContainer}>
        <div className={classes.title}>Testimonials</div>
        <p className={classes.subtitle}>
          Discover the Stories of Delighted Explorers Who Transformed Dreams
          into Journeys.
        </p>
      </div>
      <div className={classes.carousalContainer}>
        <Carousal />
        <img
          className={classes.testimonialImage}
          src="/testimonial-bg.svg"
          alt="Background Image"
        />
      </div>
      <Button className={classes.loadMoreButton}>Load More</Button>
    </section>
  );
};

export default TestimonialSection;
