import i18n from '@/lang/index'

const emailRule = [
  { required: true, message: i18n.t('login.emptyEmail'), trigger: 'blur' },
  { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: i18n.t('login.errEmail'), trigger: 'blur' }
]

const phoneRule = [
  { required: true, message: i18n.t('login.emptyPhone'), trigger: 'blur' },
  { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: i18n.t('login.errPhone'), trigger: 'blur' }
]

export {
  emailRule,
  phoneRule
}
