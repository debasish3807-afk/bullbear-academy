export interface Course {
  slug: string
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  hours: number
  lessons: number
  enrolled: string
  price: number
  rating: number
  description: string
  instructor: string
}

export const courses: Course[] = [
  { slug: 'stock-market-fundamentals', title: 'Stock Market Fundamentals', level: 'Beginner', hours: 12, lessons: 42, enrolled: '12.4k', price: 1999, rating: 4.9, description: 'Build the base: market structure, order types, sector basics, and reading simple charts.', instructor: 'Karthik Rao' },
  { slug: 'technical-analysis', title: 'Technical Analysis Masterclass', level: 'Intermediate', hours: 18, lessons: 64, enrolled: '8.2k', price: 3499, rating: 4.8, description: 'Charts, indicators, trend structure, momentum, and real execution examples.', instructor: 'Karthik Rao' },
  { slug: 'options-trading', title: 'Options Trading: Zero to Pro', level: 'Advanced', hours: 24, lessons: 86, enrolled: '15.6k', price: 4999, rating: 4.9, description: 'Greeks, volatility, spreads, expiry setups, adjustment playbooks.', instructor: 'Rajesh Iyer' },
  { slug: 'risk-management', title: 'Risk Management Essentials', level: 'Beginner', hours: 6, lessons: 24, enrolled: '9.8k', price: 999, rating: 4.9, description: 'Position sizing, max drawdown, daily loss limits, expectancy.', instructor: 'Priya Menon' },
  { slug: 'scalping-intraday', title: 'Scalping & Intraday Strategies', level: 'Advanced', hours: 16, lessons: 52, enrolled: '6.4k', price: 3999, rating: 4.7, description: 'Fast execution, opening range, VWAP, momentum bursts.', instructor: 'Rajesh Iyer' },
  { slug: 'trading-psychology', title: 'Trading Psychology & Discipline', level: 'Intermediate', hours: 8, lessons: 32, enrolled: '7.1k', price: 1499, rating: 4.8, description: 'FOMO, revenge trading, journaling, and repeatable habits.', instructor: 'Priya Menon' },
]
