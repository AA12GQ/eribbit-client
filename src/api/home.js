import request from '@/utils/request'

export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit })
}

export const findBanner = (distributionSite = 1) => {
  return request('/home/banner', 'get', { distributionSite: distributionSite })
}

export const findNew = (limit = 4) => {
  return request('/home/new', 'get', { limit: limit })
}
