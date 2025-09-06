import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Solution from '../components/Solution';
import Features from '../components/Features';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Home;