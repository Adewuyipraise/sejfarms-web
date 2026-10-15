export function EcosystemDiagram() {
  return (
    <div className="w-full max-w-2xl">
      <svg
        viewBox="0 0 600 260"
        className="h-auto w-full"
        role="img"
        aria-label="Sejfarms Group structure"
      >
        {/* Root — Sejfarms Consults Ltd */}
        <rect
          x="180"
          y="10"
          width="240"
          height="40"
          rx="10"
          className="fill-brand"
        />
        <text
          x="300"
          y="35"
          textAnchor="middle"
          className="fill-white font-display text-[11px] font-bold"
        >
          SEJFARMS CONSULTS LTD
        </text>

        {/* Connector to branch */}
        <line
          x1="300"
          y1="50"
          x2="300"
          y2="75"
          className="stroke-brand"
          strokeWidth="1.5"
        />
        <line
          x1="100"
          y1="75"
          x2="500"
          y2="75"
          className="stroke-brand"
          strokeWidth="1.5"
        />

        {/* Verticals down to subsidiaries */}
        <line x1="100" y1="75" x2="100" y2="105" className="stroke-brand" strokeWidth="1.5" />
        <line x1="300" y1="75" x2="300" y2="105" className="stroke-brand" strokeWidth="1.5" />
        <line x1="500" y1="75" x2="500" y2="105" className="stroke-brand" strokeWidth="1.5" />

        {/* Left — Sejfarms Ventures */}
        <rect
          x="30"
          y="105"
          width="140"
          height="50"
          rx="8"
          className="fill-brand/10 stroke-brand/30"
        />
        <text
          x="100"
          y="127"
          textAnchor="middle"
          className="fill-brand font-display text-[11px] font-semibold"
        >
          Sejfarms Ventures
        </text>
        <text
          x="100"
          y="143"
          textAnchor="middle"
          className="fill-muted font-sans text-[9px]"
        >
          Agribusiness
        </text>

        {/* Center — Mosnerifoods */}
        <rect
          x="230"
          y="105"
          width="140"
          height="50"
          rx="8"
          className="fill-brand/10 stroke-brand/30"
        />
        <text
          x="300"
          y="127"
          textAnchor="middle"
          className="fill-brand font-display text-[11px] font-semibold"
        >
          Mosnerifoods
        </text>
        <text
          x="300"
          y="143"
          textAnchor="middle"
          className="fill-muted font-sans text-[9px]"
        >
          Food &amp; Value Addition
        </text>

        {/* Right — AIID Institute */}
        <rect
          x="430"
          y="105"
          width="140"
          height="50"
          rx="8"
          className="fill-brand/10 stroke-brand/30"
        />
        <text
          x="500"
          y="127"
          textAnchor="middle"
          className="fill-brand font-display text-[11px] font-semibold"
        >
          AIID Institute
        </text>
        <text
          x="500"
          y="143"
          textAnchor="middle"
          className="fill-muted font-sans text-[9px]"
        >
          Training &amp; Development
        </text>

        {/* Connectors to value chain */}
        <line x1="100" y1="155" x2="100" y2="180" className="stroke-brand/40" strokeWidth="1.5" />
        <line x1="300" y1="155" x2="300" y2="180" className="stroke-brand/40" strokeWidth="1.5" />
        <line x1="500" y1="155" x2="500" y2="180" className="stroke-brand/40" strokeWidth="1.5" />
        <line x1="100" y1="180" x2="500" y2="180" className="stroke-brand/40" strokeWidth="1.5" />
        <line x1="300" y1="180" x2="300" y2="200" className="stroke-brand/40" strokeWidth="1.5" />

        {/* Value chain box */}
        <rect
          x="190"
          y="200"
          width="220"
          height="36"
          rx="6"
          className="fill-brand-dark"
        />
        <text
          x="300"
          y="223"
          textAnchor="middle"
          className="fill-white font-display text-[10px] font-bold tracking-wider"
        >
          AQUACULTURE VALUE CHAIN
        </text>
      </svg>
    </div>
  );
}