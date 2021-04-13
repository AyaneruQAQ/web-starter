import request from '@/utils/request'

export function getRules(){
  return request({
    url:'/web/rules',
    method:'get',

  })
}

export function sendRules(data){
  return request({
    url:'/web/rules',
    method:'post',
    data
  })
}

export function updateRules(data){
  return request({
    url:'/web/rules',
    method:'put',
    data
  })
}