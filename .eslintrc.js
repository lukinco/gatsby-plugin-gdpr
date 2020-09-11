const { NODE_ENV } = process.env

module.exports = {
  "extends": [
    "standard",
  ],
  "rules": {
    "comma-dangle": [
      "error",
      {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never"
      }
    ]
  },
  "plugins": NODE_ENV !== 'production' ? ["only-warn"] : []
}