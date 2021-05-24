const twcss = require('tailwindcss');
const atprfxr = require('autoprefixer');

module.exports = {
    style: {
        postcss: {
            plugins: [twcss, atprfxr],
        },
    },
};
