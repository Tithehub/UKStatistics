
export type TileFmt = 'number'|'integer'|'percent1'|'millions2'|'debt'|'list'|'string';
export type Category = 'Immigration'|'Crime'|'Debt'|'Threat'|'Census'|'Economy'|'Health'|'Defence'|'Markets';
export interface Tile {
  id: string;
  title: string;
  category: Category;
  endpoint: string;
  path: string | null;
  fmt: TileFmt;
  fallback: any;
  source?: { label: string; href: string };
}

export const SCHEMA_VERSION = 3;

export const CATEGORIES: Category[] = [
  'Immigration','Crime','Debt','Threat','Census','Economy','Health','Defence','Markets'
];

export const CATEGORY_STYLES: Record<Category, { chip: string; tile: string; }> = {
  Immigration: { chip: 'bg-sky-400/15 text-sky-200 border-sky-400/30', tile: 'border-sky-400/30 hover:bg-sky-400/10' },
  Crime:       { chip: 'bg-violet-400/15 text-violet-200 border-violet-400/30', tile: 'border-violet-400/30 hover:bg-violet-400/10' },
  Debt:        { chip: 'bg-amber-400/15 text-amber-200 border-amber-400/30', tile: 'border-amber-400/30 hover:bg-amber-400/10' },
  Threat:      { chip: 'bg-red-400/15 text-red-200 border-red-400/30', tile: 'border-red-400/30 hover:bg-red-400/10' },
  Census:      { chip: 'bg-emerald-400/15 text-emerald-200 border-emerald-400/30', tile: 'border-emerald-400/30 hover:bg-emerald-400/10' },
  Economy:     { chip: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/30', tile: 'border-cyan-400/30 hover:bg-cyan-400/10' },
  Health:      { chip: 'bg-teal-400/15 text-teal-200 border-teal-400/30', tile: 'border-teal-400/30 hover:bg-teal-400/10' },
  Defence:     { chip: 'bg-indigo-400/15 text-indigo-200 border-indigo-400/30', tile: 'border-indigo-400/30 hover:bg-indigo-400/10' },
  Markets:     { chip: 'bg-fuchsia-400/15 text-fuchsia-200 border-fuchsia-400/30', tile: 'border-fuchsia-400/30 hover:bg-fuchsia-400/10' },
};

export const defaultTiles = [
  { id:'smallboats_in', title:'Irregular arrivals (7d)', category:'Immigration', endpoint:'/api/homeoffice-smallboats', path:'daily_avg', fmt:'number', fallback:308, source:{label:'Home Office (last 7 days)', href:'https://www.gov.uk/government/publications/migrants-detected-crossing-the-english-channel-in-small-boats/migrants-detected-crossing-the-english-channel-in-small-boats-last-7-days'} },
  { id:'returns_out', title:'Returns/day', category:'Immigration', endpoint:'/api/homeoffice-returns', path:'daily_avg', fmt:'number', fallback:60, source:{label:'Home Office (immigration stats)', href:'https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-march-2025/how-many-people-are-returned-from-the-uk'} },
  { id:'legal_in', title:'Legal in/day', category:'Immigration', endpoint:'/api/ons-ltim', path:'daily_in', fmt:'number', fallback:2000, source:{label:'ONS LTIM', href:'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration'} },
  { id:'legal_out', title:'Legal out/day', category:'Immigration', endpoint:'/api/ons-ltim', path:'daily_out', fmt:'number', fallback:1500, source:{label:'ONS LTIM', href:'https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/internationalmigration'} },

  { id:'police_total', title:'Police (FTE)', category:'Crime', endpoint:'/api/police-total', path:'total_fte', fmt:'number', fallback:173400, source:{label:'UK police workforce', href:'https://www.gov.uk/government/collections/police-workforce-england-and-wales'} },
  { id:'safest', title:'Safest areas', category:'Crime', endpoint:'/api/policeuk-crime-rank', path:'safest_areas', fmt:'list', fallback:['Rutland','Isles of Scilly'], source:{label:'Police.uk API (E&W)', href:'https://data.police.uk/'} },
  { id:'dangerous', title:'Highest crime areas', category:'Crime', endpoint:'/api/policeuk-crime-rank', path:'highest_crime_areas', fmt:'list', fallback:['Westminster','Middlesbrough'], source:{label:'Police.uk API (E&W)', href:'https://data.police.uk/'} },

  { id:'mil_total', title:'Military (total)', category:'Defence', endpoint:'/api/mod-total', path:'total_personnel', fmt:'number', fallback:180800, source:{label:'MOD personnel stats', href:'https://www.gov.uk/government/statistics/quarterly-service-personnel-statistics-2025'} },
  { id:'threat_level', title:'Threat level', category:'Threat', endpoint:'/api/mi5-threat', path:'level', fmt:'string', fallback:'SUBSTANTIAL', source:{label:'MI5/JTAC', href:'https://www.mi5.gov.uk/threats-and-advice/terrorism-threat-levels'} },
  { id:'geo_idx', title:'Geo index', category:'Threat', endpoint:'/api/geo-index', path:'index', fmt:'integer', fallback:31, source:{label:'Threat level + events', href:'https://www.mi5.gov.uk/threats-and-advice/terrorism-threat-levels'} },
  { id:'unrest_idx', title:'Unrest index', category:'Threat', endpoint:'/api/unrest-index', path:'index', fmt:'integer', fallback:28, source:{label:'Composite: events data', href:'https://www.gdeltproject.org/'} },

  { id:'debt_total', title:'Debt (PSND)', category:'Debt', endpoint:'/api/ons-debt', path:null, fmt:'debt', fallback:{bn:2874, pct:96.3}, source:{label:'ONS PSF (CPOA)', href:'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/'} },

  { id:'unemployment', title:'Unemployment', category:'Economy', endpoint:'/api/economy', path:'unemployment_rate', fmt:'percent1', fallback:4.6, source:{label:'ONS labour market', href:'https://www.ons.gov.uk/employmentandlabourmarket'} },
  { id:'cpi', title:'CPI', category:'Economy', endpoint:'/api/economy', path:'cpi_inflation', fmt:'percent1', fallback:3.1, source:{label:'ONS prices', href:'https://www.ons.gov.uk/economy/inflationandpriceindices'} },

  { id:'nhs_wait', title:'NHS waits', category:'Health', endpoint:'/api/economy', path:'nhs_waiting_millions', fmt:'millions2', fallback:7.68, source:{label:'NHS England RTT', href:'https://www.england.nhs.uk/statistics/statistical-work-areas/rtt-waiting-times/'} },

  { id:'births_day', title:'Births/day', category:'Census', endpoint:'/api/ons-demography', path:'births_per_day', fmt:'number', fallback:1700, source:{label:'ONS vital statistics', href:'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages'} },
  { id:'deaths_day', title:'Deaths/day', category:'Census', endpoint:'/api/ons-demography', path:'deaths_per_day', fmt:'number', fallback:1600, source:{label:'ONS mortality', href:'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths'} },
  { id:'marriages_day', title:'Marriages/day', category:'Census', endpoint:'/api/ons-demography', path:'marriages_per_day', fmt:'number', fallback:900, source:{label:'ONS marriages', href:'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/marriagecohabitationandcivilpartnerships'} },

  { id:'btc_price', title:'BTC (USD)', category:'Markets', endpoint:'/api/markets-btc', path:'usd', fmt:'number', fallback:68000, source:{label:'Mock BTC feed', href:'#'} },
  { id:'gold_oz', title:'Gold/oz (USD)', category:'Markets', endpoint:'/api/markets-gold', path:'usd', fmt:'number', fallback:2350, source:{label:'Mock Gold feed', href:'#'} },
  { id:'silver_oz', title:'Silver/oz (USD)', category:'Markets', endpoint:'/api/markets-silver', path:'usd', fmt:'number', fallback:29.5, source:{label:'Mock Silver feed', href:'#'} },
  { id:'gbp_usd', title:'GBP/USD', category:'Markets', endpoint:'/api/fx-gbpusd', path:'rate', fmt:'number', fallback:1.27, source:{label:'Mock FX feed', href:'#'} },
] as const;

export interface PersistedConfig {
  schemaVersion: number;
  refreshSeconds: number;
  tiles: typeof defaultTiles[number][];
}

export const defaultConfig: PersistedConfig = {
  schemaVersion: SCHEMA_VERSION,
  refreshSeconds: 60,
  tiles: defaultTiles as any,
};
