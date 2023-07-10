module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  plugins: ['simple-import-sort'],
  rules: {
    semi: 0, // 结尾是否有分号
    indent: ['error', 2], // 统一缩进
    // camelcase: [
    //   'error',
    //   {
    //     allow: ['^UNSAFE_'],
    //   },
    // ], // 强制使用骆驼拼写法命名约定
    'init-declarations': ['error', 'always'], // 强制变量初始化值
    'no-use-before-define': 2, // 禁止定义前使用
    eqeqeq: 2, // 使用全等
    'no-unused-vars': 0, // 禁止出现未使用过的变量
    'consistent-return': 2, // 要求使用一致的 return 语句
    'max-len': ['error', { code: 120 }], // 强制行的最大长度
    'array-callback-return': 2, // 强制数组方法的回调函数中有 return 语句
    'comma-dangle': [
      'error',
      {
        // 要求或禁止使用拖尾逗号
        arrays: 'always-multiline', // 不同的行时，要求使用拖尾逗号；当在同一行时，禁止使用拖尾逗号
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'no-var': 2, // 使用let和const
    'prefer-const': 2, // 不会变的变量使用const
    quotes: ['error', 'single'], // 强制使用一致的反勾号、双引号或单引号
    'jsx-quotes': 0, // 强制在 JSX 属性中使用一致的单引号或双引号
    'no-duplicate-imports': 2, // 禁止重复导入
    'spaced-comment': 2, // 要求或禁止在注释前有空白 (space 或 tab)
    'space-infix-ops': ['error', { int32Hint: false }], // 要求中缀操作符周围有空格
    'space-unary-ops': 2, // 禁止出现多个空格
    'space-in-parens': 2, // 禁止或强制圆括号内的空格
    // 禁止函数圆括号之前有一个空格
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'no-multi-spaces': 2, // 禁止出现多个空格
    'no-alert': 1, // 禁用 alert, confirm, prompt
    'no-else-return': 2, // 禁止在 else 前有 return
    'no-lone-blocks': 2, // 禁用不必要的嵌套块
    'no-extra-label': 2, // 禁用不必要的标签
    radix: 0, // parseInt要求必须有基数
    'max-lines-per-function': 0, // 强制函数最大行数，最长为50行
    'no-new-wrappers': 2, // 禁止原始包装实例, 如new string
    'prefer-rest-params': 2, // 建议使用剩余参数代替 arguments
    'arrow-spacing': 2, // 要求箭头函数的箭头之前或之后有空格
    'arrow-parens': 2, // 要求箭头函数的参数使用圆括号

    'react/display-name': 0, // 组件定义时需要定义组件名称
    'react/prop-types': 0, // 防止在react组件定义中缺少props验证
    'react/no-children-prop': 0, // 禁止使用props传递children
    'react-hooks/rules-of-hooks': 'error', // react-hooks规则
    'react-hooks/exhaustive-deps': 'warn', // react-hooks依赖缺失报错
    'react/jsx-no-target-blank': 0, // a标签的target不带rel="noreferrer"潜在风险,
    'simple-import-sort/imports': 'error', // import排序 npm包需在引入最顶部排序规则
    complexity: ['error', 12], // 代码圈复杂度
    '@typescript-eslint/no-var-requires': 'warn',
  },
  overrides: [
    {
      // 关闭 tsx 文件中的 indent 的默认检查
      files: ['*.tsx', '*.ts'],
      rules: {
        indent: 0,
      },
    },
  ],
};
