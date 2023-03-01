import * as React from 'react'
import * as Snippets from 'snippets'

export const OptionDropdown: React.FC<Props> = ({ option, onChange, selected, optionPrefix }) => {
  const [open, setOpen] = React.useState<boolean>(true)
  return (
    <div>
      <button
        type="button"
        className="w-full text-left flex justify-between items-center outline-none focus:outline-none"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="text-xs font-bold tracking-wide uppercase leading-tight font-sans">
          Choose your eGift Card value
        </span>
      </button>
      <div className={`${open ? 'h-full' : 'h-0'} overflow-hidden mt-1`}>
        <div className={'w-full h-full relative'}>
          <select className='class="bg-white rounded-none border border-black font-normal p-1 w-full appearance-none outline-none' onChange={(e) => onChange(e.target.value, e.target.selectedOptions[0].getAttribute('tabindex'))}>
            {option.values.map((value) => (
              // eslint-disable-next-line react/jsx-key
              <option
                className={'border border-black border-solid inline-block mr-1 mb-1 px-0-3 outline-none focus:outline-none transition'}
                value={value}
                tabIndex={option.position}
                selected={selected === value}
              >
                {optionPrefix || ''}{value}
              </option>
            ))}
          </select>
          <span className={'absolute'} style={{ right: '16px', top: '15px' }}>
            <Snippets.Icon name="chevron_down" width={12} height={18} />
          </span>
        </div>
      </div>
    </div>
  )
}

type Props = {
  selected: string
  option: {
    name: string
    values: Array<string>
    position: number
  }
  optionPrefix: string
  onChange: (item, index) => void
}