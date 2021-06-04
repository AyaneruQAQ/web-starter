module.exports = {
  'presets': [
    '@vue/cli-plugin-babel/preset',
    '@vue/babel-preset-jsx'
  ],
  'env': {
    'development': {
      'plugins': [
        'dynamic-import-node'
      ]
    }
  },
  'plugins': [
    'lodash',
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ]
  ]
}
