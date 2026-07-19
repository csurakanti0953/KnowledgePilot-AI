# KnowledgePilot AI

<div align="center">
  <img src="./docs/images/github-cover-new.png" alt="KnowledgePilot AI" />
  <br />
  <p><strong>Enterprise-ready AI knowledge experiences for teams that need trustworthy answers from proprietary documents.</strong></p>
  <p>
    <a href="https://github.com/JohannLai/rag-web-ui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/JohannLai/rag-web-ui" alt="License" /></a>
    <a href="https://github.com/JohannLai/rag-web-ui"><img src="https://img.shields.io/github/stars/JohannLai/rag-web-ui?style=social" alt="GitHub stars" /></a>
    <a href="#"><img src="https://img.shields.io/badge/python-3.9%2B-blue" alt="Python" /></a>
    <a href="#"><img src="https://img.shields.io/badge/node-18%2B-green" alt="Node" /></a>
    <a href="#"><img src="https://img.shields.io/badge/docker-ready-blue" alt="Docker" /></a>
  </p>
</div>

## Professional Product Overview
KnowledgePilot AI is a modern enterprise knowledge platform that helps organizations turn internal documents into reliable, grounded AI experiences. The product combines a polished web interface with a robust retrieval pipeline to support document ingestion, knowledge base management, and conversational AI interactions grounded in trusted content.

The platform is designed for teams that need more than generic chatbots. It provides a structured way to connect private data sources, organize knowledge into reusable domains, and deliver answers that are contextual, explainable, and practical for day-to-day operations.

## Problem Statement
Organizations increasingly rely on internal documentation, policies, product knowledge, and operational guides to make informed decisions. However, that information is often fragmented across documents, repositories, and tools. Traditional search is limited, and generic AI assistants often produce responses that are inaccurate or difficult to trust.

KnowledgePilot AI addresses that gap by creating a controlled environment where enterprise knowledge can be ingested, indexed, and queried with clear retrieval workflows and a user-friendly experience.

## Solution
KnowledgePilot AI provides a secure, product-style workspace for building knowledge-driven AI experiences. Users can upload documents, create knowledge bases, and interact with a retrieval-augmented assistant that responds using relevant context from their own content.

The solution emphasizes clarity, extensibility, and a strong product experience suitable for demos, stakeholder presentations, and future enterprise expansion.

## Key Features
- Document ingestion and management for PDF, DOCX, Markdown, and plain text files
- Knowledge base creation and organization for domain-specific content
- Retrieval-augmented chat experiences grounded in user-provided documents
- Structured workflows for document processing and content discovery
- API-ready integration for connecting knowledge experiences into broader systems
- Flexible support for multiple LLM and embedding providers
- Polished web experience designed to feel like a serious SaaS product rather than a prototype

## Architecture
KnowledgePilot AI follows a layered architecture designed for clarity and extensibility:

1. Frontend layer: Next.js and TypeScript deliver the authentication experience, dashboard workflows, knowledge base interactions, and chat interface.
2. Application layer: FastAPI powers core services for auth, knowledge management, document handling, and orchestration logic.
3. Data layer: MySQL stores relational data, MinIO supports document storage, and Chroma/Qdrant provide vector retrieval capabilities.
4. Intelligence layer: LangChain-based orchestration connects retrieval, embeddings, and LLM providers into a unified experience.

## Tech Stack
### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Shadcn-style UI patterns

### Backend
- Python 3.9+
- FastAPI
- SQLAlchemy + Alembic
- MySQL
- MinIO
- LangChain
- ChromaDB / Qdrant

### Infrastructure
- Docker Compose
- Nginx
- Optional LLM providers such as OpenAI, DeepSeek, Ollama, and HuggingFace-compatible services

## Folder Structure
```text
backend/           # FastAPI application, services, models, and API routes
frontend/          # Next.js web application and UI components
docs/              # product documentation and troubleshooting guides
uploads/           # local upload storage for development use
```

## Screenshots
The following areas highlight the product experience and presentation direction of KnowledgePilot AI:

- Dashboard overview
- Knowledge base management
- Document upload and processing workflows
- Conversational AI interface
- API-ready integration experience

![Dashboard Placeholder](https://placehold.co/1200x675/0f172a/ffffff?text=KnowledgePilot+AI+Dashboard)

![Knowledge Base Placeholder](https://placehold.co/1200x675/2563eb/ffffff?text=Knowledge+Base+Workspace)

![Conversational AI Placeholder](https://placehold.co/1200x675/1d4ed8/ffffff?text=Grounded+AI+Chat)

## Installation
### Prerequisites
- Docker and Docker Compose
- Node.js 18+
- Python 3.9+
- 8GB+ RAM recommended

### Quick Start
```bash
git clone https://github.com/JohannLai/rag-web-ui.git
cd rag-web-ui
cp .env.example .env
docker compose up -d --build
```

### Verify the Application
- Frontend: http://127.0.0.1.nip.io
- API docs: http://127.0.0.1.nip.io/redoc
- MinIO console: http://127.0.0.1.nip.io:9001

### Development Environment
```bash
docker compose -f docker-compose.dev.yml up -d --build
```

## Roadmap
- Phase 1: Product presentation, documentation, and visual polish
- Phase 2: Security hardening and authentication maturity
- Phase 3: Retrieval quality improvements and evaluation workflows
- Phase 4: Reliability enhancements for ingestion and background processing
- Phase 5: Enterprise-ready UX and collaboration features

## Future Improvements
- Multi-tenant workspaces and role-based access control
- Hybrid retrieval with reranking and improved relevance signals
- Production-grade observability and background job orchestration
- Stronger governance, auditability, and deployment controls for enterprise use

## License
This project is licensed under the Apache-2.0 License.

## Acknowledgments
- FastAPI
- Next.js
- LangChain
- ChromaDB
- MinIO
