// @ts-check
const tseslint = require("typescript-eslint");

module.exports = tseslint.config(
    // Fichiers ignorés (équivalent de .eslintignore)
    {
        ignores: [
            "dist/**",
            "out/**",
            "node_modules/**",
            "*.js",       // fichiers JS à la racine (esbuild.js, eslint.config.js lui-même, etc.)
            "**/*.d.ts",
        ],
    },

    // Config de base recommandée typescript-eslint
    ...tseslint.configs.recommended,

    // Surcharges spécifiques au projet
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
        },
        rules: {
            // --- Règles stylistiques : warn uniquement (non bloquantes au build) ---

            // 45 occurrences auto-fixables via `npm run lint:fix`
            "prefer-const": "warn",

            "@typescript-eslint/naming-convention": [
                "warn",
                {
                    selector: "import",
                    format: ["camelCase", "PascalCase"],
                },
            ],

            // Variables/args inutilisés : préfixer par _ pour les supprimer du rapport
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],

            // any : acceptable en phase de migration, à corriger progressivement
            "@typescript-eslint/no-explicit-any": "warn",

            "@typescript-eslint/no-unused-expressions": "warn",

            curly: "warn",
            eqeqeq: "warn",
            "no-throw-literal": "warn",
            semi: "off",
        },
    }
);