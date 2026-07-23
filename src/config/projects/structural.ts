import {
  keevo_home,
  keevo_studio,
  edumation,
  edumation_login,
  edumation_schedule,
  edumation_profile,
  railguessr,
  railguessr_home,
  railguessr_daily,
  fuchibol,
  fuchibol_prediction,
  fuchibol_games,
  singuessr_home,
  singuessr_blindtest,
  singuessr_create,
  singuessr_create2,
  singuessr_coverdle,
} from '../../assets';
import type { ProjectTag, ImageAsset } from '../../types';

export type ProjectStructural = {
  name: string;
  slug: string;
  tags: ProjectTag[];
  image: ImageAsset | null;
  images: ImageAsset[];
  source_code_link: string;
  live_link?: string;
  nextProjectSlug?: string;
};

export const projectsStructural: ProjectStructural[] = [
  {
    name: "Keevo",
    slug: "keevo",
    tags: [
      { name: "Tauri", color: "blue-text-gradient" },
      { name: "Rust", color: "orange-text-gradient" },
      { name: "React", color: "pink-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "On-device AI", color: "green-text-gradient" },
    ],
    image: keevo_home,
    images: [keevo_home, keevo_home, keevo_studio],
    source_code_link: "https://github.com/",
    live_link: "https://keevo.dev/",
    nextProjectSlug: "edumation",
  },
  {
    name: "EduMation",
    slug: "edumation",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "docker", color: "pink-text-gradient" },
    ],
    image: edumation,
    images: [edumation, edumation_login, edumation_schedule, edumation_profile],
    source_code_link: "https://github.com/",
    nextProjectSlug: "railguessr",
  },
  {
    name: "RailGuessr",
    slug: "railguessr",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "canvas", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
      { name: "online", color: "orange-text-gradient" },
    ],
    image: railguessr,
    images: [railguessr, railguessr_home, railguessr_daily],
    source_code_link: "https://github.com/",
    live_link: "https://railguessr.com/",
    nextProjectSlug: "singuessr",
  },
  {
    name: "Singuessr",
    slug: "singuessr",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "serverless", color: "green-text-gradient" },
      { name: "spotify-api", color: "pink-text-gradient" },
      { name: "apple-music-api", color: "orange-text-gradient" },
    ],
    image: singuessr_home,
    images: [
      singuessr_home,
      singuessr_blindtest,
      singuessr_create,
      singuessr_create2,
      singuessr_coverdle,
    ],
    source_code_link: "https://github.com/",
    live_link: "https://singuessr.com/",
    nextProjectSlug: "fuchibol-hub",
  },
  {
    name: "FuchibolHub",
    slug: "fuchibol-hub",
    tags: [
      { name: "reactjs", color: "blue-text-gradient" },
      { name: "nodejs", color: "green-text-gradient" },
      { name: "socket.io", color: "pink-text-gradient" },
    ],
    image: fuchibol,
    images: [fuchibol, fuchibol_prediction, fuchibol_games],
    source_code_link: "https://github.com/",
    nextProjectSlug: "fresh-win",
  },
  {
    name: "Fresh.win",
    slug: "fresh-win",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "gamification", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: null,
    images: [],
    source_code_link: "https://github.com/",
    nextProjectSlug: "edumation",
  },
];
