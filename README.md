<div align="center">

# 🅿️ Parking Space Management System

A modern parking space management system built with Next.js, NestJS, and PostgreSQL.

</div>

## 🚀 Features

- 🔐 User authentication and authorization
- 🚗 Parking space management
- 📅 Booking system
- 📊 Admin dashboard

## 🛠️ Tech Stack

### Frontend
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="40" height="40" alt="Next.js" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40" alt="TailwindCSS" />
</div>

### Backend
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" width="40" height="40" alt="NestJS" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="40" height="40" alt="TypeScript" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="40" height="40" alt="PostgreSQL" />
</div>

### DevOps & Tools
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="40" height="40" alt="Docker" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg" width="40" height="40" alt="ESLint" />
  <img src="https://raw.githubusercontent.com/prettier/prettier-logo/master/images/prettier-icon-dark.svg" width="40" height="40" alt="Prettier" />
</div>

## 📁 Project Structure

The project follows a monorepo structure:

- `apps/`
  - `api/`: NestJS backend application
  - `web/`: Next.js frontend application
- `libs/`: Shared libraries and utilities

## ⚙️ Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL
- pnpm (for package management)

## 🚀 Getting Started

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/SantoshPayasi/parking-space.git
   cd parking-space
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Set up environment variables:
   Create \`.env\` files in both \`apps/api\` and \`apps/web\` directories with the necessary environment variables.

4. Start the development servers:
   \`\`\`bash
   # Start all services
   pnpm dev

   # Start specific service
   pnpm dev:api    # Backend only
   pnpm dev:web    # Frontend only
   \`\`\`

## 💻 Development

- The project uses ESLint for linting and Prettier for code formatting.
- Husky is set up for pre-commit hooks to ensure code quality.

## 🚀 Deployment

The project is containerized using Docker for consistent development and deployment environments.

\`\`\`bash
# Build and run all services
docker-compose up --build
\`\`\`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Santosh Payasi

---

<div align="center">

For more information or support, please open an issue in the repository.

</div>

