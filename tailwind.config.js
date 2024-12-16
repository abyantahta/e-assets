import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                inter: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                'greenTheme' : '#32A37F',
                'redTheme' : '#ED6359',
                'blackTheme' : '#4B4C4B',
            },
            keyframes:{
                loginRed : {
                    '0%': { transform: 'translateX(0px)' },
                    '25%': { transform: 'translateX(-350px) translateY(20px)' },
                    '50%': { transform: 'translateX(-380px) translateY(-400px)' },
                    '75%': { transform: 'translateX(10px) translateY(-400px)' },
                    '100%': { transform: 'translateX(0) translateY(0)' },
                    // '50%': { transform: 'translateY(100%)' },
                    // '25%': { transform: 'translateX(100%)' },
                    // '50%': { transform: 'translateY(100%)' },
                },
                loginGreen : {
                    '0%': { transform: 'translateX(0px)' },
                    '25%': { transform: 'translateX(350px) translateY(-20px)' },
                    '50%': { transform: 'translateX(380px) translateY(400px)' },
                    '75%': { transform: 'translateX(-10px) translateY(400px)' },
                    '100%': { transform: 'translateX(0) translateY(0)' },
                    // '50%': { transform: 'translateY(100%)' },
                    // '25%': { transform: 'translateX(100%)' },
                    // '50%': { transform: 'translateY(100%)' },
                },
            },
            animation:{
                loginRed : 'loginRed 150s ease-in-out infinite',
                loginGreen : 'loginGreen 150s ease-in-out infinite'
            }
        },
    },

    plugins: [forms],
};
