# TTS WebUI Extension Catalog

A comprehensive marketplace and installation catalog for extensions to the [TTS WebUI](https://github.com/rsxdalv/tts-webui).

[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## What is this?

The TTS Extension Catalog is a modern web application that provides a searchable, categorized marketplace for extensions to enhance your TTS Generation WebUI experience. It serves as both a discovery platform and installation guide, featuring over 50+ extensions for text-to-speech, voice conversion, audio processing, and music generation.

### Key Features

- **🔍 Smart Search**: Find extensions by name, description, author, or category
- **🏷️ Categorized Organization**: Extensions organized by functionality (TTS models, voice conversion, audio tools, music generation, etc.)
- **⭐ Recommended Extensions**: Highlighted extensions vetted by the community
- **📊 Installation Ready**: One-click JSON configuration copy for easy WebUI installation
- **🔗 Direct Links**: Quick access to extension repositories and documentation
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Modern UI**: Built with Radix UI components and Tailwind CSS

## Available Extension Categories

### 🗣️ Text-to-Speech (TTS)
Premium TTS models including:
- **Vall-E-X** - Multilingual neural TTS (English, Chinese, Japanese)
- **StyleTTS2** - Controllable style and high-quality speech synthesis
- **MMS** - Support for 1000+ languages
- **Tortoise TTS** - Voice cloning and high-quality speech synthesis
- **Kokoro** - Fast, small, but high-quality TTS models

### 🎵 Audio & Music Generation
- **Audiocraft** - MusicGen and MAGNeT for music and audio generation
- **Stable Audio** - Text-to-audio for music and sound effects
- **ACE-Step** - Music generation foundation model

### 🔄 Voice Conversion & Processing
- **RVC** - Retrieval-based voice conversion
- **Demucs** - Music source separation
- **Vocos** - Neural audio codec for compression/reconstruction

### 🛠️ Tools & Utilities
- **Whisper** - Speech-to-text transcription
- **OpenAI TTS API** - OpenAI-compatible TTS API server
- **Model Downloader** - Download models from Hugging Face Hub
- **GPU Info Display** - Monitor GPU resources and CUDA information

### ⚙️ System Management
- **Extension Lists** - Manage and monitor installed extensions
- **Huggingface Cache Manager** - Manage model cache and disk space
- **External Extensions Installer** - Install extensions without restart

## Getting Started

### For Users

1. **Visit the Catalog**: Browse [https://tts-extension-catalog.vercel.app](https://tts-extension-catalog.vercel.app)
2. **Find Extensions**: Search or browse by category to find what you need
3. **Installation**: Each extension page provides JSON configuration for WebUI installation
4. **Copy & Install**: Use the provided JSON data in your TTS WebUI's external extensions installer

### For Extension Developers

Want to add your extension to the catalog?

1. **Submit Extension Data**: Create a pull request with your extension's metadata
2. **Required Fields**: Package name, name, requirements, description, author information
3. **Optional**: Repository links, license info, recommended status

See the `lib/extensions.json` file for the current data structure and examples.

## Technical Overview

### Architecture

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with Radix UI components
- **Deployment**: Vercel with automatic deployments
- **Data Source**: JSON-based extension registry (internal + external sources)

### Data Structure

Extensions are categorized and contain:
- Metadata (name, author, description, license)
- Installation requirements (pip packages/git repos)
- Repository links for documentation and source code
- Classification (interface vs decorator extensions)
- Platform compatibility information

### Development

```bash
# Clone the repository
git clone https://github.com/rsxdalv/tts-webui-extension-catalog.git
cd tts-webui-extension-catalog

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Contributing

Contributions are welcome! The catalog thrives on community submissions:

### Adding Extensions
- All extension data is stored in `lib/extensions.json`
- External submissions can be added via `lib/extensions.external.json`
- Follow the existing JSON schema for consistency

### Code Contributions
- Issues and pull requests are encouraged
- Focus on performance, accessibility, and user experience
- Test on both desktop and mobile devices

## Related Projects

- **[TTS Generation WebUI](https://github.com/rsxdalv/tts-generation-webui)** - The main application this catalog enhances
- **[TTS Generation WebUI Documentation](https://docs.rsxdalv.com)** - Official documentation and setup guides

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Built with caring by the TTS community
- Thanks to all extension developers and contributors
- Special appreciation to the TTS Generation WebUI project and its maintainers

---

*This project is automatically synced with v0.app deployments and maintained by the TTS Generation WebUI community.*
