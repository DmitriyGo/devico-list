export enum StackRoute {
  HOME = 'Home',
  PROFILE = 'Profile',
  SIGN_IN = 'SignIn',
  SIGN_UP = 'SignUp',
  MAIN_TABS = 'MainTabs',
}

export type RootStackParamList = {
  [StackRoute.HOME]: undefined
  [StackRoute.SIGN_IN]: undefined
  [StackRoute.SIGN_UP]: undefined
  [StackRoute.PROFILE]: undefined
  [StackRoute.MAIN_TABS]: undefined
}
