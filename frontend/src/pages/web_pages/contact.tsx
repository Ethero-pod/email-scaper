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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What features does ${projectName} offer?',
      answer:
        '${projectName} offers automated email organization, customizable filters, seamless integration with existing tools, and more to streamline your wedding planning process.',
    },
    {
      question: 'How can I integrate ${projectName} with my current tools?',
      answer:
        'Integration is simple. ${projectName} supports various platforms and tools. Follow our step-by-step guide in the settings to connect your existing tools.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a 14-day free trial for new users to explore all the features of ${projectName} without any commitment.',
    },
    {
      question: 'What support options are available?',
      answer:
        '${projectName} provides 24/7 customer support via email and chat. Premium and Business plans include priority support and a dedicated account manager.',
    },
    {
      question: 'Can I customize email filters?',
      answer:
        'Absolutely! You can create and manage custom filters to organize your emails according to your specific needs, enhancing your workflow.',
    },
    {
      question:
        'What is the difference between the Standard and Premium plans?',
      answer:
        'The Standard plan includes basic features, while the Premium plan offers advanced tools, priority support, and additional integrations for enhanced functionality.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or support. Our team is here to assist you. Find answers to common questions in our FAQ section.`}
        />
      </Head>
      <WebSiteHeader projectName={'email scaper'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'email scaper'}
          image={['Customer support team at work']}
          mainText={`Connect with ${projectName} Support Team`}
          subTitle={`Have questions or need assistance? Our team at ${projectName} is here to help. Reach out to us for prompt support and guidance.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'email scaper'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'email scaper'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Reach Out to ${projectName} `}
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
