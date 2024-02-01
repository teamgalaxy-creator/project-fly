import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeSection from './Home/HomeSection';
import AboutSection from './About/AboutSection';
import Footer from './Footer';
import HowWorksSection from './HowWorksSteps/HowWorksSection';
import PricingPlans from './PricingPlans/PricingPlans';
import TestimonialSection from './Testimonials/TestimonialSection';
import Navbar from './Navbar/Navbar';
import TravelPlanSection from './TravelPlan/TravelPlanSection';
import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';

const LandingPage = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const handleScroll = () => {
      if (mainContainerRef.current) {
        setScrollY(mainContainerRef.current.scrollTop);
      }
    };

    if (mainContainerRef.current) {
      mainContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (mainContainerRef.current) {
        mainContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div ref={mainContainerRef} className={classes.pageWrapper}>
      <Navbar
        homeRef={homeRef}
        aboutRef={aboutRef}
        featuresRef={featuresRef}
        testimonialsRef={testimonialsRef}
        pricingRef={pricingRef}
        mainContainerRef={mainContainerRef}
      />
      <HomeSection
        mainContainerRef={mainContainerRef.current as HTMLDivElement}
        homeRef={homeRef}
      />
      <AboutSection aboutRef={aboutRef} />
      <HowWorksSection featuresRef={featuresRef} />
      <TravelPlanSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
