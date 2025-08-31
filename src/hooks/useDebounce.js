import React from 'react';


export const useDebounce = (value, delay = 500) => {
    const [debounceValue, setDebounceValue] = React.useState(value);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(timeout);
    }, [value, delay]);
    return debounceValue;
}