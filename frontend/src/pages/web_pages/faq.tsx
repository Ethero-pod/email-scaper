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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'How does ${projectName} help with email management?',
      answer:
        '${projectName} automates the organization of your emails, categorizing them based on your preferences to ensure you never miss important messages.',
    },
    {
      question: 'Can I try ${projectName} before purchasing?',
      answer:
        'Yes, we offer a 14-day free trial for new users. This allows you to explore all the features of ${projectName} without any commitment.',
    },
    {
      question: 'What integrations are available with ${projectName}?',
      answer:
        '${projectName} integrates with various tools and platforms to enhance your workflow. Check our integration settings for a full list of supported services.',
    },
    {
      question: 'Is customer support available 24/7?',
      answer:
        'Yes, our support team is available 24/7 via email and chat. Premium and Business plans include priority support for faster response times.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize your data security with advanced encryption and regular security audits to ensure your information is safe with ${projectName}.',
    },
    {
      question: 'Can I customize the email filters?',
      answer:
        'Absolutely! You can create and manage custom filters to organize your emails according to your specific needs, enhancing your workflow.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and support options. Contact us for further assistance.`}
        />
      </Head>
      <WebSiteHeader projectName={'email scaper'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'email scaper'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered About ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, pricing, and support.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Browse FAQs`}
        />

        <FaqSection
          projectName={'email scaper'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'email scaper'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person writing an email']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have more questions? Reach out to us anytime. Our team at ${projectName} is ready to assist you with any inquiries or support needs.`}
        />
      </main>
      <WebSiteFooter projectName={'email scaper'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
