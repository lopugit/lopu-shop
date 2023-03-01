import * as React from 'react'
import * as Snippets from 'snippets'
import * as Helpers from 'helpers'

const getAllCareDetails = (section) => {
  const allCareDetails = []
  const { product } = section
  const { blocks } = product
  blocks && blocks.filter(block => {
    return block.type === 'care' ? allCareDetails.push(block.settings) : null
  })
  return allCareDetails
}

const getCareInstructions = (product) => {
  const re = /<ul>(<li>.*<\/li>)<\/ul>/
  const list = typeof product?.metafields?.ap21?.care === 'string' ? product.metafields.ap21.care.match(re) : []
  const instructions = list && list[1] ? list[1].replace(/<li>/mg, '').replace(/<\/li>/mg, ',').slice(0, -1).split(',') : []
  return instructions
}

const getCareDetails = (section, product) => {
  const allCareDetails = getAllCareDetails(section)
  const careInstructionsList = getCareInstructions(product)
  const instructionsObjs = []
  careInstructionsList.map(instruction => {
    allCareDetails.filter(careDetail => careDetail.handle === instruction ? instructionsObjs.push(careDetail) : null)
  })
  return instructionsObjs
}

export const ProductContent: React.FC<IProps> = ({
  product,
  section,
  shippingOptions
}) => {
  const fields = product?.metafields?.dtk ? product?.metafields?.dtk?.fields : null
  const featureImage = fields?.groups?.feature?.image
  const featureVideo = fields?.groups?.feature?.video
  const isFeaturedContent = Boolean((featureImage || featureVideo))
  const shippingMap = {}
  const shippingDays = fields?.sections?.filter(({ _name }) => _name === 'shipday').map(({ method }) => method)[0]
  shippingDays?.forEach(({ name, days }) => shippingMap[name] = days)
  return (
    <section>
      <hr className={`${isFeaturedContent ? 'w-full lg:w-1/2' : ''} border-grey-border`} />
      <div className={'flex lg:flex-row flex-col max-w-container mx-auto'}>
        <div className={`${isFeaturedContent ? 'lg:w-1/2' : ''} w-full px-1-6 md:px-4-8 lg:px-0 flex justify-center`}>
          <div className={'w-full sm:pl-2-4 lg:pl-2-8 xl:pl-12 2xl:pl-22'}>
            <Snippets.ProductTabs
              data={[
                {
                  handle: 'Size & fit',
                  content: (
                    <div className={'w-full'}>
                      <div className={'flex'}>
                        {this?.props?.data?.product?.metafields?.ap21?.size_length ?
                          <div className={'w-1/2 lg:w-1/3'}>
                            <Snippets.Heading tag={'h4'} size={'none'} className={'text-base font-mono leading-tight font-regular mb-1-6'}>
                              Size
                            </Snippets.Heading>
                            <Snippets.RichText className={'text-3xl mb-2-4 font-regular font-mono'}>
                              {product.metafields.ap21.size_length}
                            </Snippets.RichText>
                          </div> : null
                        }

                        {product.tags ? product.tags.map((tag: string) => {
                          if (tag.includes('brim:')) {
                            const tagSplit = tag.split(':')
                            return (
                              <div key={tag} className={'w-1/2 lg:w-1/3'}>
                                <Snippets.Heading tag={'h4'} size={'h4'} className={'mb-1-6'}>
                                  Brim
                                </Snippets.Heading>
                                <Snippets.Heading tag={'h2'} size={'h2'} className={'text-3xl mb-2-4 font-regular'}>
                                  {tagSplit[1]}
                                </Snippets.Heading>
                              </div>
                            )
                          }
                        }) : null}

                      </div>
                      {typeof product?.metafields?.ap21?.size_and_fit === 'string' ?
                        <div>
                          <Snippets.RichText className={'leading-close w-full lg:w-2/3'}>
                            {product.metafields.ap21.size_and_fit}
                          </Snippets.RichText>
                          <Snippets.Button
                            href={section?.product?.settings?.buttonurl}
                            className={'mt-2-9 font-bold text-xs uppercase tracking-wider lg:mb-12 mb-6-4 py-1'}
                            colour={'secondary'}
                            title={'find your fit'}
                            thin={true}
                          >
                            {section?.product?.settings?.buttontext}
                          </Snippets.Button>
                        </div>
                        : null}
                    </div>
                  )
                },
                {
                  handle: 'material & care',
                  content: (
                    <div className={'w-full flex flex-col'}>
                      {typeof product?.metafields?.ap21?.care === 'string' ? (
                        <Snippets.RichText className={'leading-close w-full lg:w-2/3'}>
                          {product.metafields.ap21.care.replace(/<ul>(<li>.*<\/li>)<\/ul>/, '')}
                        </Snippets.RichText>
                      ) : null}
                      <div className={'richtext lg:mb-6'}>
                        <ul className={'mt-0-8'}>
                          {getCareDetails(section, product).map(detail => (
                            <li key={detail.handle} className={'flex flex-row items-center'}>
                              {detail.title}
                            </li>
                          ))}
                        </ul>
                        <Snippets.Button
                          href={section?.product?.settings?.buttonurlmaterial}
                          className={'mt-2-9 font-bold text-xs uppercase tracking-wider lg:mb-12 mb-6-4 py-1'}
                          colour={'secondary'}
                          title={'learn more'}
                          thin={true}
                        >
                          {section?.product?.settings?.buttontextmaterial}
                        </Snippets.Button>
                      </div>
                    </div>
                  )
                },
                {
                  handle: 'Delivery & Returns',
                  content: (
                    <div className={'w-full lg:w-5/6'}>
                      {section?.product?.settings?.shippingpromotion ? (
                        <div className={'bg-grey p-3-2 mb-4-4'}>
                          {section?.product?.settings?.shippingpromotiontitle ?
                            <Snippets.Heading
                              className={'tracking-wide mb-0-8'}
                              tag={'h5'}
                            >
                              {section.product.settings.shippingpromotiontitle}
                            </Snippets.Heading>
                            : null
                          }
                          <Snippets.RichText>
                            {section.product.settings.shippingpromotion}
                          </Snippets.RichText>
                        </div>
                      ) : null
                      }
                      {shippingOptions.length > 0 ? (
                        <Snippets.Icon
                          name={'delivery'}
                          width={20}
                          height={20}
                          className={'mb-3'}
                        />
                      ) : null
                      }
                      {shippingOptions.length > 0 ?
                        shippingOptions.map(({ settings }: any, i: number) => (
                          <div key={i} className={'mb-3-2'}>
                            <div className={'flex w-full mb-1-6'}>
                              <Snippets.Heading
                                className={'tracking-wider flex-grow'}
                                tag={'h3'}
                              >
                                {settings.title}
                              </Snippets.Heading>
                              <Snippets.Heading
                                className={'tracking-wider'}
                                tag={'h3'}
                              >
                                {(Number(settings.amount).toString() === 'NaN' || Number(settings.amount) === 0) ? <div>{settings.amount}</div> : <Snippets.Money price={settings.amount * 100} />}
                              </Snippets.Heading>
                            </div>
                            {settings.content ?
                              <Snippets.RichText>
                                {settings.content.replace('{days}', shippingMap[settings.title] || settings.days)}
                              </Snippets.RichText>
                              : null
                            }
                          </div>)
                        ) : []
                      }
                    </div>
                  )
                }
              ]}
            />
          </div>
        </div>
        {isFeaturedContent ? (
          <div className={'w-full lg:w-1/2'}>
            {Boolean(featureVideo) ?
              <Snippets.ProductVideo video={featureVideo} />
              :
              <div className="w-full relative">
                <img src={featureImage} className={'w-full'} alt={Helpers.getAltText(product.tags, product.title)} />
              </div>}
          </div>) : null}
      </div>
    </section>
  )
}
interface IProps {
  section: any;
  product: any;
  shippingOptions: {
    settings: {
      title: string;
      amount: string;
      content: string;
      days: string;
    }
  }[];
}
