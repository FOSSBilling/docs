# FOSSBilling Documentation

This repository contains the official documentation for FOSSBilling, built with [Starlight](https://starlight.astro.build) (Astro).

## Licensing

Unless otherwise noted below, code, configuration, and build tooling in this repository are licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](./LICENSE).

Documentation content is licensed under Creative Commons Attribution-ShareAlike 4.0 International. See [LICENSE-docs](./LICENSE-docs).

Unless otherwise noted, the documentation license applies to:

- `src/content/docs/**`
- `src/assets/**`
- `public/img/docs/**`
- `public/img/guides/**`

Logos, wordmarks, trademarks, and other brand assets are not licensed under CC BY-SA 4.0. Third-party marks remain subject to their respective owners' rights, including assets under `public/img/logos/**`.

## Development

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:4321`.

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the build locally before deploying   |

## Structure

```
src/
├── content/
│   └── docs/          # Documentation pages (MDX/Markdown)
└── assets/            # Static assets
public/
└── img/               # Images referenced in documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Links

- [FOSSBilling GitHub](https://github.com/FOSSBilling/FOSSBilling)
- [Starlight Documentation](https://starlight.astro.build)
- [Astro Documentation](https://docs.astro.build)
