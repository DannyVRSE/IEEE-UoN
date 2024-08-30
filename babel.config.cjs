// eslint-disable-next-line no-undef
module.exports= {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: [
      [
        '@babel/plugin-syntax-import-attributes',
        { deprecatedAssertSyntax: true },
      ],
    ],
  };