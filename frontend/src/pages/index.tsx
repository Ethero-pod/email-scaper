import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  ContactFormDesigns,
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  TestimonialsDesigns,
} from '../components/WebPageComponents/designs';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'email scaper';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Automated Email Sorting',
      description:
        'Automatically categorize and sort emails based on predefined criteria, saving you time and ensuring no important message is missed.',
      icon: 'mdiEmailOutline',
    },
    {
      name: 'Customizable Categories',
      description:
        'Create and manage custom categories to organize emails according to your specific wedding planning needs, enhancing your workflow.',
      icon: 'mdiFolderOpen',
    },
    {
      name: 'User-Friendly Dashboard',
      description:
        'Navigate through your emails with ease using a clean and intuitive dashboard designed for efficiency and simplicity.',
      icon: 'mdiViewDashboard',
    },
  ];

  const testimonials = [
    {
      text: "Using ${projectName} has transformed our wedding planning process. It's intuitive and saves us so much time!",
      company: 'Dream Weddings Co.',
      user_name: 'Emily Johnson, Lead Planner',
    },
    {
      text: 'The automated email sorting feature is a game-changer. We can focus more on our clients and less on admin tasks.',
      company: 'Elegant Events Ltd.',
      user_name: 'Michael Smith, Event Coordinator',
    },
    {
      text: 'I love how customizable the categories are. ${projectName} truly understands the needs of wedding planners.',
      company: 'Blissful Beginnings',
      user_name: 'Sophia Lee, Founder',
    },
    {
      text: 'Our team has become more efficient and organized thanks to ${projectName}. Highly recommend it!',
      company: 'Forever Yours Weddings',
      user_name: 'James Brown, Operations Manager',
    },
    {
      text: "The user-friendly dashboard makes navigating through emails a breeze. It's a must-have tool for any planner.",
      company: 'Chic Celebrations',
      user_name: 'Olivia Davis, Senior Planner',
    },
    {
      text: "Since adopting ${projectName}, our communication with clients has improved significantly. It's a fantastic tool!",
      company: 'Perfect Day Planners',
      user_name: 'Liam Wilson, Client Relations',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Wedding Email Management - Organize and Categorize with Ease`}</title>
        <meta
          name='description'
          content={`Discover our web application designed for the wedding industry to efficiently manage and categorize emails. Streamline your communication and enhance your wedding planning experience.`}
        />
      </Head>
      <WebSiteHeader projectName={'email scaper'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'email scaper'}
          image={['Organized wedding emails on screen']}
          mainText={`Transform Your Wedding Email Management`}
          subTitle={`Simplify your wedding planning with ${projectName}. Efficiently organize and categorize emails for a seamless experience.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'email scaper'}
          image={['Efficient email categorization tools']}
          withBg={0}
          features={features_points}
          mainText={`Discover ${projectName} Features`}
          subTitle={`Explore how ${projectName} can streamline your wedding email management with these powerful features.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'email scaper'}
          image={['Team collaborating on wedding plans']}
          mainText={`Empowering Wedding Planners with ${projectName}`}
          subTitle={`${projectName} is dedicated to revolutionizing the wedding industry by providing an intuitive platform for managing and categorizing emails. Our mission is to simplify your planning process and enhance communication efficiency.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <TestimonialsSection
          projectName={'email scaper'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'email scaper'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'email scaper'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
