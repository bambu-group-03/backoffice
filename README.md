# BACKOFFICE 

### Requirements

- Node.js 18+ and npm

## How to use

- Run `cd next-app`, then run `npm install` to generate a lockfile.

## Config 

```bash
# in case that you don't create the network yet
docker network create microservices

cp deploy/.env_template deploy/.env
```
## Development

First, run the development server:

```bash
# install development dependencies for visual studio code
cd next-app
npm i
cd ..

docker compose -f deploy/docker-compose.dev.yml up --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Useful commands

```bash
# Stop all running containers
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

# Free space
docker system prune -af --volumes
```

### Project structure

```shell
.
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── app                         # Next JS Pages (app router)
│   ├── components                  # React components
│   ├── layouts                     # Layouts components
│   ├── libs                        # 3rd party libraries
│   ├── pages                       # Next JS Pages (page router)
│   ├── styles                      # Styles folder
│   ├── templates                   # Default template
│   ├── validations                 # Validation schemas
│   └── utils                       # Utility functions
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Commit Message Format

The project enforces [Conventional Commits](https://www.conventionalcommits.org/) specification. This means that all
your commit messages must be formatted according to the specification. To help you write commit messages, the project
uses [Commitizen](https://github.com/commitizen/cz-cli), an interactive CLI that guides you through the commit process.
To use it, run the following command:

```shell
npm run commit
```

One of the benefits of using Conventional Commits is that it allows us to automatically generate a `CHANGELOG` file. It
also allows us to automatically determine the next version number based on the types of commits that are included in a
release.

## Production

Multistage builds are highly recommended in production. Combined with the
Next [Output Standalone](https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files)
feature, only `node_modules` files required for production are copied into the final Docker image.
