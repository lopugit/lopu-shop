import * as React from 'react'
import * as Snippets from 'snippets'

export const ProductTabs: React.FC<IProps> = ({ data }) => {
  const [selectedTab, setSelectedTab] = React.useState<string>(data[0].handle)
  return (
    <div>
      <div className={'w-full block overflow-hidden'}>
        <div className={'w-full flex'}>
          <div className={'w-full flex flex-nowrap overflow-y-hidden overflow-x-auto hide-scrollbar'}>
            {data.map((item: any, index: number) => (
              <button
                key={index}
                className={`w-auto font-bold text-left px-1-6 first:pl-0 last:pr-0 py-2 ${
                  selectedTab === item.handle ? '' : 'opacity-30'
                }`}
                title={item.handle}
                onClick={() => {
                  setSelectedTab((prev) => prev === data[index].handle ? null : data[index].handle)
                }}
              >
                <Snippets.Heading size={'h5'} tag={'p'} className={'whitespace-no-wrap'}>
                  {item.handle}
                </Snippets.Heading>
              </button>
            ))}
          </div>
        </div>
        <div className={'w-full pt-4-8 md:pt-3-2'}>
          {data.map((item: {
              handle: string;
              content: string | JSX.Element;
            }) => {
            return item.handle === selectedTab ? (
              <div key={item.handle}>
                {item.content}
              </div>
            ) : null
          })}
        </div>
      </div>
    </div>
  )
}

interface IProps {
  data: {
    handle: string;
    content: string | JSX.Element;
  }[];
}