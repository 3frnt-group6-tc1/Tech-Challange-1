module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    // Encontrar a regra de CSS existente
    const cssRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    // Se encontrou a regra, atualize-a para incluir o processamento do Tailwind
    if (cssRule) {
      // Certifique-se de que a regra use os loaders corretos para processar o Tailwind
      if (cssRule.use) {
        const postCssLoader = cssRule.use.find(
          (loader) => loader.loader && loader.loader.includes('postcss-loader')
        );
        
        if (!postCssLoader) {
          // Se não houver um postcss-loader, adicione-o
          cssRule.use.push({
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          });
        }
      }
    }

    return config;
  }
};
