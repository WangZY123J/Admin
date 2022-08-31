import request from '@/utils/request'

//角色列表
export const roleList = () => {
  return request({
    url: '/role/list',
    method: 'GET'
  })
}

//获取角色权限
export const rolePermission = (roleId)=>{
  return request({
    url:`/role/permission/${roleId}`,
    method:'GET'
  })
}

//修改用户权限
export const distributePermission = (data)=>{
  return request({
    url:'/role/distribute-permission',
    method:'POST',
    data
  })
}