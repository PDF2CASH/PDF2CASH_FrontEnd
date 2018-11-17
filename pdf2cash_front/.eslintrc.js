module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "sourceType": "module"
    },
    "parser": "babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "space-in-parens": [0, "always"],
        "template-curly-spacing": [2, "always"],
        "array-bracket-spacing": [2, "always"],
        "object-curly-spacing": [2, "always"],
        "computed-property-spacing": [2, "always"],
        "no-multiple-empty-lines": [2, {
            "max": 1,
            "maxEOF": 0,
            "maxBOF": 0
        }],
        "quotes": [1, "single", "avoid-escape"],
        "no-use-before-define": [2, {
            "functions": false
        }],
        "semi": [0, "never"],
        "prefer-const": 1,
        "react/prefer-es6-class": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-curly-spacing": [2, "always"],
        "react/jsx-indent": [2, 4],
        "react/prop-types": [1,
            { "ignore": ["classes",
            "children",
            "handleChangeName",
            "handleChangeUsername",
            "handleChangeCPF",
            "handleChangeEmail",
            "handleChangePassword",
            "validateLogin"] }
        ],
        "react/forbid-prop-types": [1,
            { "forbid": ['any', 'array'] }
        ],
        "react/no-array-index-key": [1],
        "class-methods-use-this": [1],
        "no-duplicate-imports": [1],
        "no-undef": [1],
        "no-case-declarations": [1],
        "no-return-assign": [1],
        "no-param-reassign": [1],
        "no-shadow": [1],
        "no-useless-escape": [0],
        "camelcase": [1],
        "no-underscore-dangle": [0, "always"],
    }
};
