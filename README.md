# ADK Canvas Flow

A visual builder for designing **Google Agent Development Kit (ADK)** workflows on a drag‑and‑drop canvas. Create agent graphs, configure nodes, and export runnable Python scaffolds in seconds.

## ✨ Highlights

- **Drag & drop canvas** for building agent graphs with connections (React Flow)
- **Component library**: LLM agents, workflow nodes (sequential/parallel/loop), and tool nodes
- **Properties panel** to configure models, instructions, tools, and parameters
- **Code generation** for ADK Python with one‑click copy/download
- **Export bundle** (main.py + requirements.txt + Dockerfile)
- **Test console** to simulate conversations and validate flows (UI‑level simulation)

> Note: The test console is a simulated runner for UI validation. It does not execute real ADK agents yet.

## 🧱 Tech Stack

- **Vite + React + TypeScript**
- **Tailwind CSS + shadcn/ui** (Material‑style theming)
- **React Flow** for canvas + graph edges
- **Zustand** for state management
- **Monaco Editor** for generated code view

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
src/
  components/      # UI blocks, canvas, panels, nodes
  pages/           # Route views
  store/           # Zustand state + ADK model types
  lib/             # Helpers
```

## 🧪 What You Can Do Right Now

- Build agent workflows with nodes + connections
- Configure each node’s settings in the properties panel
- Generate ADK‑style Python code
- Export a deployable bundle (Python + Docker)

## 🛣️ Roadmap Ideas

- Real ADK execution (local runner integration)
- Import/export flow JSON
- Templates for common agent patterns
- Multi‑agent testing with real tool calls

## 🤝 Contributing

PRs welcome. If you plan a large change, open an issue first to align on scope.

---

Built for rapid ADK prototyping and demos.
