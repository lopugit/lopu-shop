import * as React from "react";

const valueMap = {
  Digital: "eGift Card",
  Physical: "Gift Card"
}
export const OptionToggle: React.FC<Props> = ({ option, onChange, selected }) => {
  return (
    <div>
      <span className="text-xs font-bold tracking-wide uppercase leading-tight font-sans block">
        Choose your eGift Card type
      </span>
      <div className={`${open ? "h-full" : "h-0"} overflow-hidden mt-1 flex`}>
        {option.values.map((value) => (
          <button
            className={`flex-1 border border-black border-solid inline-block mb-1 p-1 outline-none focus:outline-none transition ${selected === value ? "text-white bg-black" : "hover:text-white hover:bg-black"}`}
            type="button"
            onClick={() => {
              onChange(value, option.position)
            }}
          >
            {valueMap[value] ? valueMap[value] : value}
          </button>
        ))}
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
  onChange: (item, index: number) => void
}