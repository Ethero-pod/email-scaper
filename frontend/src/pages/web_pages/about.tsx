import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      name: 'Smart Email Categorization',
      description:
        'Automatically sort and categorize emails to keep your inbox organized and ensure you never miss important messages.',
      icon: 'mdiEmailMultiple',
    },
    {
      name: 'Customizable Workflow',
      description:
        'Tailor your email management process with customizable categories and settings to fit your unique planning needs.',
      icon: 'mdiTune',
    },
    {
      name: 'Real-Time Notifications',
      description:
        'Stay updated with instant notifications for new emails and important updates, keeping you in the loop at all times.',
      icon: 'mdiBellAlert',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has streamlined our email management, making our planning process more efficient and enjoyable.',
      company: 'Wedding Wonders Inc.',
      user_name: 'Anna Thompson, Event Manager',
    },
    {
      text: 'The customizable workflow feature is a lifesaver. It allows us to tailor the system to our specific needs.',
      company: 'Celebration Creations',
      user_name: 'David Green, Operations Director',
    },
    {
      text: 'Real-time notifications keep us on top of our emails, ensuring we never miss a beat with our clients.',
      company: 'Elegant Affairs',
      user_name: 'Jessica White, Client Coordinator',
    },
    {
      text: 'The intuitive design of ${projectName} makes it easy for our team to navigate and manage emails effectively.',
      company: 'Blissful Events',
      user_name: 'Mark Johnson, Senior Planner',
    },
    {
      text: "Since using ${projectName}, our communication with clients has improved significantly. It's a fantastic tool!",
      company: 'Perfect Day Planners',
      user_name: 'Liam Wilson, Client Relations',
    },
    {
      text: "The smart email categorization feature has saved us countless hours. We can't imagine planning without it.",
      company: 'Dream Weddings Co.',
      user_name: 'Emily Johnson, Lead Planner',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Us - Learn More About Our Mission and Team`}</title>
        <meta
          name='description'
          content={`Discover the mission and values of our team at ${projectName}. Learn how we are transforming the wedding industry with innovative email management solutions.`}
        />
      </Head>
      <WebSiteHeader projectName={'email scaper'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'email scaper'}
          image={['Team brainstorming in office']}
          mainText={`Meet the Visionaries Behind ${projectName}`}
          subTitle={`Discover the passion and dedication driving ${projectName}. Learn about our mission to revolutionize wedding email management.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Story`}
        />

        <AboutUsSection
          projectName={'email scaper'}
          image={['Team discussing project ideas']}
          mainText={`Our Journey with ${projectName}`}
          subTitle={`At ${projectName}, we are committed to transforming the wedding industry with innovative solutions. Our team is passionate about making email management seamless and efficient for planners.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Join Our Mission`}
        />

        <FeaturesSection
          projectName={'email scaper'}
          image={['Innovative email management tools']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover how ${projectName} enhances your wedding planning experience with these essential features.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'email scaper'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Satisfied ${projectName} Users `}
        />

        <ContactFormSection
          projectName={'email scaper'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person using a smartphone']}
          mainText={`Connect with ${projectName} Today `}
          subTitle={`We're here to help! Reach out to us anytime for support or inquiries. Our team at ${projectName} is ready to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'email scaper'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
