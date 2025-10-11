# Seedpanel - Secure Crypto Vault Interface

A Next.js application for secure cryptocurrency seed phrase management, styled with Coinbase branding.

## Features

- 🔐 Secure seed phrase display with reveal/hide functionality
- 🌓 Dark/Light theme toggle
- 🎨 Modern UI with Coinbase design system
- 💬 Chatwoot live chat support integration
- 🐳 Docker support for easy deployment
- ⚙️ Environment-based configuration

## Environment Configuration

This application uses environment variables for configuration. You need to set up your seed phrase and case number before running.

### Setup Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and configure your settings:
```env
# Your 12-word seed phrase (comma or space separated)
NEXT_PUBLIC_SEED_PHRASE=word1,word2,word3,word4,word5,word6,word7,word8,word9,word10,word11,word12

# Case number for authentication
NEXT_PUBLIC_CASE_NUMBER=CASE-2024-001

# Chatwoot Live Chat (Optional)
NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN=your-website-token
NEXT_PUBLIC_CHATWOOT_BASE_URL=https://app.chatwoot.com
```

**Important:** The seed phrase must be exactly 12 words.

### Chatwoot Live Chat Setup (Optional)

To enable live chat support:

1. **Sign up for Chatwoot**:
   - Cloud: Visit [app.chatwoot.com](https://app.chatwoot.com) (free tier available)
   - Self-hosted: Deploy your own instance ([docs](https://www.chatwoot.com/docs/self-hosted))

2. **Create a Website Inbox**:
   - Go to Settings → Inboxes → Add Inbox
   - Select "Website"
   - Configure:
     - Name: "Seedpanel Support"
     - Domain: your domain
     - Widget color: Match your theme (#0052FF or #00D4AA)
     - Welcome message: "Need help with your vault?"

3. **Get Your Credentials**:
   - Go to Settings → Inboxes → Your Inbox → Configuration
   - Copy the `websiteToken` from the code snippet
   - Note your base URL (e.g., `https://app.chatwoot.com`)

4. **Add to Environment**:
   - Update `NEXT_PUBLIC_CHATWOOT_WEBSITE_TOKEN` in `.env.local`
   - Update `NEXT_PUBLIC_CHATWOOT_BASE_URL` if self-hosting

5. **Deploy**:
   - The chat widget will appear bottom-right on all pages
   - If tokens are missing, widget won't load (check console for warnings)

## Local Development

### Prerequisites
- Node.js 20 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Docker Deployment

### Using Docker Compose (Recommended)

1. Configure environment variables in `.env.local`

2. Build and run with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application at [http://localhost:3000](http://localhost:3000)

4. Stop the application:
```bash
docker-compose down
```

### Using Docker Directly

1. Build the Docker image:
```bash
docker build -t seedpanel .
```

2. Run the container:
```bash
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_SEED_PHRASE="word1,word2,word3,word4,word5,word6,word7,word8,word9,word10,word11,word12" \
  -e NEXT_PUBLIC_CASE_NUMBER="CASE-2024-001" \
  --name seedpanel-app \
  seedpanel
```

3. Stop the container:
```bash
docker stop seedpanel-app
docker rm seedpanel-app
```

## Production Build

To create a production build locally:

```bash
npm run build
npm start
```

## Project Structure

```
seedpanel/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles
├── components/            # React components
├── public/                # Static assets
│   ├── Coinbase_Wordmark.svg
│   ├── Coinbase_Wordmark_White.svg
│   └── favicon.svg
├── case-number-form.tsx   # Case number authentication
├── hero-section.tsx       # Landing page
├── seed-phrase-page.tsx   # Seed phrase display
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── .env.example           # Environment template
└── .env.local            # Local environment (gitignored)
```

## Security Notes

⚠️ **Important Security Considerations:**

- Never commit `.env.local` or `.env` files to version control
- Never share your seed phrase with anyone
- Store seed phrases offline in a secure location
- This application is for demonstration purposes - use appropriate security measures for production

## Technology Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Inter, Geist
- **Containerization:** Docker

## License

This project is for educational and demonstration purposes.
