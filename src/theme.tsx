import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Theme {
    dark: {
        background: string,
        active: string
    },
    light: {
        primary: string,
        background: string,
        active: string,
    }
}

let dark = {
    background: '#3b3c4b',
    active: '#3b3c4b',
}

let _ = <a className='bg-[#009dff]'/>

let themes: {[key: string]: Theme} = {
    aqua: {
        dark,
        light: {
            primary: '#009dff',
            background: 'white',
            active: '#eaeaea'
        }
    }
}

interface State {
    value: Theme,
    set(value: Theme): void
}

const useTheme = create(immer<State>(set => ({
    value: themes.aqua,
    set(value) {
        set(s => {
            s.value = value
        })
    }
})))

export default useTheme