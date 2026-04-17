import { cashflow30d, categoryBreakdown, formatCompact } from "../data";

// Cashflow Area Chart (custom SVG)
export function CashflowChart({ height = 220 }: { height?: number }) {
  const data = cashflow30d;
  const w = 800;
  const h = height;
  const pad = { l: 40, r: 16, t: 16, b: 24 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const max = Math.max(...data.map(d => Math.max(d.income, d.expense)));
  const x = (i: number) => pad.l + (i / (data.length - 1)) * innerW;
  const y = (v: number) => pad.t + innerH - (v / max) * innerH;

  const buildPath = (key: "income" | "expense") => {
    return data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d[key])}`).join(" ");
  };
  const buildArea = (key: "income" | "expense") => {
    const top = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d[key])}`).join(" ");
    return `${top} L ${x(data.length - 1)} ${pad.t + innerH} L ${pad.l} ${pad.t + innerH} Z`;
  };

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => ({
    v: max * t,
    y: pad.t + innerH - t * innerH,
  }));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="incFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#34e0a1" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#34e0a1" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="expFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#f25f7a" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#f25f7a" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Grid */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={pad.l} x2={w - pad.r} y1={t.y} y2={t.y} stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4"/>
          <text x={pad.l - 8} y={t.y + 3} textAnchor="end" className="fill-ink-400 font-mono" fontSize="9">
            {formatCompact(t.v)}
          </text>
        </g>
      ))}

      {/* X axis ticks */}
      {[0, 7, 14, 21, 29].map((i) => (
        <text key={i} x={x(i)} y={h - 6} textAnchor="middle" className="fill-ink-400 font-mono" fontSize="9">
          D{i + 1}
        </text>
      ))}

      {/* Areas */}
      <path d={buildArea("income")} fill="url(#incFill)"/>
      <path d={buildArea("expense")} fill="url(#expFill)"/>

      {/* Lines */}
      <path d={buildPath("income")} fill="none" stroke="#34e0a1" strokeWidth="1.8" className="animate-draw"/>
      <path d={buildPath("expense")} fill="none" stroke="#f25f7a" strokeWidth="1.8" className="animate-draw" style={{ animationDelay: "0.3s" }}/>

      {/* End dots */}
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].income)} r="3.5" fill="#34e0a1"/>
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].income)} r="6" fill="#34e0a1" opacity="0.25"/>
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1].expense)} r="3.5" fill="#f25f7a"/>
    </svg>
  );
}

// Donut category chart
export function CategoryDonut({ size = 180 }: { size?: number }) {
  const total = categoryBreakdown.reduce((s, c) => s + c.value, 0);
  const r = 70;
  const stroke = 18;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke}/>
        {categoryBreakdown.map((cat, i) => {
          const frac = cat.value / total;
          const dash = frac * c;
          const offset = -acc * c;
          acc += frac;
          return (
            <circle
              key={i}
              cx="100" cy="100" r={r}
              fill="none"
              stroke={cat.color}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={offset}
              className="transition-all"
              style={{ filter: `drop-shadow(0 0 6px ${cat.color}40)` }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-ink-400 font-mono">This month</div>
          <div className="text-2xl font-mono font-semibold text-ink-100 tabular mt-0.5">{formatCompact(total)}<span className="text-ink-400 text-sm">₫</span></div>
          <div className="text-[10px] text-ink-400 mt-0.5">across 7 categories</div>
        </div>
      </div>
    </div>
  );
}

// Bar comparison chart (income vs expense per week, 8 weeks)
export function WeeklyBars() {
  const weeks = Array.from({ length: 8 }, (_, i) => ({
    label: `W${i + 1}`,
    income: 18000000 + Math.sin(i * 1.4) * 8000000 + i * 400000,
    expense: 12000000 + Math.cos(i * 1.1) * 5000000 + (i === 4 ? 6000000 : 0),
  }));
  const max = Math.max(...weeks.map(w => Math.max(w.income, w.expense)));

  return (
    <div className="flex items-end gap-3 h-40 px-2">
      {weeks.map((w, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="flex items-end gap-0.5 w-full h-32">
            <div
              className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-deep to-emerald-glow relative group"
              style={{ height: `${(w.income / max) * 100}%`, transition: `height 0.6s ease ${i * 0.05}s` }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-[9px] font-mono bg-ink-800 px-1.5 py-0.5 rounded whitespace-nowrap border border-white/10">
                +{formatCompact(w.income)}
              </div>
            </div>
            <div
              className="flex-1 rounded-t-sm bg-gradient-to-t from-rose-soft/40 to-rose-soft relative group"
              style={{ height: `${(w.expense / max) * 100}%`, transition: `height 0.6s ease ${i * 0.05 + 0.1}s` }}
            >
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-[9px] font-mono bg-ink-800 px-1.5 py-0.5 rounded whitespace-nowrap border border-white/10">
                −{formatCompact(w.expense)}
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-ink-400">{w.label}</div>
        </div>
      ))}
    </div>
  );
}

// Sparkline
export function Sparkline({ data, color = "#34e0a1", w = 120, h = 32 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const x = (i: number) => (i / (data.length - 1)) * w;
  const y = (v: number) => h - ((v - min) / range) * h;
  const path = data.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(v)}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg-${color})`}/>
      <path d={path} fill="none" stroke={color} strokeWidth="1.4"/>
    </svg>
  );
}
