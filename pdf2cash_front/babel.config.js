module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '9',
        },
        loose: true,
      },
    ],
  ],
}
