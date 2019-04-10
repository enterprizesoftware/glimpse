import { StringOrResolver } from '@/components/common/types'

export interface MenuItem {
  label: StringOrResolver
  icon?: StringOrResolver
  submenu?: MenuItem[]
}

export interface MenuItemData {
  label: string
  icon?: string
  submenu?: MenuItemData[]
}
