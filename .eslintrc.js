module.exports = {
  extends: 'react-app',
  rules: {
    'array-bracket-newline': [
      'error',
      {
        minItems: 22,
        multiline: true
      }
    ],
    'array-callback-return': 0,
    'arrow-spacing': 2,
    'block-spacing': 2,
    'brace-style': 2,
    'capitalized-comments': 2,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'comma-style': 1,
    complexity: 0,
    'consistent-this': 2,
    curly: ['error', 'multi-line'],
    'dot-notation': [
      'error',
      {
        allowPattern: '^[a-z]+(_[a-z]+)+$'
      }
    ],
    eqeqeq: 2,
    'func-call-spacing': 2,
    'generator-star-spacing': 0,
    // "indent": ["warn", 2],
    'jsx-quotes': ['warn', 'prefer-single'],
    'key-spacing': [
      'warn',
      {
        afterColon: true,
        beforeColon: false
      }
    ],
    'keyword-spacing': [
      'warn',
      {
        after: true,
        before: true
      }
    ],
    'lines-around-comment': 0,
    'max-depth': [
      'warn',
      {
        max: 3
      }
    ],
    'max-lines': [
      'warn',
      {
        max: 360
      }
    ],
    'max-nested-callbacks': [
      'warn',
      {
        max: 3
      }
    ],
    'max-params': [
      'warn',
      {
        max: 4
      }
    ],
    'max-statements-per-line': [
      'warn',
      {
        max: 2
      }
    ],
    'max-statements': [
      'warn',
      {
        max: 30
      }
    ],
    'new-cap': 0,
    'newline-per-chained-call': [
      'warn',
      {
        ignoreChainWithDepth: 5
      }
    ],
    'no-alert': 2,
    'no-array-constructor': 2,
    'no-await-in-loop': 2,
    'no-bitwise': 2,
    'no-case-declarations': 2,
    'no-console': 1,
    'no-const-assign': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-extra-label': 2,
    'no-floating-decimal': 2,
    'no-implicit-globals': 2,
    'no-invalid-this': 0,
    'no-lone-blocks': 2,
    'no-lonely-if': 2,
    'no-loop-func': 2,
    'no-magic-numbers': [
      'warn',
      {
        ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 200, 401, 403, 400, 404, 422, 500]
      }
    ],
    'no-mixed-operators': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-multiple-empty-lines': 2,
    'no-nested-ternary': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-param-reassign': 2,
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-proto': 2,
    'no-redeclare': 2,
    'no-return-assign': 2,
    'no-return-await': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-tabs': 2,
    'no-template-curly-in-string': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 0,
    'no-trailing-spaces': [
      'error',
      {
        ignoreComments: false
      }
    ],
    'no-underscore-dangle': 2,
    'no-unneeded-ternary': 2,
    'no-unused-expressions': 2,
    'no-unused-vars': 2,
    'no-use-before-define': 2,
    'no-useless-call': 2,
    'no-useless-concat': 2,
    'no-useless-constructor': 2,
    'no-useless-return': 2,
    'no-var': 2,
    'no-void': 2,
    'no-warning-comments': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    'object-curly-spacing': ['warn', 'always'],
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: 'return'
      },
      {
        blankLine: 'always',
        prev: ['const', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive'
      }
    ],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-destructuring': 2,
    'prefer-promise-reject-errors': 2,
    'quote-props': ['warn', 'as-needed'],
    quotes: 0,
    'react/no-danger-with-children': 0,
    'react/boolean-prop-naming': 2,
    'react/button-has-type': 2,
    'react/default-props-match-prop-types': 2,
    'react/destructuring-assignment': 2,
    'react/no-array-index-key': 2,
    'react/no-children-prop': 2,
    'react/no-deprecated': 2,
    'react/no-did-mount-set-state': 2,
    'react/no-did-update-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/no-find-dom-node': 2,
    'react/no-is-mounted': 2,
    'react/no-redundant-should-component-update': 2,
    'react/no-typos': 2,
    'react/no-string-refs': 2,
    'react/no-unused-prop-types': 2,
    'react/no-unused-state': 2,
    'react/prefer-es6-class': 2,
    'react/prefer-stateless-function': 2,
    'react/prop-types': 2,
    'react/react-in-jsx-scope': 0,
    'react/require-render-return': 2,
    'react/self-closing-comp': 2,
    'react/sort-prop-types': 2,
    'react/jsx-boolean-value': 2,
    'react/jsx-closing-bracket-location': 2,
    'react/jsx-closing-tag-location': 2,
    'react/jsx-curly-spacing': [
      2,
      {
        when: 'never'
      }
    ],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-equals-spacing': 2,
    'react/jsx-indent-props': [2, 2],
    'react/jsx-key': 2,
    'react/jsx-no-comment-textnodes': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-no-target-blank': 2,
    'react/jsx-no-undef': 2,
    'react/jsx-pascal-case': 2,
    'react/jsx-sort-props': 2,
    'react/jsx-wrap-multilines': 2,
    'require-await': 2,
    semi: ['warn', 'never'],
    'space-in-parens': 2,
    yoda: 2
  }
}
