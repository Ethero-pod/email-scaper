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
  ContactFormDesigns,
  FeaturesDesigns,
  PricingDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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
      name: 'Automated Email Organization',
      description:
        'Automatically sort and categorize your emails to keep your inbox organized and ensure you never miss important messages.',
      icon: 'mdiEmailOutline',
    },
    {
      name: 'Customizable Email Filters',
      description:
        'Create custom filters to manage your emails according to your specific needs, enhancing your workflow and efficiency.',
      icon: 'mdiFilterVariant',
    },
    {
      name: 'Seamless Integration',
      description:
        'Integrate ${projectName} with your existing tools and platforms for a seamless wedding planning experience.',
      icon: 'mdiPuzzle',
    },
  ];

  const pricing_features = {
    standard: {
      features: ['Automated Email Organization', 'Customizable Email Filters'],
      limited_features: ['Basic Integration', 'Limited Support'],
    },
    premium: {
      features: [
        'Automated Email Organization',
        'Customizable Email Filters',
        'Seamless Integration',
      ],
      also_included: ['Priority Support', 'Advanced Analytics'],
    },
    business: {
      features: [
        'Automated Email Organization',
        'Customizable Email Filters',
        'Seamless Integration',
        'Dedicated Account Manager',
        'Comprehensive Analytics',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals or small teams looking to streamline their email management with essential features.',
    premium:
      'Perfect for small startups or agencies needing advanced tools and priority support to enhance their workflow.',
    business:
      'Designed for enterprises requiring comprehensive solutions, dedicated support, and advanced analytics for optimal performance.',
  };

  const testimonials = [
    {
      text: '${projectName} has been a game-changer for our wedding planning business. The automated email organization saves us hours every week.',
      company: 'Wedding Bliss Co.',
      user_name: 'Sarah Mitchell, Owner',
    },
    {
      text: 'The seamless integration with our existing tools has made our workflow so much smoother. Highly recommend ${projectName}!',
      company: 'Elegant Events',
      user_name: 'Tom Harris, Operations Manager',
    },
    {
      text: 'We love the customizable email filters. They allow us to tailor the system to our specific needs, making us more efficient.',
      company: 'Dream Day Planners',
      user_name: 'Lisa Brown, Lead Planner',
    },
    {
      text: 'The priority support offered in the Premium plan is fantastic. The team at ${projectName} is always ready to help.',
      company: 'Celebration Creations',
      user_name: 'James Lee, Director',
    },
    {
      text: "Our enterprise has benefited greatly from the comprehensive analytics provided by ${projectName}. It's a powerful tool.",
      company: 'Grand Weddings Inc.',
      user_name: 'Emily Clark, CEO',
    },
    {
      text: 'The dedicated account manager in the Business plan has been invaluable. We feel truly supported by ${projectName}.',
      company: 'Perfect Day Enterprises',
      user_name: 'Michael Johnson, COO',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Our Services - Enhance Your Wedding Planning`}</title>
        <meta
          name='description'
          content={`Explore the range of services offered by ${projectName} to streamline your wedding planning process. Discover features, pricing, and testimonials from satisfied users.`}
        />
      </Head>
      <WebSiteHeader projectName={'email scaper'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'email scaper'}
          image={['Wedding planning tools in use']}
          mainText={`Discover ${projectName} Services for Weddings`}
          subTitle={`Explore how ${projectName} can transform your wedding planning with our comprehensive services. Streamline your workflow and enhance communication effortlessly.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Our Services`}
        />

        <FeaturesSection
          projectName={'email scaper'}
          image={['Efficient email management interface']}
          withBg={0}
          features={features_points}
          mainText={`Unveil ${projectName} Key Features`}
          subTitle={`Discover the powerful features of ${projectName} designed to enhance your wedding planning experience and streamline your email management.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'email scaper'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <TestimonialsSection
          projectName={'email scaper'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'email scaper'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on keyboard']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're here to assist you with any inquiries or support needs. Contact ${projectName} anytime, and our team will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'email scaper'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
