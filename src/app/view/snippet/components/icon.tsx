import * as React from 'react'
import * as ReactDomServer from 'react-dom/server'

import account_icon from 'icons/account_icon.svg'
import arrow from 'icons/arrow.svg'
import arrow_left from 'icons/arrow_left.svg'
import arrow_right from 'icons/arrow_right.svg'
import bag from 'icons/bag.svg'
import checkbox_no from 'icons/checkbox_no.svg'
import checkbox_yes from 'icons/checkbox_yes.svg'
import chevron_up from 'icons/chevron_up.svg'
import chevron_down from 'icons/chevron_down.svg'
import chevron_left from 'icons/chevron_left.svg'
import chevron_right from 'icons/chevron_right.svg'
import chevron_right_reverse from 'icons/chevron_right_reverse.svg'
import click_collect from 'icons/click_collect.svg'
import cross from 'icons/cross.svg'
import do_not_bleach from 'icons/do_not_bleach.svg'
import do_not_dry_clean from 'icons/do_not_dry_clean.svg'
import do_not_wash from 'icons/do_not_wash.svg'
import envelope from 'icons/envelope.svg'
import facebook from 'icons/facebook.svg'
import facebook_reverse from 'icons/facebook_reverse.svg'
import filter from 'icons/filter.svg'
import google from 'icons/google.svg'
import hamburger from 'icons/hamburger.svg'
import heart_fill from 'icons/heart_fill.svg'
import heart_unfilling from 'icons/heart_unfilling.svg'
import instagram from 'icons/instagram.svg'
import invalid from 'icons/invalid.svg'
import layout_1_1 from 'icons/layout_1_1.svg'
import layout_2_2 from 'icons/layout_2_2.svg'
import layout_4_2 from 'icons/layout_4_2.svg'
import layout_4_4 from 'icons/layout_4_4.svg'
import location from 'icons/location.svg'
import location_pin from 'icons/location_pin.svg'
import minus from 'icons/minus.svg'
import more_swatches from 'icons/more_swatches.svg'
import play from 'icons/play.svg'
import pause from 'icons/pause.svg'
import plus from 'icons/plus.svg'
import goback from 'icons/goback.svg'

import magnifying_glass from 'icons/magnifying_glass.svg'
import delivery from 'icons/delivery.svg'
import sort from 'icons/sort.svg'
import track from 'icons/track.svg'
import tick from 'icons/tick.svg'
import valid from 'icons/valid.svg'
import trackorder from 'icons/trackorder.svg'
import email from 'icons/email.svg'


import wash from 'icons/wash.svg'
import dry from 'icons/dry.svg'
import bleach from 'icons/bleach.svg'

import afterpay from 'icons/payments/afterpay.svg'
import american_express from 'icons/payments/amex.svg'
import mastercard from 'icons/payments/mastercard.svg'
import paypal from 'icons/payments/paypal.svg'
import union_pay from 'icons/payments/union_pay.svg'
import visa from 'icons/payments/visa.svg'

import logo_man from 'icons/logos/logo_man.svg'
import logo_woman from 'icons/logos/logo_woman.svg'

import checked from 'icons/checked.svg'

import edit from 'icons/edit.svg'

import pinterest from 'icons/pinterest.svg'
import youtube from 'icons/youtube.svg'
import twitter from 'icons/twitter.svg'
import copy from 'icons/copy.svg'

import share from 'icons/share.svg'
import giftcard from 'icons/gift-card.svg'

export class Icon extends React.PureComponent<Icon.Props> {
  public static icons = {
    account_icon,
    arrow,
    arrow_left,
    arrow_right,
    bag,
    checkbox_no,
    checkbox_yes,
    chevron_up,
    chevron_down,
    chevron_left,
    chevron_right,
    chevron_right_reverse,
    click_collect,
    cross,
    do_not_bleach,
    do_not_dry_clean,
    do_not_wash,
    envelope,
    facebook,
    facebook_reverse,
    filter,
    giftcard,
    google,
    goback,
    hamburger,
    heart_fill,
    heart_unfilling,
    instagram,
    invalid,
    layout_1_1,
    layout_2_2,
    layout_4_2,
    layout_4_4,
    location,
    location_pin,
    minus,
    more_swatches,
    play,
    pause,
    plus,
    magnifying_glass,
    delivery,
    sort,
    track,
    tick,
    trackorder,
    bleach,
    dry,
    wash,
    email,
    valid,
    afterpay,
    american_express,
    mastercard,
    paypal,
    union_pay,
    visa,
    logo_man,
    logo_woman,
    checked,
    edit,
    twitter,
    pinterest,
    youtube,
    copy,
    share
  };

  public static toString(props: Icon.Props) {
    const icon = Icon.icons[props.name]

    return ReactDomServer.renderToString(
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox={icon.viewBox} 
        width={props.width} 
        height={props.height} 
        className={props.className}
      >
        <g 
          dangerouslySetInnerHTML={{ __html: icon.render().innerHTML }} 
        />
      </svg>
    )
  }

  public render(): JSX.Element {
    const { name, width, height, className, id, stroke, label="", ariaHidden=false, } = this.props
    const icon: any = Icon.icons[name]
    
    return icon ? (
      <svg viewBox={icon.viewBox} width={width} height={height ? height : width} className={className} role="img" aria-label={label || name} aria-hidden={ariaHidden ? "true" : null}>
        <use xlinkHref={`#${icon.id}`} id={id} strokeWidth={stroke ? stroke : null}  />
      </svg>
    ) : (
      <span />
    )
  }
}

export namespace Icon {
  export type Name = keyof typeof Icon.icons;
  export interface Props {
    name: Icon.Name;
    width: number;
    height?: number;
    className?: string;
    id?: string;
    stroke?: string;
    label?: string;
    ariaHidden?: boolean;
  }
}