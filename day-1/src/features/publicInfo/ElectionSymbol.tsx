// Symbol map for top 10 parties in Nepal
export const symbolMap: Record<string, string> = {
  tree: "🌳",
  bell: "🔔",
  sun: "☀️",
  shoes: "👟",
  plough: "🧑‍🌾",
  hammer: "🔨",
  sickle: "🪓",
  book: "📚",
  hand: "✋",
  kite: "🪁",
  // extra symbols for diversity (optional)
  pen: "🖊️",
  star: "⭐",
  leaf: "🍃",
  crown: "👑",
  flag: "🏳️",
  heart: "❤️",
  wheel: "🛞",
  cup: "🏆",
  moon: "🌙",
  fish: "🐟",
};

// Default emoji if symbol not in map
export const defaultSymbol = "🔺";

interface Props {
  symbol?: string | null;
}

export default function ElectionSymbol({ symbol = null }: Props) {
  let emoji = defaultSymbol;

  if (symbol) {
    const sym = symbol.toLowerCase();
    if (Object.hasOwn(symbolMap, sym)) {
      emoji = symbolMap[sym];
    }
  }

  return (
    <div>
      <span>{emoji}</span>
    </div>
  );
}
