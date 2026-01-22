# 🛡️ OpenGuard AI

**OpenGuard AI** is an open-source, multimodal AI content detection framework designed to identify **harmful, unsafe, and policy-violating content** across **text, images, audio, and video**.  
It is inspired by large-scale content moderation systems used in modern social media platforms.

The project focuses on **clean architecture, explainability, and scalability**, making it suitable for research, portfolios, and future production systems.

![OpenGuard AI Banner](docs/images/logo.png)

---
🌍 Live Deployment

OpenGuard AI is deployed using a modern split-architecture setup, separating frontend and backend for scalability and clarity.

🔗 Live URLs

Frontend (Vercel):
👉 https://openguardai.vercel.app

Backend API (Render):
👉 https://openguardai-backend.onrender.com

## 🚀 Features

### Current (MVP)
- ✅ Text content moderation (toxic, hate, unsafe language)
- ✅ REST API built with FastAPI
- ✅ Confidence scoring & action suggestion
- ✅ Modular and extensible architecture

### Planned (Roadmap)
- 🔜 Image content detection (NSFW, violence, unsafe symbols)
- 🔜 Video moderation using frame sampling
- 🔜 Audio moderation (speech → text → analysis)
- 🔜 Admin dashboard for human review
- 🔜 Analytics & reporting
- 🔜 Policy-based risk scoring engine

---

## 🧠 Why OpenGuard AI?

Most content moderation demos focus only on **model accuracy**.  
OpenGuard AI focuses on **real-world system design**, including:

- AI-assisted (not AI-only) moderation
- Modular AI pipelines
- Replaceable models (vendor-agnostic)
- Human review workflow
- Ethical & responsible AI usage

---

## 🏗️ Architecture Overview

```
Client (Web / API)
        |
FastAPI Gateway
        |
Content Router
 ├── Text Analyzer
 ├── Image Analyzer
 ├── Video Analyzer
 └── Audio Analyzer
        |
Risk Scoring Engine
        |
Policy Engine
        |
Logs / Analytics / Review
```

---

## 🧰 Tech Stack

### Backend
- Python 3.10+
- FastAPI
- Pydantic
- Uvicorn

### AI / ML (Planned)
- PyTorch
- Hugging Face Transformers
- Vision models (ViT / CLIP)
- Whisper (speech-to-text)

### Frontend (Planned)
- React / Next.js
- TypeScript
- Tailwind CSS

---

## 📂 Project Structure

```
openguardai/
├── backend/
├── ai/
├── frontend/
├── docs/
├── examples/
├── README.md
└── LICENSE
```

---

## ▶️ Getting Started

```bash
git clone https://github.com/wispas/openguardai.git
cd openguardai/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open:
```
http://127.0.0.1:8000/docs
```

---

## ⚖️ Ethics & Responsibility

OpenGuard AI performs **classification only**, encourages **human-in-the-loop moderation**, and avoids generating harmful content.

---

## 📄 License

MIT License
