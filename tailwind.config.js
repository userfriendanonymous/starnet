

// let _ = <a className='bg-[#dfdfe1]'/>

const theme = {
    dark: {
        main: '#24232b',
        weak: '#3b3c4b',
        negative: {
            main: 'white',
            weak: '#dfdfe1'
        },
        active: '#47485a',
        fired: '#4c4d63',
        slight: '#2f3039'
    },
    light: {
        primary: '#ffc933',
        danger: '#ff5f5f',
        main: 'white',
        negative: {
            main: '#000000',
            weak: '#828282',
            primary: '#0800ff'
        },
    }
}

export {theme}

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './src/**/*.{js,ts,tsx,jsx}'
    ],
    theme: {
        colors: theme,

        extend: {
        },
    },
    plugins: [
        require('tailwind-scrollbar')({ nocompatible: true })
    ],
}

