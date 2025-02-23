'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SimpleButton from '../components/SimpleButton';
import { alice, vastago } from '../fonts';
import { Lock } from 'lucide-react';

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
];

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

export default function InterviewPage() {
  const router = useRouter();

  const handleCompanyClick = (company: Company) => {
    if (company.route) {
      router.push(company.route);
    }
  };

  return (
    <div className={`min-h-screen bg-[#1a1a1a] pt-24 ${alice.variable} ${vastago.variable}`}>
      <div className="max-w-7xl mx-auto px-8">
        <h1 className={`${alice.className} text-4xl font-bold text-white text-center mb-12`}>
          Choose a <GradientText>Company</GradientText> to Practice For
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {companies.map((company) => (
            <div key={`${company.name}-${company.ticker}`} className="h-[50px]">
              <SimpleButton
                color="superdarkgray"
                onClick={() => handleCompanyClick(company)}
                className={`relative ${!company.route ? 'opacity-60 cursor-not-allowed' : ''}`}
                buttonText={
                  <div className="flex items-center justify-between w-full px-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-6 h-6">
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className={`${vastago.className} text-lg`}>{company.name}</span>
                    </div>
                    {!company.route && (
                      <div className="flex items-center space-x-2">
                        <Lock className="w-3 h-3 text-[#666666]" />
                        <span className="text-xs text-[#666666] font-medium">Coming Soon</span>
                      </div>
                    )}
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