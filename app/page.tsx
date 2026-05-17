"use client";

import { useMemo, useState } from "react";

type Oshi = {
  name: string;
  group: string;
  balance: number;
  budget: number;
  spent: number;
  color: string;
};

const oshis: Oshi[] = [
  {
    name: "Mika",
    group: "Starlit Bloom",
    balance: 42800,
    budget: 65000,
    spent: 22200,
    color: "#e75d63"
  },
  {
    name: "Rin",
    group: "Orbit Notes",
    balance: 31400,
    budget: 48000,
    spent: 16600,
    color: "#247c7a"
  },
  {
    name: "Aoi",
    group: "Night Parade",
    balance: 18700,
    budget: 30000,
    spent: 11300,
    color: "#6b5bd7"
  }
];

const transactions = [
  { label: "Live ticket", target: "Mika", amount: -12800, date: "May 22" },
  { label: "Monthly top-up", target: "All", amount: 30000, date: "May 20" },
  { label: "Album pre-order", target: "Rin", amount: -3600, date: "May 18" },
  { label: "Merch reserve", target: "Aoi", amount: -5000, date: "May 14" }
];

const upcoming = [
  { title: "Starlit Bloom Arena", date: "Jun 08", estimate: 18000 },
  { title: "Orbit Notes Release Week", date: "Jun 14", estimate: 9200 },
  { title: "Night Parade Fan Meet", date: "Jun 28", estimate: 12500 }
];

const formatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [monthlyTopUp, setMonthlyTopUp] = useState(30000);
  const active = oshis[selected];

  const totalBalance = useMemo(
    () => oshis.reduce((sum, oshi) => sum + oshi.balance, 0) + monthlyTopUp,
    [monthlyTopUp]
  );

  const activeProgress = Math.round((active.spent / active.budget) * 100);

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Wallet navigation">
        <div className="brand">
          <div className="brandMark" aria-hidden="true">
            O
          </div>
          <div>
            <p>Oshi Wallet</p>
            <span>fan budget</span>
          </div>
        </div>
        <nav className="nav">
          <button className="active" type="button">
            Overview
          </button>
          <button type="button">Oshi</button>
          <button type="button">Plans</button>
          <button type="button">History</button>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">May 2026</p>
            <h1>Oshi activity balance</h1>
          </div>
          <button className="primaryAction" type="button">
            Top up
          </button>
        </header>

        <section className="heroPanel" aria-label="Total balance">
          <div>
            <p className="label">Available balance</p>
            <strong>{formatter.format(totalBalance)}</strong>
            <span>Scheduled top-up {formatter.format(monthlyTopUp)}</span>
          </div>
          <div className="coinStack" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>

        <section className="grid">
          <div className="panel oshiPanel">
            <div className="panelHeader">
              <h2>Oshi wallets</h2>
              <div className="segmented" role="tablist" aria-label="Choose oshi">
                {oshis.map((oshi, index) => (
                  <button
                    aria-selected={selected === index}
                    key={oshi.name}
                    onClick={() => setSelected(index)}
                    role="tab"
                    type="button"
                  >
                    {oshi.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="oshiDetail">
              <div className="avatar" style={{ background: active.color }}>
                {active.name.slice(0, 1)}
              </div>
              <div>
                <h3>{active.name}</h3>
                <p>{active.group}</p>
              </div>
              <strong>{formatter.format(active.balance)}</strong>
            </div>

            <div className="meter" aria-label={`Budget usage ${activeProgress}%`}>
              <span style={{ width: `${activeProgress}%`, background: active.color }} />
            </div>
            <div className="meterMeta">
              <span>Spent {formatter.format(active.spent)}</span>
              <span>{activeProgress}%</span>
            </div>
          </div>

          <div className="panel topUpPanel">
            <div className="panelHeader compact">
              <h2>Monthly top-up</h2>
              <span>{formatter.format(monthlyTopUp)}</span>
            </div>
            <input
              aria-label="Monthly top-up amount"
              max="80000"
              min="0"
              onChange={(event) => setMonthlyTopUp(Number(event.target.value))}
              step="5000"
              type="range"
              value={monthlyTopUp}
            />
            <div className="quickAmounts">
              {[10000, 30000, 50000].map((amount) => (
                <button key={amount} onClick={() => setMonthlyTopUp(amount)} type="button">
                  {formatter.format(amount)}
                </button>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panelHeader compact">
              <h2>Planned spend</h2>
              <span>3 items</span>
            </div>
            <div className="list">
              {upcoming.map((item) => (
                <article key={item.title} className="rowItem">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.date}</span>
                  </div>
                  <p>{formatter.format(item.estimate)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panelHeader compact">
              <h2>History</h2>
              <span>Latest</span>
            </div>
            <div className="list">
              {transactions.map((item) => (
                <article key={`${item.label}-${item.date}`} className="rowItem">
                  <div>
                    <strong>{item.label}</strong>
                    <span>
                      {item.target} / {item.date}
                    </span>
                  </div>
                  <p className={item.amount > 0 ? "income" : ""}>
                    {formatter.format(item.amount)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
