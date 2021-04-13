import { asyncRoutesMap, constantRoutes,asyncRoutes } from '@/router'
import path from 'path'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

function hasAuthorization(authorization, route) {
  if (route.meta && route.meta.auth) {
    return authorization.some(auth => {
      return route.meta.auth.some(routeAuth => {
        return routeAuth === auth
      })
    })
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routesMap asyncRoutesMap
 * @param routers serviceRoutes
 * @param basePath resolve path
 */
/* export function filterAsyncRoutes(routesMap, routers, basePath = '/') {

  for(let i=0;i<routers.length;i++){//按钮权限分离出路由
    if(routers[i].type){
      state.btnPermission.push(path.resolve(basePath,routers[i].name))
      routers.splice(i,1)
      i--
    }else{
      const pathKey = path.resolve(basePath,routers[i].path)
      if(!routers[i].parentName){
        routers[i].path = pathKey
      }
      if(routesMap[pathKey]){
        routers[i] = {...routers[i],...routesMap[pathKey]}
      }
      if(routers[i].children){
        filterAsyncRoutes(routesMap,routers[i].children,pathKey)
      }
    }
  }

  return routers
} */

/**
 * 
 */
export function filterAsyncRoutes(routes, authorization) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasAuthorization(authorization, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, authorization)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: constantRoutes,
  addRoutes: [],
  // btnPermission:[],//控制页面按钮级的权限，
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
}

const actions = {
  // generateRoutes({ commit,state }, {roles,routers}) {
  //   return new Promise(resolve => {
  //     let accessedRoutes
  //     accessedRoutes = filterAsyncRoutes(asyncRoutesMap, routers)
  //     commit('SET_ROUTES', accessedRoutes)
  //     resolve(accessedRoutes)
  //   })
  // },
  generateRoutes({ commit }, authList) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, authList)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
