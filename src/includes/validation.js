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
        const fieldNames = {
          name: 'Naam',
          email: 'E-mailadres',
          password: 'Wachtwoord',
          confirm_password: 'Wachtwoord bevestigen',
          postText: 'je post',
        }

        const messages = {
          required: `${fieldNames[ctx.field] || ctx.field} is vereist!`,
          min: `${fieldNames[ctx.field] || ctx.field} is te kort, minimaal ${ctx.rule.params[0]} karakters!`,
          max: `${fieldNames[ctx.field] || ctx.field} is te lang, maximaal ${ctx.rule.params[0]} karakters!`,
          alpha_spaces: `${fieldNames[ctx.field] || ctx.field} moet alleen letters en spaties bevatten!!`,
          email: `Ongeldig e-mailadres :(!`,
          min_value: `${fieldNames[ctx.field] || ctx.field} is te laag!`,
          max_value: `${fieldNames[ctx.field] || ctx.field} is te hoog!`,
          passwords_mismatch: `De wachtwoorden komen niet overeen!!`,
        }

        return messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : `${fieldNames[ctx.field] || ctx.field} is onjuist`
      },
    })
  },
}
