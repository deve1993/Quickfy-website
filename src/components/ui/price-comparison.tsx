'use client';

import { Check, X, TrendingDown, Zap } from 'lucide-react';
import { memo } from 'react';

interface PriceComparisonProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'card';
}

export const PriceComparison = memo(function PriceComparison({
  className = '',
  variant = 'horizontal'
}: PriceComparisonProps) {

  const competitors = [
    {
      name: 'Traditional Solutions',
      price: '300-400',
      period: '/month',
      features: [
        { name: 'Complex setup', included: false },
        { name: 'Multiple subscriptions', included: false },
        { name: 'High maintenance costs', included: false },
        { name: 'Limited support', included: false }
      ],
      color: 'red'
    },
    {
      name: 'Whappi',
      price: '15',
      period: '/month',
      features: [
        { name: 'Simple setup', included: true },
        { name: 'All-in-one solution', included: true },
        { name: 'No maintenance needed', included: true },
        { name: '24/7 support', included: true }
      ],
      color: 'green',
      isRecommended: true
    }
  ];

  if (variant === 'card') {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200 ${className}`}>
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Price Comparison
          </h3>
          <p className="text-gray-600">
            See how much you can save with Whappi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competitors.map((competitor, index) => (
            <div key={index} className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
              competitor.isRecommended
                ? 'border-green-500 bg-green-50'
                : 'border-red-200 bg-red-50'
            }`}>
              {competitor.isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h4 className={`text-lg font-semibold mb-2 ${
                  competitor.isRecommended ? 'text-green-700' : 'text-red-700'
                }`}>
                  {competitor.name}
                </h4>
                <div className="flex items-center justify-center space-x-1">
                  <span className={`text-3xl font-bold ${
                    competitor.isRecommended ? 'text-green-600' : 'text-red-600'
                  }`}>
                    €{competitor.price}
                  </span>
                  <span className="text-gray-500">{competitor.period}</span>
                </div>
              </div>

              <ul className="space-y-3">
                {competitor.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      feature.included
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {feature.included ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                    </div>
                    <span className={`text-sm ${
                      feature.included ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Savings indicator */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 px-6 py-3 rounded-full">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <span className="font-semibold text-green-700">
              Save up to 95% per month
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {competitors.map((competitor, index) => (
          <div key={index} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
            competitor.isRecommended
              ? 'border-green-500 bg-green-50'
              : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                competitor.isRecommended ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className="font-medium text-gray-800">
                {competitor.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${
                competitor.isRecommended ? 'text-green-600' : 'text-red-600'
              }`}>
                €{competitor.price}
              </span>
              <span className="text-gray-500 text-sm">{competitor.period}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default horizontal variant
  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-red-600 font-semibold mb-2">Traditional Solutions</div>
          <div className="text-3xl font-bold text-red-600">€300-400</div>
          <div className="text-gray-500 text-sm">/month</div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="text-gray-500 text-sm">vs</div>
          <Zap className="w-6 h-6 text-blue-500" />
        </div>

        <div className="text-center">
          <div className="text-green-600 font-semibold mb-2">Whappi</div>
          <div className="text-3xl font-bold text-green-600">€15</div>
          <div className="text-gray-500 text-sm">/month</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-200 px-4 py-2 rounded-full">
          <TrendingDown className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            Save 95% monthly
          </span>
        </div>
      </div>
    </div>
  );
});

// Savings calculator component
export const SavingsCalculator = memo(function SavingsCalculator({ className = '' }: { className?: string }) {
  const monthlyWhappi = 15;
  const monthlyCompetitor = 350; // Average of 300-400
  const monthlySavings = monthlyCompetitor - monthlyWhappi;
  const yearlySavings = monthlySavings * 12;

  return (
    <div className={`bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Your Potential Savings
        </h3>
        <p className="text-green-600 text-sm">
          Compared to traditional solutions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">€{monthlySavings}</div>
          <div className="text-green-700 text-sm">Monthly Savings</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">€{yearlySavings.toLocaleString()}</div>
          <div className="text-green-700 text-sm">Yearly Savings</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">95%</div>
          <div className="text-green-700 text-sm">Cost Reduction</div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 bg-white/70 px-4 py-2 rounded-full">
          <Zap className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            ROI achieved in first month
          </span>
        </div>
      </div>
    </div>
  );
});