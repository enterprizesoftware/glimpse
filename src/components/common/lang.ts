import { TypeOrResolver } from '@/components/common/types'

import { isNil, isFunction } from 'lodash-es'

export { isNil }

export function isAssigned(value: any) {
  return !isNil(value)
}

export function resolve<T>(value: TypeOrResolver<T>, ...params: any): T {
  if (isFunction(value)) return <T>value.call(null, params)
  else return value
}
