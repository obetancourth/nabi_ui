export enum HearAboutUs {
  Google = 'google',
  Facebook = 'facebook',
  Craigslist = 'craigslist',
  PrintAds = 'printAds',
  WordOfMouth = 'wordOfMouth',
  CurrentNabiUser = 'currentNabiUser',
  Other= 'other'
}

export interface HearAboutUsInfo {
  value: HearAboutUs;
  label: string;
}

export const hearAboutUsInfo = {
  Google: <HearAboutUsInfo> {
    value: HearAboutUs.Google,
    label: 'Google'
  },
  Facebook: <HearAboutUsInfo> {
    value: HearAboutUs.Facebook,
    label: 'Facebook'
  },
  Craigslist: <HearAboutUsInfo> {
    value: HearAboutUs.Craigslist,
    label: 'Craigslist'
  },
  PrintAds: <HearAboutUsInfo> {
    value: HearAboutUs.PrintAds,
    label: 'Print Ads'
  },
  WordOfMouth: <HearAboutUsInfo> {
    value: HearAboutUs.WordOfMouth,
    label: 'Word Of Mouth'
  },
  CurrentNabiUser: <HearAboutUsInfo> {
    value: HearAboutUs.CurrentNabiUser,
    label: 'Current Nabi User'
  },
  Other: <HearAboutUsInfo> {
    value: HearAboutUs.Other,
    label: 'Other'
  }
};

export enum Role {
  student = 'student',
  instructor = 'instructor',
  parent = 'parent'
}

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  zipCode: string;
  role: Role;
  hearAboutUs: string;
  avatar?: string;
}

export type IState = UserState[];
