import { StringOrResolver } from '@/components/common/types'

export interface MenuItem {
  label: StringOrResolver
  icon?: StringOrResolver
  menu?: MenuItem[]
}
