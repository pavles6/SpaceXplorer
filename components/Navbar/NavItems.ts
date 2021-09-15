export interface INavItem {
  variant: 'button' | 'link'
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
    path: '/search',
    title: 'Search',
    active: false,
    variant: 'link',
  },
  {
    path: '/about',
    title: 'About',
    active: false,
    variant: 'link',
  },
]
