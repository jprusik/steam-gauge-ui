import {Dispatch} from 'react';

type TimeToBeat = {
  data_imputed_completionist: boolean;
  data_imputed_extras: boolean;
  data_imputed_main_game: boolean;
  hltb_id: string;
  minutes_to_beat_completionist: number;
  minutes_to_beat_extras: number;
  minutes_to_beat_main_game: number;
}

export type App = {
  achievements_enabled?: boolean | null;
  app_id?: string;
  app_type?: string; // @TODO use enum
  app_website?: string;
  appid: number;
  big_logo?: string;
  captions?: string | null;
  commentary?: string | null;
  content_descriptorids?: number[];
  controller_support?: string; // @TODO use enum
  developers?: string[];
  genres?: string[]; // @TODO use enum
  has_community_visible_stats?: boolean;
  hdr?: boolean | null;
  hours_played?: number | null;
  img_icon_url: string;
  last_updated?: string; // ex. 'Sat, 07 Sep 2013 20:33:25 GMT'
  leaderboards_enabled?: boolean | null;
  metascore_link?: string;
  metascore?: number;
  minutes_played?: number | null;
  multiplayer?: boolean;
  name: string;
  os_linux?: boolean;
  os_mac?: boolean;
  os_windows?: boolean;
  playtime_forever: number;
  playtime_linux_forever: number;
  playtime_mac_forever: number;
  playtime_windows_forever: number;
  publishers?: string[];
  release_date?: string;
  required_age?: number;
  rtime_last_played: number;
  singleplayer?: boolean | null;
  size_mb?: number;
  source_sdk_included?: boolean | null;
  stats_enabled?: boolean | null;
  steamcloud_enabled?: boolean | null;
  store_price_default_usd?: number;
  time_to_beat?: TimeToBeat;
  tradingcards_enabled?: boolean | null;
  VAC_enabled?: boolean | null;
  workshop_enabled?: boolean | null;
}

export type Account = {
  // Public Data
  avatar: string;
  avatarfull: string;
  avatarhash: string;
  avatarmedium: string;
  cityid: string; // @TODO `cityid` is deprecated by SteamAPI
  commentpermission: number;
  communityvisibilitystate: number;
  lastlogoff: number;
  personaname: string;
  personastate: number;
  personastateflags: number;
  profilestate: number;
  profileurl: string;
  steamid: string;

  // Private Data
  gameextrainfo?: string;
  // gameid: any; // @TODO verify type
  gameserverip?: string;
  loccityid: number;
  loccountrycode: string;
  locstatecode: string;
  primaryclanid: string;
  realname: string;
  timecreated: number;
}

export type User = {
  account_id: string | null;
  admin: boolean;
  last_action: string | null;
  session_start: string | null;
}

export enum LinkType {
  ACCOUNT = 'account',
  FRIENDS = 'friends'
}

export type UserState = {
  user: User | Record<string, never>;
  setUser: Dispatch<User>;
}
