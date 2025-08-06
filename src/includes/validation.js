import {
  configure,
  defineRule,
  ErrorMessage,
  Field as VeeField,
  Form as VeeForm,
} from 'vee-validate'
import {
  alpha_spaces,
  confirmed,
  email,
  max,
  max_value,
  min,
  min_value,
  required,
} from '@vee-validate/rules'

export default {
  install(app) {
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alpha_spaces)
    defineRule('email', email)
    defineRule('min_value', min_value)
    defineRule('max_value', max_value)
    defineRule('passwords_mismatch', confirmed)

    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `${ctx.field} is vereist`,
          min: `${ctx.field} is te kort, minimaal ${ctx.length} karakters`,
          max: `${ctx.field} is te lang, maximaal ${ctx.length} karakters`,
          alpha_spaces: `${ctx.field} moet alphabetisch zijn`,
          email: `Onjuist e-mailadres`,
          min_value: `${ctx.field} is te laag`,
          max_value: `${ctx.field} is te hoog`,
          passwords_mismatch: `De wachtwoorden komen niet overeen!`,
        }

        return messages[ctx.rule.name] ? messages[ctx.rule.name] : `${ctx.field} is onjuist`
      },
    })
  },
}
