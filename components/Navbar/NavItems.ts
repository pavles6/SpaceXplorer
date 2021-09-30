export interface INavItem {
  variant: 'button' | 'link'
  target?: '_self' | '_blank'
  title?: string
  path?: string
  active?: boolean
  click?: Function | null
}

export const navItems: INavItem[] = [
  {
    path: '/',
    title: 'Home',
    active: false,
    variant: 'link',
  },
  {
    path: '/search?date_range=newest',
    title: 'Search',
    active: false,
    variant: 'link',
  },
  {
    path: 'https://github.com/pavles6/SpaceXplorer/tree/master#readme',
    title: 'About',
    active: false,
    variant: 'link',
    target: '_blank',
  },
]
