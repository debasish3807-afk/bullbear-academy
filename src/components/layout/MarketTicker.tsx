const tickerData = [
  { name: 'NIFTY 50', price: '24,836.10', change: '+1.24%', up: true },
  { name: 'BANK NIFTY', price: '52,418.75', change: '+0.87%', up: true },
  { name: 'SENSEX', price: '81,523.16', change: '+1.12%', up: true },
  { name: 'RELIANCE', price: '₹2,847.50', change: '-0.34%', up: false },
  { name: 'INFOSYS', price: '₹1,891.30', change: '-0.45%', up: false },
  { name: 'HDFC BANK', price: '₹1,732.45', change: '+1.89%', up: true },
  { name: 'GOLD', price: '₹72,450', change: '+0.28%', up: true },
]

export function MarketTicker() {
  const items = [...tickerData, ...tickerData]

  return (
    <div className="fixed left-0 right-0 top-0 z-[210] overflow-hidden border-b border-line bg-bg-card py-1.5" aria-label="Market ticker">
      <div className="flex animate-ticker gap-7 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex gap-1.5 text-[0.72rem] font-semibold">
            <span className="text-text-secondary">{item.name}</span>
            <span className="text-text-primary">{item.price}</span>
            <span className={item.up ? 'text-emerald' : 'text-danger'}>{item.change}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
