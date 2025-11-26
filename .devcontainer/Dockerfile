# Use official Node.js LTS image
FROM node:20-bullseye

# Install additional system dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    zsh \
    curl \
    wget \
    ca-certificates \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set up working directory
WORKDIR /workspace

# Install global npm packages for development
RUN npm install -g \
    npm@latest \
    typescript \
    ts-node \
    prettier \
    eslint

# Configure git to allow safe directory
RUN git config --global --add safe.directory /workspace

# Set NODE_ENV to development
ENV NODE_ENV=development

# Expose port 3000 for Next.js dev server
EXPOSE 3000

# Keep container running
CMD ["sleep", "infinity"]
