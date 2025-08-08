import { useEffect, useState } from "react"

export const useDebounce = (val: string, time: number) => {
    const [debouncedVal, setDebouncedVal] = useState(val)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedVal(val)
        }, time)
        return () => clearTimeout(handler) 
    }, [val, time])

    return debouncedVal
}
