// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: 'views/documentation/index',
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: 'layout/Layout',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: 'views/guide/index',
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: 'permission',
    name:'permission',
    parentName:'',
    menuType:'目录',
    id:3,
    perms:'',
    children: [
      {
        path: 'page',
        name: 'pagePermission',
        parentName:'permission',
        menuType:'菜单',
        id:4,
        perms:'',
      },
      {
        path: 'directive',
        name: 'directivePermission',
        parentName:'permission',
        menuType:'菜单',
        id:5,
        perms:'',
      },
      {
        path: 'role',
        name: 'rolePermission',
        parentName:'permission',
        menuType:'菜单',
        id:6,
        perms:'',
      },
      {
        path:'menu',
        name:'menuManage',
        parentName:'permission',
        menuType:'菜单',
        id:7,
        perms:'',
      }
    ]
  },

  {
    path: 'myexample',
    parentName:'',
    name:'myexample',
    menuType:'目录',
    id:10,
    perms:'',
    children: [
      {
        path: 'index',
        name: 'myexampleindex',
        parentName:'myexample',
        menuType:'菜单',
        id:1,
        perms:'',
        children:[
          {
            type:'element',
            name:'btn',
            parentName:'myexampleindex',
            menuType:'按钮',
            id:2,
            perms:'sys:btn',
          }
        ]
      },
      {
        path: 'dynamic',
        name: 'dynamic',
        parentName:'myexample',
        menuType:'菜单',
        id:11,
        perms:'',
      }
    ]
  },
/*   {
    path: '/components',
    name: 'ComponentDemo',
    meta: {
      title: 'components',
    },
    children: [
      {
        path: 'tinymce',
        name: 'TinymceDemo',
        meta: { title: 'tinymce' }
      },
      {
        path: 'markdown',
        name: 'MarkdownDemo',
        meta: { title: 'markdown' }
      },
      {
        path: 'json-editor',
        name: 'JsonEditorDemo',
        meta: { title: 'jsonEditor' }
      },
      {
        path: 'split-pane',
        name: 'SplitpaneDemo',
        meta: { title: 'splitPane' }
      },
      {
        path: 'avatar-upload',
        name: 'AvatarUploadDemo',
        meta: { title: 'avatarUpload' }
      },
      {
        path: 'dropzone',
        name: 'DropzoneDemo',
        meta: { title: 'dropzone' }
      },
      {
        path: 'sticky',
        name: 'StickyDemo',
        meta: { title: 'sticky' }
      },
      {
        path: 'count-to',
        name: 'CountToDemo',
        meta: { title: 'countTo' }
      },
      {
        path: 'mixin',
        name: 'ComponentMixinDemo',
        meta: { title: 'componentMixin' }
      },
      {
        path: 'back-to-top',
        name: 'BackToTopDemo',
        meta: { title: 'backToTop' }
      },
      {
        path: 'drag-dialog',
        name: 'DragDialogDemo',
        meta: { title: 'dragDialog' }
      },
      {
        path: 'drag-select',
        name: 'DragSelectDemo',
        meta: { title: 'dragSelect' }
      },
      {
        path: 'dnd-list',
        name: 'DndListDemo',
        meta: { title: 'dndList' }
      },
      {
        path: 'drag-kanban',
        name: 'DragKanbanDemo',
        meta: { title: 'dragKanban' }
      }
    ]
  }, */
/*   {
    path: '/charts',
    name: 'Charts',
    meta: {
      title: 'charts',
    },
    children: [
      {
        path: 'keyboard',
        name: 'KeyboardChart',
        meta: { title: 'keyboardChart' }
      },
      {
        path: 'line',
        name: 'LineChart',
        meta: { title: 'lineChart'}
      },
      {
        path: 'mixchart',
        name: 'MixChart',
        meta: { title: 'mixChart' }
      }
    ]
  },
  {
    path: '/nested',
    name: 'Nested',
    meta: {
      title: 'nested',
    },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            name: 'Menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  }, */
  

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
