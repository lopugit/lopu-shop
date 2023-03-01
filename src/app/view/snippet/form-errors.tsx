import * as React from 'react'
import { ShopifyNext } from '@dotdev/next-components'
import { Form } from 'types'

export class FormErrors extends React.PureComponent<FormErrors.Props> {
  private errors = this.props.form.errors;

  public render(): JSX.Element {
    const keys = Object.keys(this.errors)
    const { className } = this.props
    return keys.length ? (
      <div className={`${className ? className : 'text-left font-medium text-red italic leading-normal mt-0-6'} px-1-6`}>
        {keys.map((key: string, i: number) => (
          <p key={i} className={'mb-0-4'}>
            {this.errors[key] === 'is invalid' ? 'Please fill the required fields' : ShopifyNext.Utils.parseHTML(this.errors[key], false)}
          </p>
        ))}
      </div>
    ) : null
  }
} 

export namespace FormErrors {
  export interface Props {
    form: Form;
    className?: string;
  }
}
