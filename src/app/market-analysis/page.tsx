import type { Metadata } from 'next'
import { Card } from '@/components/ui'

export const metadata: Metadata = { title: 'Market Analysis' }

const indices = [
  { name: 'NIFTY 50', price: '24,836.10', change: '+1.24%', up: true },
  { name: 'BANK NIFTY', price: '52,418.75', change: '+0.87%', up: true },
  { name: 'SENSEX', price: '81,523.16', change: '+1.12%', up: true },
  { name: 'INDIA VIX', price: '12.84', change: '-5.31%', up: false },
]

const gainers = [
  { name: 'Tata Motors', price: '₹982.40', change: '+4.82%' },
  { name: 'HDFC Bank', price: '₹1,732.45', change: '+3.21%' },
  { name: 'SBI', price: '₹842.60', change: '+2.94%' },
  { name: 'Bajaj Finance', price: '₹7,428.90', change: '+2.67%' },
]

const losers = [
  { name: 'Wipro', price: '₹482.30', change: '-2.14%' },
  { name: 'Tech Mahindra', price: '₹1,382.60', change: '-1.88%' },
  { name: "Dr Reddy's", price: '₹5,842.40', change: '-1.52%' },
  { name: 'BPCL', price: '₹612.80', change: '-1.24%' },
]

export default function MarketAnalysisPage() {
  return (
    <div className="px-6 pb-16 pt-[120px]">
      <div className="container-main">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-[clamp(2rem,4vw,3rem)] font-bold">Market Analysis</h1>
          <p className="text-text-secondary">Indices, movers, sector performance, and institutional activity.</p>
        </div>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {indices.map((idx) => (
            <Card key={idx.name}>
              <div className="text-xs text-text-muted">{idx.name}</div>
              <div className="font-heading text-xl font-extrabold">{idx.price}</div>
              <div className={`text-sm font-semibold ${idx.up ? 'text-emerald' : 'text-danger'}`}>{idx.change}</div>
            </Card>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <h3 className="mb-3 font-semibold">Top Gainers</h3>
            <table className="w-full text-sm">
              <tbody>
                {gainers.map((s) => (
                  <tr key={s.name} className="border-b border-line last:border-0">
                    <td className="py-2.5 font-medium">{s.name}</td>
                    <td className="py-2.5">{s.price}</td>
                    <td className="py-2.5 text-right text-emerald">{s.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card>
            <h3 className="mb-3 font-semibold">Top Losers</h3>
            <table className="w-full text-sm">
              <tbody>
                {losers.map((s) => (
                  <tr key={s.name} className="border-b border-line last:border-0">
                    <td className="py-2.5 font-medium">{s.name}</td>
                    <td className="py-2.5">{s.price}</td>
                    <td className="py-2.5 text-right text-danger">{s.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        <Card className="mt-5">
          <h3 className="mb-3 font-semibold">FII / DII Activity (June 2026)</h3>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-line text-xs text-text-muted"><th className="pb-2 text-left">Category</th><th className="pb-2 text-left">Buy (Cr)</th><th className="pb-2 text-left">Sell (Cr)</th><th className="pb-2 text-left">Net</th></tr></thead>
            <tbody>
              <tr className="border-b border-line"><td className="py-2.5 font-medium">FII</td><td>₹48,240</td><td>₹42,180</td><td className="text-emerald">+₹6,060</td></tr>
              <tr><td className="py-2.5 font-medium">DII</td><td>₹52,840</td><td>₹49,120</td><td className="text-emerald">+₹3,720</td></tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
