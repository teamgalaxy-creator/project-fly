import CustomItinery from './CustomItinery';
import GenerateVideo from './GenerateVideo';
import ChangeMap from './ChangeMap';
import useStyles from './styles';
import { Ref } from 'react';

interface FeaturesSectionProps {
  featuresRef: Ref<HTMLElement>;
}

const HowWorksSection = ({ featuresRef }: FeaturesSectionProps) => {
  const classes = useStyles();

  return (
    <section id="features" className={classes.section} ref={featuresRef}>
      <div className={classes.sectionTitleContainer}>
        <div className={classes.mainTitle}>
          How It <span style={{ color: '#FD6F35' }}>Works</span>?
        </div>
        <p className={classes.titleText}>
          Step by step process to generate your custom itinerary animation in 2
          min
        </p>
      </div>
      <CustomItinery />
      <GenerateVideo />
      <ChangeMap />
    </section>
  );
};

export default HowWorksSection;
