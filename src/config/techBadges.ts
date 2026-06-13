type TechBadgeColors = {
  color: string;
  border: string;
  background: string;
  fill: string;
  hoverText: string;
  glow: string;
};

const TECH_COLORS: Record<string, string> = {
  ai: "#a78bfa",
  adobe: "#ff0000",
  "anthropic-api": "#d97757",
  antigravity: "#a78bfa",
  canvas: "#e859b8",
  "claude-code": "#d97757",
  "claude-design": "#d97757",
  cloudflare: "#f38020",
  "cloudflareworkers": "#f38020",
  "cloudflare-workers": "#f38020",
  codex: "#a78bfa",
  css: "#2965f1",
  "css-3": "#2965f1",
  css3: "#2965f1",
  docker: "#2496ed",
  express: "#f4f4f6",
  fastapi: "#009688",
  gamification: "#f59e0b",
  git: "#f05032",
  grafana: "#f46800",
  html: "#e34f26",
  "html-5": "#e34f26",
  html5: "#e34f26",
  javascript: "#f7df1e",
  jenkins: "#d33833",
  mongodb: "#47a248",
  node: "#68a063",
  "node-js": "#68a063",
  nodejs: "#68a063",
  "openai-api": "#10a37f",
  postgresql: "#336791",
  prometheus: "#e6522c",
  python: "#3776ab",
  react: "#61dafb",
  "react-js": "#61dafb",
  "react-native": "#61dafb",
  reactjs: "#61dafb",
  redis: "#dc382d",
  relume: "#a78bfa",
  serverless: "#f38020",
  "socket-io": "#f4f4f6",
  socketio: "#f4f4f6",
  spotifyapi: "#1db954",
  "spotify-api": "#1db954",
  stitch: "#a78bfa",
  tailwind: "#38bdf8",
  "tailwind-css": "#38bdf8",
  tailwindcss: "#38bdf8",
  tauri: "#ffc131",
  traefik: "#24a1c1",
  typescript: "#3178c6",
  whisper: "#10a37f",
};

const normalizeTechName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[.\s/]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((part) => part + part).join("")
    : value;

  const number = Number.parseInt(normalized, 16);

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
};

const rgba = (hex: string, alpha: number) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getReadableTextColor = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;

  return luminance > 0.46 ? "#101014" : "#ffffff";
};

export const getTechBadgeColors = (name: string): TechBadgeColors => {
  const key = normalizeTechName(name);
  const color = TECH_COLORS[key] ?? TECH_COLORS[key.replace(/-/g, "")];

  if (!color) {
    return {
      color: "var(--text-mid)",
      border: "var(--border-strong)",
      background: "var(--bg-2)",
      fill: "var(--accent-400)",
      hoverText: "var(--text-on-accent)",
      glow: "var(--accent-glow)",
    };
  }

  return {
    color,
    border: rgba(color, color === "#f4f4f6" ? 0.28 : 0.48),
    background: rgba(color, color === "#f4f4f6" ? 0.08 : 0.12),
    fill: color,
    hoverText: getReadableTextColor(color),
    glow: rgba(color, color === "#f4f4f6" ? 0.22 : 0.34),
  };
};

export const getTechBadgeStyle = (name: string) => {
  const colors = getTechBadgeColors(name);

  return {
    "--tech-color": colors.color,
    "--tech-border": colors.border,
    "--tech-bg": colors.background,
    "--tech-fill": colors.fill,
    "--tech-hover-text": colors.hoverText,
    "--tech-glow": colors.glow,
  } as Record<string, string>;
};

export const getTechBadgeStyleAttribute = (name: string) => {
  const colors = getTechBadgeColors(name);

  return `--tech-color:${colors.color};--tech-border:${colors.border};--tech-bg:${colors.background};--tech-fill:${colors.fill};--tech-hover-text:${colors.hoverText};--tech-glow:${colors.glow};`;
};
