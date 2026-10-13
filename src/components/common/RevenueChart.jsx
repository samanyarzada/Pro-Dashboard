import { useState } from "react";

import { formatCompactCurrency, formatCurrency } from "../../utils/format";

const WIDTH = 640;
const HEIGHT = 280;
const PAD = { top: 16, right: 12, bottom: 30, left: 52 };

function niceMax(value) {
  if (value <= 0) return 10;
  const step = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / step) * step;
}

// Accessible SVG bar chart that scales to its container and follows the theme tokens.
function RevenueChart({ data, currency = "USD" }) {
  const [active, setActive] = useState(null);

  const max = niceMax(Math.max(...data.map((item) => item.value), 0));
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((ratio) => max * ratio);

  const innerW = WIDTH - PAD.left - PAD.right;
  const innerH = HEIGHT - PAD.top - PAD.bottom;
  const slot = innerW / data.length;
  const barW = Math.min(36, slot * 0.58);

  const y = (value) => PAD.top + innerH - (value / max) * innerH;

  return (
    <div className="chart-wrap">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="chart-svg"
        role="img"
        aria-label={`Revenue by month, from ${data[0]?.month} to ${data[data.length - 1]?.month}`}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={WIDTH - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="var(--chart-grid)"
              strokeWidth="1"
            />
            <text x={PAD.left - 10} y={y(tick) + 4} textAnchor="end" className="chart-tick">
              {formatCompactCurrency(tick, currency)}
            </text>
          </g>
        ))}

        {data.map((item, index) => {
          const x = PAD.left + slot * index + (slot - barW) / 2;
          const barH = (item.value / max) * innerH;
          const isLast = index === data.length - 1;
          const isActive = active === index;

          return (
            <g
              key={item.month}
              onMouseEnter={() => setActive(index)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              aria-label={`${item.month}: ${formatCurrency(item.value, currency)}`}
            >
              <rect x={x - 4} y={PAD.top} width={barW + 8} height={innerH} fill="transparent" />
              <rect
                x={x}
                y={y(item.value)}
                width={barW}
                height={barH}
                rx="5"
                fill={isLast || isActive ? "var(--chart-bar)" : "var(--chart-bar-muted)"}
                className="chart-bar-rect"
              />
              <text x={x + barW / 2} y={HEIGHT - 8} textAnchor="middle" className="chart-tick">
                {item.month}
              </text>

              {isActive && (
                <g pointerEvents="none">
                  <rect
                    x={Math.min(Math.max(x + barW / 2 - 44, 4), WIDTH - 92)}
                    y={Math.max(y(item.value) - 34, 2)}
                    width="88"
                    height="26"
                    rx="6"
                    fill="var(--text-strong)"
                  />
                  <text
                    x={Math.min(Math.max(x + barW / 2, 48), WIDTH - 48)}
                    y={Math.max(y(item.value) - 17, 19)}
                    textAnchor="middle"
                    className="chart-tooltip-text"
                  >
                    {formatCurrency(item.value, currency)}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default RevenueChart;
