'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SimpleButton from '../components/SimpleButton';

interface Company {
  name: string;
  ticker: string;
  logo: string;
  route?: string;
}

const companies: Company[] = [
  { name: 'Boilermake', ticker: 'BOILER', logo: '/companies/boilermake.jpg', route: '/interview/boilermake' },
  { name: 'Microsoft', ticker: 'MSFT', logo: '/companies/microsoft.png' },
  { name: 'Amazon', ticker: 'AMZN', logo: '/companies/amazon.png' },
  { name: 'Google', ticker: 'GOOGL', logo: '/companies/google.png' },
  { name: 'Apple', ticker: 'AAPL', logo: '/companies/apple.png' },
  { name: 'Meta', ticker: 'META', logo: '/companies/meta.png' },
  { name: 'Netflix', ticker: 'NFLX', logo: '/companies/netflix.png' },
  { name: 'Tesla', ticker: 'TSLA', logo: '/companies/tesla.png' },
  { name: 'NVIDIA', ticker: 'NVDA', logo: '/companies/nvidia.png' },
  { name: 'Adobe', ticker: 'ADBE', logo: '/companies/adobe.png' },
  { name: 'Salesforce', ticker: 'CRM', logo: '/companies/salesforce.png' },
  { name: 'Intel', ticker: 'INTC', logo: '/companies/intel.png' },
  { name: 'Oracle', ticker: 'ORCL', logo: '/companies/oracle.png' },
  { name: 'IBM', ticker: 'IBM', logo: '/companies/ibm.png' },
  { name: 'Uber', ticker: 'UBER', logo: '/companies/uber.png' },
  { name: 'Airbnb', ticker: 'ABNB', logo: '/companies/airbnb.png' },
  { name: 'PayPal', ticker: 'PYPL', logo: '/companies/paypal.png' },
  { name: 'Twitter', ticker: 'X', logo: '/companies/twitter.png' },
  { name: 'LinkedIn', ticker: 'MSFT', logo: '/companies/linkedin.png' },
  { name: 'Stripe', ticker: 'Private', logo: '/companies/stripe.png' },
  { name: 'Palantir', ticker: 'PLTR', logo: '/companies/palantir.png' },
];

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

export default function InterviewPage() {
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  };

  const handleCompanyClick = (company: Company) => {
    if (company.route) {
      router.push(company.route);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1a1a1a] p-8">
      <div className="absolute top-4 left-4 z-50">
        <Image 
          src="/icon.png" 
          alt="Apollo Project Icon" 
          width={31} 
          height={31} 
          onClick={goHome}
          className="cursor-pointer invert brightness-200"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Choose a <GradientText>Company</GradientText> to Practice For
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {companies.map((company) => (
            <div key={`${company.name}-${company.ticker}`} className="h-[50px]">
              <SimpleButton
                color="superdarkgray"
                onClick={() => handleCompanyClick(company)}
                className="relative"
                buttonText={
                  <div className="flex items-center space-x-4 px-4">
                    <div className="relative w-6 h-6">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-lg">{company.name}</span>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 