# Development Container Setup

This directory contains the configuration for using this project with **VS Code Dev Containers** or **GitHub Codespaces**, providing a consistent, portable development environment.

## What is a Dev Container?

A development container (devcontainer) is a Docker container specifically configured for development. It includes:

- **Consistent Environment**: Same Node.js version, dependencies, and tools across all machines
- **No Local Setup**: No need to install Node.js, npm, or other dependencies on your host machine
- **Isolated Development**: Project dependencies don't conflict with other projects
- **Pre-configured Tools**: ESLint, Prettier, TypeScript, and VS Code extensions ready to use

## Prerequisites

Choose one of the following options:

### Option 1: VS Code Dev Containers (Local)

1. **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
2. **Visual Studio Code** - [Download here](https://code.visualstudio.com/)
3. **Dev Containers Extension** - Install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Option 2: GitHub Codespaces (Cloud)

- Just a GitHub account! Codespaces runs entirely in the cloud.

## Getting Started

### Using VS Code Dev Containers (Local)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ismail-kattakath/jsonresume-to-everything.git
   cd jsonresume-to-everything
   ```

2. **Open in VS Code:**

   ```bash
   code .
   ```

3. **Reopen in Container:**
   - VS Code will detect the `.devcontainer` folder and prompt you to reopen in container
   - Click "Reopen in Container"
   - OR press `F1` → Type "Dev Containers: Reopen in Container"

4. **Wait for setup:**
   - Docker builds the container (first time takes 2-5 minutes)
   - Dependencies install automatically via `npm install`
   - Extensions install automatically

5. **Start developing:**
   ```bash
   npm run dev
   ```

   - Dev server starts at `http://localhost:3000`
   - Port 3000 is automatically forwarded to your host machine

### Using GitHub Codespaces (Cloud)

1. **Create a Codespace:**
   - Go to the [repository on GitHub](https://github.com/ismail-kattakath/jsonresume-to-everything)
   - Click the green "Code" button
   - Select "Codespaces" tab
   - Click "Create codespace on main"

2. **Wait for setup:**
   - GitHub builds and configures the environment (2-3 minutes)
   - Dependencies install automatically
   - Opens VS Code in your browser

3. **Start developing:**
   ```bash
   npm run dev
   ```

   - Port 3000 is automatically forwarded and opened in a browser tab

## What's Included

### Base Environment

- **Node.js**: v20 LTS (Long Term Support)
- **npm**: Latest version
- **Git**: Pre-configured with safe directory settings
- **Zsh**: With Oh My Zsh for enhanced terminal experience

### Pre-installed Global Tools

- `typescript` - TypeScript compiler
- `ts-node` - Execute TypeScript directly
- `prettier` - Code formatter
- `eslint` - Linting and code quality

### VS Code Extensions (Auto-installed)

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class autocomplete
- **TypeScript Error Translator** - Better TypeScript errors
- **Code Spell Checker** - Catch typos
- **GitHub Actions** - Workflow syntax highlighting
- **Shell Format** - Format shell scripts

### Pre-configured Settings

- **Format on Save**: Enabled with Prettier
- **ESLint Auto-fix**: Runs on save
- **TypeScript Import Management**: Auto-updates imports
- **Tailwind IntelliSense**: Enhanced for `cva()` and `cx()` patterns

## Container Features

### Port Forwarding

- **Port 3000**: Next.js dev server (auto-forwarded)
- Access at `http://localhost:3000` on your host machine

### Volume Mounts

1. **Workspace**: Project files mounted to `/workspace`
2. **node_modules**: Persisted in Docker volume for faster rebuilds
3. **Git Config**: Your local `.gitconfig` mounted for git authentication

### Git Integration

- Git credentials from host machine are available in container
- Safe directory automatically configured
- GitHub CLI included for PR management

## Common Commands

```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test:coverage

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit
```

## Customization

### Add VS Code Extensions

Edit `.devcontainer/devcontainer.json`:

```json
"customizations": {
  "vscode": {
    "extensions": [
      "your-extension-id"
    ]
  }
}
```

Then rebuild container: `F1` → "Dev Containers: Rebuild Container"

### Add System Dependencies

Edit `.devcontainer/Dockerfile`:

```dockerfile
RUN apt-get update && apt-get -y install --no-install-recommends \
    your-package-name
```

Then rebuild container.

### Add Global npm Packages

Edit `.devcontainer/Dockerfile`:

```dockerfile
RUN npm install -g your-package-name
```

Then rebuild container.

## Troubleshooting

### Container Won't Start

1. **Check Docker is running:**

   ```bash
   docker ps
   ```

2. **Rebuild container:**
   - `F1` → "Dev Containers: Rebuild Container"

3. **Check Docker logs:**
   - `F1` → "Dev Containers: Show Container Log"

### Port 3000 Already in Use

```bash
# Kill process on port 3000 (on host machine)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing

1. **Clear node_modules volume:**

   ```bash
   docker volume rm jsonresume-node-modules
   ```

2. **Rebuild container:**
   - `F1` → "Dev Containers: Rebuild Container"

### Git Authentication Issues

1. **Ensure `.gitconfig` is mounted:**
   - Check `.devcontainer/devcontainer.json` mounts section

2. **Re-authenticate:**
   ```bash
   gh auth login
   ```

## Performance Tips

1. **Use Named Volumes**: `node_modules` is already configured as a named volume for optimal performance

2. **Disable File Watchers** (if experiencing high CPU):

   ```bash
   # Edit package.json dev script
   "dev": "WATCHPACK_POLLING=true next dev"
   ```

3. **Allocate More Resources to Docker**:
   - Docker Desktop → Settings → Resources
   - Increase CPU/Memory allocation

## Benefits Over Local Development

| Aspect           | Local Development                        | Dev Container                 |
| ---------------- | ---------------------------------------- | ----------------------------- |
| **Setup Time**   | 15-30 minutes (install Node, npm, tools) | 2-5 minutes (automatic)       |
| **Consistency**  | Varies by machine                        | Identical across all machines |
| **Conflicts**    | Dependencies may conflict                | Isolated environment          |
| **Onboarding**   | Document all steps                       | "Reopen in Container"         |
| **CI/CD Parity** | May differ from CI environment           | Can match CI exactly          |

## GitHub Codespaces Specifics

### Pricing

- **Free Tier**: 60 hours/month for individual accounts
- **Pro/Team**: 90 hours/month included
- See [GitHub Codespaces pricing](https://github.com/features/codespaces)

### Machine Types

- Default: 2-core, 4GB RAM, 32GB storage
- Can upgrade for larger projects

### Prebuild

This project supports Codespaces prebuilds for faster startup:

1. Repository settings → Codespaces
2. Enable "Prebuild"
3. Codespaces start in ~30 seconds instead of 2-3 minutes

## Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [GitHub Codespaces Documentation](https://docs.github.com/en/codespaces)
- [Dev Container Specification](https://containers.dev/)

## Support

If you encounter issues with the dev container setup, please:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review Docker Desktop logs
3. Open an issue on [GitHub Issues](https://github.com/ismail-kattakath/jsonresume-to-everything/issues)

---

**Happy Coding! 🚀**
