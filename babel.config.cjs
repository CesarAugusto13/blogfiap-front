module.exports = {
  presets: [
    // Para compilar JavaScript moderno para uma versão compatível
    ['@babel/preset-env', { targets: { node: 'current' } }],
    // Para compilar JSX e outras funcionalidades do React
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};