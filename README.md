# AI2Apps Agents

AI2Apps Agents is a collection of AI agents and tools that support speech processing, text-to-speech, chemistry research, image generation, web automation, and more.

All the agents are built in [AI2Apps platform](https://github.com/Avdpro/ai2apps).

## 📁 Project Structure

### Core Components
- **AgentBuilder** - Agent construction tool providing project setup, environment configuration, code generation, and more
- **gernalist.js** - General-purpose agent supporting tool management and speed mode
- **pkgUtil.js** - Package management utility
- **setup.js** - Project setup script

### AI Agents

#### Speech Processing
- **whisper** - Speech recognition agent based on OpenAI Whisper model
- **coqui_tts** - Text-to-speech agent using Coqui TTS
- **mega_tts3** - Advanced text-to-speech service
- **sparktts** - iFLYTEK speech synthesis service

#### Professional Domains
- **ChemAgent** - Chemistry research agent with speed mode and expert mode
- **chemformer** - Chemical molecule transformation tools
- **chemt5** - Chemical text processing model

#### Image & Vision
- **DrawSD** - Image generation agent based on Stable Diffusion
- **sam2** - Image segmentation tools

#### Web & Automation
- **WebAgent** - Web RPA agent supporting web automation
- **WebRpa** - Web robotic process automation
- **DeepSearch** - Deep search agent

#### Communication & Integration
- **wechat** - WeChat integration agent
- **tabos** - TabOS system integration

#### Deployment & Testing
- **AutoDeploy** - Automated deployment tools
- **SetupTest** - Setup testing tools

## 🚀 Quick Start

1. Follow the guide in [AI2Apps](https://github.com/Avdpro/ai2apps) to deploy the AI2Apps platform locally

2. Create an empty backend agent within the AI2Apps platform environment and open it in an IDE

3. Sync/copy the contents of the specific agent you want to use to the **`ai/`** subdirectory

## 🔧 Main Features

### General Agent (gernalist)
- Tool management and loading
- Speed mode operations
- Multi-language support (English/Chinese)
- Dynamic tool selection and execution

### Chemistry Research Agent (ChemAgent)
- Chemical molecule analysis
- Reaction prediction
- Literature search
- Experimental design suggestions

### Speech Processing Agents
- Real-time speech recognition
- Multi-language TTS
- Audio format conversion
- Speech quality optimization

### Image Generation Agent (DrawSD)
- Text-based image generation
- Image editing and modification
- Multiple artistic style support
- Batch image processing

### Web Automation Agent (WebAgent)
- Web data scraping
- Automated operations
- Form filling
- Content monitoring

## 🌐 Configuration

### agenthub.json Configuration
```json
{
    "user": "your-email@example.com",
    "devKey": "YOUR-Dev-Key",
    "host": "ws://localhost:3015",
    "language": "EN",
    "globalContext": {
        "models": {
            "expert": {"platform": "OpenAI", "model": "gpt-4o"},
            "standard": {"platform": "OpenAI", "model": "gpt-4o"},
            "lite": {"platform": "OpenAI", "model": "gpt-4o-mini"}
        }
    }
}
```

## 🔄 Development Mode

### Project Setup
Use `setup.js` for project configuration:
```javascript
import {setupPrj, setupAgent} from './setup.js';

// Setup project
await setupPrj(session, path, "EN");

// Setup agent
await setupAgent(session, path, "EN");
```

### Adding New Agents
1. Create agent files in appropriate directory
2. Configure `agent.json`
3. Implement necessary interface functions
4. Update main configuration

## 📝 Usage Instructions

1. **Select Agent**: Choose appropriate agent based on requirements
2. **Configure Environment**: Ensure all dependencies are installed
3. **Set API Keys**: Configure corresponding API access permissions
4. **Run Agent**: Start the corresponding agent service
5. **Interactive Use**: Interact with agents through chat interface or API

---

*Last updated: 2025-09-06*
