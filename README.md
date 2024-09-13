# Flash Card
Flash Card es una app web, construida con React, Typescript y Vite, que utiliza Las tarjetas de aprendizaje, también conocidas como tarjetas educativas, tarjetas de estudio, tarjetas falsas, tarjetas de memorización o tarjetas mnemotécnicas, las cuales contienen palabras, imágenes, símbolos o números en uno o ambos lados y se usan para adquirir conocimientos al memorizar su contenido mediante el repaso espaciado del conjunto de tarjetas (o Deck).

En un lado de cada tarjeta se escribe una pregunta y en el otro la respuesta. Las tarjetas mnemotécnicas pueden ser de vocabulario, datos históricos, química, matemáticas, literatura o cualquier materia que pueda ser aprendida por medio de preguntas y respuestas. Las tarjetas de aprendizaje se usan ampliamente como un ejercicio de aprendizaje para ayudar a la memorización por medio de la repetición espaciada, muy efectiva para los estudiantes de educación básica, media y superior.

Las tarjetas de estudio estimulan la memoria activa relacionando una pregunta que se nos hace con una respuesta correcta proporcionada por la tarjeta y espaciando cada vez más la misma tarjeta al responder correctamente, ya que se va fijando en la memoria.

Las tarjetas de papel suelen emplearse por las dos caras: en un lado la pregunta y en otro la respuesta. Por otra parte, en materias como el aprendizaje de vocabulario de otro idioma puede usarse en un doble sentido. Por ejemplo: español-inglés e inglés-español, según el lado por el que se haga las preguntas.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
