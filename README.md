# FOSSBilling Documentation

This repository contains the official documentation for FOSSBilling, built with [Starlight](https://starlight.astro.build) (Astro).

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
