import request from '@/utils/request'

export function company(data) {
  return request({
    url: '/api/company/page',
    method: 'post',
    data
  })
}