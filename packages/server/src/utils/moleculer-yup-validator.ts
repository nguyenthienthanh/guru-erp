import { Errors, Validator as BaseValidator } from 'moleculer'
import * as Yup from 'yup'

const { ValidationError } = Errors

class YupValidator extends BaseValidator {
  private validator: typeof Yup
  constructor() {
    super()
    this.validator = Yup
  }

  public compile(schema: Yup.MixedSchema) {
    return (params: any) => this.validate(params, schema)
  }

  public validate(params: any, schema: Yup.MixedSchema) {
    try {
      schema.validateSync(params)
    } catch (error) {
      throw new ValidationError(error.name, null, error)
    }
    return true
  }
}

export = YupValidator
