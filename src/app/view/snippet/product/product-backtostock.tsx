import * as React from 'react'
import axios from 'axios'
import * as Snippets from 'snippets'
import { GlobalProps, Variant } from 'types'

export class ProductBackToStock extends React.PureComponent<ProductBackToStock.Props, ProductBackToStock.State> {
  public constructor(props: ProductBackToStock.Props) {
    super(props)
    this.state = {
      value: '',
      submitted: false,
      validated: false,
      showValidatorIcon: false
    }
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    this.setState({
      value
    }, () => {
      if(!value) {
        this.setState({
          showValidatorIcon: false
        })
      }
    })
  }

  private onBlur = () => {
    const { value } = this.state
    this.setState({
      validated: this.validateEmail(value),
    }, () => {
      if(value) {
        this.setState({
          showValidatorIcon: true
        })
      }
    })
  }

  private submitForm = async (e: React.FormEvent) => {
    e.preventDefault()

    const { product, shop } = this.props.data

    const body = {
      store: shop.permanent_domain,
      email: this.state.value,
      product: `${product.id}`,
      url: product.url,
      variant: `${this.props.variant.id}`,
      ajax: 'true'
    }

    const url = 'https://alertmerestockalerts.herokuapp.com/addemail'

    await axios.post(url, body)

    this.setState({
      submitted: true
    })
  }

  private validateEmail = (email: ProductBackToStock.State['value']) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  public render(): JSX.Element {
    const { submitted, value, validated, showValidatorIcon } = this.state
    const { daRestock } = this.props.data.shop.metafields
    return daRestock ? (
      <div className={this.props.className ? `${this.props.className}` : ''}>
        {submitted
          ? <div className={'w-full flex flex-wrap justify-center'}>
            <Snippets.Heading size={'p'} tag={'p'} className={'h-8 flex items-center'}>
              {daRestock.success}
            </Snippets.Heading>
            <div className={'w-full h-5-6 bg-black text-white flex items-center justify-center'}>
              <Snippets.Icon name={'checked'} width={15} height={15}/>
            </div>
          </div>
          : <form onSubmit={(e: React.FormEvent) => this.submitForm(e)}>
            <div className={'h-8 w-full border border-black relative flex items-center justify-center pr-1-6'}>
              <Snippets.Input
                id={"restock-form"}
                type={'email'}
                placeholder={daRestock.productInput}
                value={value}
                hideLabel
                label={"Email address to receive the restock notification"}
                autoCapitalize={'no'}
                autoCorrect={'no'}
                className={'h-7-8 w-full'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange(e)}
                onBlur={this.onBlur}
                willNotCheckValidation
              />
              {showValidatorIcon && <Snippets.Icon name={validated? 'valid': 'invalid'} width={40} height={40}/>}
            </div>
            <Snippets.Button
              title={'Notify me when back in stock'}
              type={'submit'}
              className={'w-full h-5-6 flex items-center justify-between'}
              colour={'primary'}
              disabled={!validated}
            >
              <Snippets.Heading size={'h5'} tag={'p'}>{daRestock.productButton}</Snippets.Heading>
              <Snippets.Icon name={'chevron_right'} width={18} className={'hover:translate-x-50'}/>
            </Snippets.Button>
            {showValidatorIcon && !validated && <Snippets.Heading size={'h5'} tag={'p'} className={'font-regular text-error normal-case mt-1-6'}>Please Input a valid Email Address</Snippets.Heading>}
          </form>
        }
      </div>
    ) : null
  }
}

export namespace ProductBackToStock {
  export interface Props extends GlobalProps {
    className?: string;
    variant: Variant;
  }
  export interface State {
    value: string;
    submitted: boolean;
    validated: boolean;
    showValidatorIcon: boolean;
  }
}
