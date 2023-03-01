import { ShopifyNext } from '@dotdev/next-components';
import * as React from 'react'
import * as Snippets from 'snippets'
export class CheckBalanceField extends React.Component<
  CheckBalanceField.Props,
  CheckBalanceField.State
> {

  public static contextType = ShopifyNext.Context;
  
  public constructor(props: CheckBalanceField.Props) {
    super(props)
    this.state = {
      code: '',
      showBalance: false,
      currentBalance: null,
      error: null,
      loading: false
    }
  }
  public render(): JSX.Element {  
    const handleCodeChange = (e) => {
      this.setState({
        code: e.target.value
      })
    }
    const handleError = (response) => {      
      this.setState({
        error: response.status === 404 ? 'Giftcard not found' : 'There has been an error',
        currentBalance: null
      })
    }
    const handleSubmit = async (e) => {
      e.preventDefault()
      this.setState({
        loading: true,
      })
      const { code } = this.state
      // TODO: make the shop dynamical
      const response = await (fetch(
        `https://application.rise-ai.com/v1/gift-cards/?shop_url=lopu-shop.myshopify.com&code=${code}&from_check_balance=true`
      ).catch(handleError))

      // eslint-disable-next-line no-console
      if(response && response.ok) {
        const data = await response.json()        
        // eslint-disable-next-line no-console
        this.setState({
          currentBalance: data.balance,
          error: null
        })
      } else {
        handleError(response)
      } 

      this.setState({
        loading: false
      })
    }

    return !this.state.showBalance ? (
      <div>
        <form action="" onSubmit={handleSubmit}>          
          {this.state.currentBalance ? (
            <div>Your current balance is <Snippets.Money multiCurrencyTransform={true} price={this.state.currentBalance * 100}/></div>
          ) : (
            <>
              <div className="mt-1">
                <Snippets.Input
                  name="gift-card-code"
                  id="gift-card-code"                
                  type="text"
                  hideLabel
                  onChange={handleCodeChange}
                  className={'mb-1-6 border border-grey-border'}
                  placeholder="Gift Card Code"
                  required
                />
              </div>

             

              <Snippets.Button
                type="submit"
                name="Check balance"
                title="Check balance"
                disabled={this.state.loading}
                colour={'primary'}
                className={'mx-0-3 font-bold text-xs uppercase tracking-wider py-1-6 w-full'}
              >
                {this.state.loading ? 'Loading...' : 'Check balance'}
              </Snippets.Button>

              {this.state.error ? (
                <div className={'text-center font-medium text-red italic leading-normal mt-0-6'}>
                  <p className={'mb-0-4'}>
                    {this.state.error}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </form>
      </div>
    ) : (
      <div>Lol</div>
    )
  }
}

export namespace CheckBalanceField {
  export interface Props {}
  export interface State {
    code: string;
    showBalance: boolean;
    currentBalance: null | number;
    error: null | string;
    loading: boolean
  }
  export interface riseResponse {
    balance: number;
    code: string;
  }
}
