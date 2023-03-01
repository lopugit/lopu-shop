import * as React from "react";
import * as Helpers from "helpers";
import { ShopifyNext } from '@dotdev/next-components'
import { JSONProduct, LineItem } from "types";
import axios from "axios";
import * as Snippets from "snippets";

async function changeGiftProperty(lineitem: LineItem, opt_out: boolean) {
  ShopifyNext.Cart.updateProperties(lineitem.key, {_gift_opt_out: opt_out? "yes": "no"})
}

export const GiftWithPurchaseDrawer: React.FC<{
  tags: string[];
  quantity: number;
  lineitem: LineItem;
}> = ({ tags, quantity, lineitem}) => {
  const [gift, setGift] = React.useState<JSONProduct>(null);

  const [opt_out, setOptOut] = React.useState<boolean>(false);


  // const [cartGiftOptIn, setCartGiftOptIn] = React.useState<CartGiftOption>(null)
  const buttonHandler = () => {
    changeGiftProperty(lineitem, !opt_out)
    setOptOut(current => !current)
  }


  React.useEffect(() => {
    (async () => {
      const boxPrefix = "x_tag-list-entry:gift:";
      const giftTag = tags.find((tag) => tag.includes(boxPrefix));
      if (!giftTag) return;
      const handle = giftTag.split(boxPrefix)[1];
      const _product = await Helpers.getGiftProduct(handle);
      if (_product) {
        setGift(_product.product);
      }

    console.log("setOptOut", lineitem?.properties?._gift_opt_out)
    setOptOut(lineitem?.properties?._gift_opt_out == "yes"? true: false)
    })();
  }, []);

  

  return gift ? (
    <div className={"flex flex-wrap border-b border-grey-border"}>
      <div className={`pb-2-3 pt-2-4 w-full ${opt_out ? "opacity-30" : ""}`}>
        <div className={"flex w-full"}>
          <div className={"w-1/2 md:w-3/10"}>
            <div
              className={"block no-underline border border-grey-border w-full"}
            >
              <Snippets.Image
                alt={`${gift.title} featured image`}
                src={gift.image.src}
                ratio={"1:1"}
                className={"relative"}
              />
            </div>
          </div>
          <div className={"w-1/2 md:w-7/10 ml-2 flex flex-col relative"}>
            <div className={"w-full"}>
              <div className={"block text-black no-underline text-sm mb-1"}>
                <Snippets.Heading size={"h3"} tag={"p"} className={"mb-1"}>
                  {gift.title}
                </Snippets.Heading>
              </div>
            </div>
            <div className={"w-full"}>
              <div className={"flex flex-wrap md:flex-no-wrap"}>
                <div
                  className={
                    "w-full flex items-center content-between pt-0-6 md:pt-0"
                  }
                >
                  <Snippets.Heading
                    size={"p"}
                    tag={"p"}
                    className={"inline md:text-right"}
                  >
                    {`Complimentary gift with purchase`}
                  </Snippets.Heading>
                </div>
              </div>
            <div className={"flex flex-wrap md:flex-no-wrap"}>
             <span className={"text-sm"}>
                <Snippets.Button
                  title={opt_out ? "opt out" : "opt in"}
                  onClick={buttonHandler}
                  colour={"blank"}
              > 
                  <Snippets.Icon
                    name={opt_out ? "checkbox_no" : "checkbox_yes"}
                    width={18}
                    ariaHidden
                    className={"bg-white text-black border-white inline-block"}
                  />
                </Snippets.Button> {opt_out ? "Add gift" : "Remove gift"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
