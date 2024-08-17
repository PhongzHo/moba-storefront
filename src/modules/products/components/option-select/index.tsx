import { ProductOption } from "@medusajs/medusa"
import { clx } from "@medusajs/ui"
import React from "react"

import { onlyUnique } from "@lib/util/only-unique"

type OptionSelectProps = {
    option: ProductOption
    current: string
    updateOption: (option: Record<string, string>) => void
    title: string
    disabled: boolean
    "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
    option,
    current,
    updateOption,
    title,
    "data-testid": dataTestId,
    disabled,
}) => {
    const filteredOptions = option.values.map((v) => v.value).filter(onlyUnique)

    return (
        <div className="flex flex-col gap-y-3">
            <span className="text-sm">Select {title}</span>
            <div
                className="flex flex-wrap justify-between gap-2"
                data-testid={dataTestId}
            >
                {filteredOptions.map((v) => {
                    return (
                        <button
                            onClick={() => updateOption({ [option.id]: v })}
                            key={v}
                            className={clx(
                                "text-small-regular h-10 flex-1 rounded-rounded border border-ui-border-base bg-ui-bg-subtle p-2",
                                {
                                    "border-ui-border-interactive":
                                        v === current,
                                    "transition-shadow duration-150 ease-in-out hover:shadow-elevation-card-rest":
                                        v !== current,
                                }
                            )}
                            disabled={disabled}
                            data-testid="option-button"
                        >
                            {v}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default OptionSelect
