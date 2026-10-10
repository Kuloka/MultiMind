<p align="center">
  <img src="resources/branding/aetherai-github.png" alt="AetherAI - your ideas, your models, your space" width="100%">
</p>
<p align="center">
  <a href="https://github.com/Kuloka/AetherAI/releases/tag/v1.24.6">Download for Windows, macOS and Linux</a> &nbsp; / &nbsp;
  <a href="#development">Development</a>
</p>

# AetherAI

[Product website](https://aetherai-chat.pages.dev/) · [Latest downloads](https://github.com/Kuloka/AetherAI/releases/latest)

Local desktop AI studio built with Electron. AetherAI can prepare a compact model without installing Ollama, and split a request between specialist agents before producing a combined answer.

## Windows installation

### Cloud or Local AI

Open **Settings → General → Local AI** to switch between cloud and local models. With Local AI off, the model picker shows connected cloud providers and hides the download catalog. With Local AI on, it shows downloaded Ollama and built-in models and restores the installation catalog. The app remembers the setting and the last model selected in each mode. Existing local-model users keep local mode on upgrade.

Connect a personal API key in **Settings → Providers**. OpenRouter lists text models available under your account preferences and guardrails using `/models/user`, including paid models with their current input/output prices. Free models are marked Free; paid models are marked Paid. Paid models are used only when explicitly selected (or restored from your saved selection), with no automatic fallback from a free model to a paid one. Groq exposes chat models using your account limits. Keys are validated and encrypted using Electron secure storage. Messages and attached context go to the selected provider. Subagents make additional API requests. Ollama Cloud remains an optional separate connection. API errors are converted into readable messages in Russian or English, including mid-stream errors, upstream overload, request limits, insufficient balance, authentication, context length and connection failures.

For the installation steps below, turn **Local AI** on first.

Connecting a provider automatically turns Local AI off; toggle it back on to restore downloaded models and the catalog. Ollama Cloud has a separate settings section. The compact 300px model picker pins the selected model above the standard rows with a Selected badge, real brand icons, and shorter 7px quota bars. Cloud models group by advertised parameter count (up to 8B, 8–32B, 32B+, or unknown), with context lengths shown when supplied. Groq counters use per-model response headers; OpenRouter counters use `/api/v1/key`. Percentages and counts mean remaining quota. Only reported periods are displayed; no arbitrary 5-hour allowance is assumed. The provider selection, model selection and latest timestamped quota snapshots persist across restarts. Quota snapshots are refreshed on opening the model picker when the provider offers a quota endpoint.

Run the generated AetherAI Setup executable, then choose **Quick setup** in the welcome screen. It downloads a pinned llama.cpp CPU runtime (18.6 MB) and Qwen2.5 1.5B Instruct Q4_K_M (1.12 GB), verifies both using SHA256, and starts the model automatically. Interrupted downloads can resume. If Microsoft Visual C++ runtime libraries are missing, setup downloads their signed 25.6 MB installer from Microsoft and launches it; Windows may request administrator confirmation. This prerequisite path was inspected but not exercised on a clean Windows installation. No Node.js, Python, API key, or Ollama installation is needed for this path.

Quick setup currently supports **Windows x64** and text conversations. The small starter model is intended for getting started; it is not a replacement for a larger coding model. The runtime binds only to loopback and stops when AetherAI exits. Models need an internet connection to download; generation with the prepared model works locally. The existing optional web search feature can still make internet requests.

Existing Ollama installations are detected and started automatically. **Install Ollama instead** installs it from the app; downloading an Ollama catalog model also prepares Ollama when necessary. Other platforms currently use Ollama. The welcome screen provides the model download size before setup starts.

## macOS and Linux installation

Release 1.24.6 includes macOS DMGs for **Apple Silicon (arm64)** and **Intel (x64)**, plus Linux x64 **AppImage** and **Ubuntu/Debian .deb** packages. On Mac, open the DMG and drag AetherAI to Applications. These builds are unsigned and not notarized by Apple; macOS may require approval in Privacy & Security. On Linux, install the .deb or make the AppImage executable before launching it; AppImage may require FUSE.

For local models on these platforms, install Ollama and select the **Ollama** tab in the model catalog. The **Without Ollama / Quick setup** engine is Windows x64 only. Ollama Cloud is also available through settings. All four native CI jobs run the automated suite and check that the packaged app launches; inference on every platform and clean-machine installer flows have not been tested.

## Agent team

AetherAI also connects Google Gemini (Google AI Studio key) and Cerebras (Cerebras Cloud key) through their OpenAI-compatible endpoints. The provider's current model list is loaded when connected; availability, limits and billing depend on that account. Real inference with these new providers requires your keys and has not been exercised against live accounts in the automated tests.

The assistant now uses a general-purpose conversation prompt. Greetings, single letters, creative writing and explanations do not authorize project creation or file writes. File handling is gated by an explicit technical/file request, even if a model mistakenly returns a code fence. Short ordinary messages skip the subagent and plugin planners. Programming examples can remain in chat without being saved. This changes prompts and application behavior; it does not fine-tune model weights.

**Agents - Auto** enables a coordinator that proposes up to two independent subtasks. Specialists receive the conversation context and assigned task, and the main model combines their drafts. Simple or indivisible requests skip the specialists. Image requests use the existing vision path.

The team panel displays actual request states, model names, elapsed time, assignments, and returned drafts. Stop cancels the active team requests and final response. Failed workers are shown as errors; their output is excluded from synthesis. Workers analyze supplied context and draft text/code; they do not independently execute tools or edit files. Existing main-response file handling remains responsible for project writes.

Settings let each specialist use the main model or another installed text model. The embedded engine shares one set of model weights across up to two request slots, falling back to one at startup when available RAM is below 6 GiB or there are fewer than four logical CPUs. Ollama schedules its own requests and may queue them. Multiple agents can take longer than one model; acceleration is not guaranteed.

## Development

```sh
npm install
npm start
npm run check
npm test
npm run dist:win
```

`dist:win` builds an NSIS installer and a portable executable. On PowerShell systems that block npm.ps1, use `npm.cmd`. `install.cmd` prepares development dependencies; end users should use the generated installer.

Data lives in ~/.multimind-data and projects in ~/MultiMindProject. On first launch, existing legacy chats, settings, downloaded models and projects are imported once without overwriting current files. Original folders remain as backups. Installer upgrade identity is preserved.

## Upstream components

- [llama.cpp b10549](https://github.com/ggml-org/llama.cpp/releases/tag/b10549), MIT license; the downloaded archive retains its upstream files.
- [Qwen2.5 1.5B Instruct GGUF](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF), Apache 2.0 model license.
- [Ollama](https://ollama.com/) remains an optional model backend.

The starter engine and model are downloaded separately and are not bundled into the application installer.

## Downloading more models without Ollama

The **Without Ollama** tab has its own [models-catalog.json](models-catalog.json), independent of the Ollama and Ollama Cloud catalogs. It downloads single-file GGUF models directly from Hugging Face, using revision-pinned URLs, exact byte sizes and mandatory SHA256 verification. The existing llama.cpp **b10549** CPU runtime supports the Qwen2, Llama, Phi3 and Gemma2 architectures; no runtime upgrade is needed. This embedded engine currently supports Windows x64.

The original Qwen2.5 1.5B Instruct Q4_K_M starter remains available. Seven model lines have paired **Q4_K_M** and **Q8_0** variants:

| Model | File GB, Q4 / Q8 | Estimated engine RAM GiB, Q4 / Q8 | Minimum system RAM GiB, Q4 / Q8 |
| --- | --- | --- | --- |
| Qwen2.5 3B Instruct | 1.93 / 3.29 | 3.5 / 5 | 8 / 8 |
| Qwen2.5 Coder 1.5B Instruct | 0.99 / 1.65 | 2.5 / 3 | 6 / 6 |
| Qwen2.5 Coder 3B Instruct | 1.93 / 3.29 | 3.5 / 5 | 8 / 8 |
| Llama 3.2 1B Instruct | 0.81 / 1.32 | 2 / 2.5 | 4 / 6 |
| Llama 3.2 3B Instruct | 2.02 / 3.42 | 4 / 5.5 | 8 / 12 |
| Phi-3.5 Mini Instruct | 2.39 / 4.06 | 6.5 / 8 | 12 / 16 |
| Gemma 2 2B Instruct | 1.71 / 2.78 | 3.5 / 4.5 | 8 / 8 |

File GB means decimal gigabytes; GiB means 1024³ bytes. RAM values are planning estimates for one 8192-token slot with CPU weights, KV cache and working buffers, not measured guarantees. System RAM includes additional headroom for the OS and app. Parallel agents, longer contexts and other applications increase memory needs; Phi's KV cache is comparatively large. Cards show RAM estimates and low-end / balanced / powerful-PC recommendations. Exact sizes, expected SHA256 hashes and source URLs are in the JSON; the starter estimates are 2.5 GiB engine RAM and 6 GiB system RAM.

Catalog downloads retain `.part` files after cancellation or a network interruption and resume with HTTP Range. SHA256 and GGUF magic bytes are checked before a model is inserted atomically into `~/.multimind-data/runtime/llama-b10549/models.json`; existing installed models remain selectable.

To extend the catalog, add an entry to `models-catalog.json` and restart/rebuild the app; no renderer or runtime edits are needed. Keep IDs unique, SHA256 mandatory, sizes in bytes, and recommendations one of `low`, `balanced`, `powerful`. Check the model's upstream license and runtime architecture support. Sources: [Qwen starter](https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF), [Qwen 3B](https://huggingface.co/bartowski/Qwen2.5-3B-Instruct-GGUF), [Qwen Coder 1.5B](https://huggingface.co/bartowski/Qwen2.5-Coder-1.5B-Instruct-GGUF), [Qwen Coder 3B](https://huggingface.co/bartowski/Qwen2.5-Coder-3B-Instruct-GGUF), [Llama 1B](https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF), [Llama 3B](https://huggingface.co/bartowski/Llama-3.2-3B-Instruct-GGUF), [Phi](https://huggingface.co/bartowski/Phi-3.5-mini-instruct-GGUF), [Gemma](https://huggingface.co/bartowski/gemma-2-2b-it-GGUF), [runtime architecture map](https://github.com/ggml-org/llama.cpp/blob/b10549/src/llama-arch.cpp). Sizes/hashes and public GGUF headers were checked against pinned revisions; this is not a full inference benchmark of every variant.

The built-in engine loads one model at a time. Specialists sharing that model can use its parallel slots; specialists assigned different built-in models run sequentially to avoid replacing a model during an active response.

## Customization

The logo list in Customization switches between AetherAI, Claude, ChatGPT and DeepSeek. Only the displayed name, logo and thinking indicator change. Logos retain their brand colors; your existing colors, typography, welcome text and background stay unchanged. Claude uses independently moving spark rays, ChatGPT a pulsing dot, and DeepSeek a whale with animated dots. Model logos reuse existing licensed SVG assets (resources/model-icons/SOURCES.md). Motion is reconstructed locally. Prompts and model selection remain unchanged. Hidden windows pause motion; reduced motion uses still indicators. See [visual preferences](docs/chat-visual-styles.md) for verification.

Settings > Customization (the pen icon) offers None, Gateway Flow, Pattern Waves and Pixel Blast. Choose an accent from the swatches or use the native color picker; a second picker changes the application's surface color with automatically contrasting text. Reset restores the default monochrome appearance. Settings are saved across restarts, and color changes apply immediately. Backgrounds stop when the window is hidden; reduced-motion preferences use a static field for GPU effects. Desktop backgrounds do not intercept chat interactions.

React Bits sources are bundled locally rather than loaded from a CDN. Pattern Waves uses OGL and Pixel Blast uses Three.js; the desktop includes their dependencies in a standalone bundle. The website product wordmark uses Shape Waves (WebGPU) and falls back to HTML text when unsupported. The shared sources and license are in `docs/source/backgrounds` and `resources/reactbits-license.txt`.

The experimental terminal panel and its command-execution IPC endpoint have been removed. Project files and MCP Workspace tools remain available.

## Local skills

Settings > Skills imports Markdown instruction files. Enable each skill explicitly; enabled instructions apply to the main model on subsequent requests. Imported files live in ~/.multimind-data/skills. Each imported skill is limited to 12,000 characters and the enabled set to 24,000. Skills are instructions, not executable plugins.

The window uses an integrated draggable title bar with minimize, maximize/restore and close controls.

## Discord Activity

Settings > Discord Activity enables Rich Presence using the built-in AetherAI application ID. The default animated flowing A logo is hosted publicly on GitHub. A running Discord desktop client and activity sharing enabled in Discord are required. The sidebar logo animates only on hover.

Custom HTTPS image URLs or Discord asset names override the default logo; clear the field to restore it. Add prepares a local image/GIF (up to 1024 pixels on its longest side), preserves animation, and warns about small images. Custom files need public hosting before Discord can display them. No bot token is required.

## MCP Plugins

Settings > Plugins manages local stdio and remote Streamable HTTP MCP connections. Add a connection, then enable it to start the server and discover tools. Local servers need their executable/runtime installed; HTTP connections currently support endpoints without OAuth or custom authentication headers.

The built-in Workspace connection ships with the app and exposes `list_projects`, `list_files`, and `read_text_file` inside the project folder. It does not require Node.js to be installed separately. Imported connections are disabled by default; enabled connections reconnect on application startup. Settings are stored in `~/.multimind-data/plugins.json`.

On text requests, the main model can select tools through a bounded JSON planning loop (at most four calls, at most 40 advertised tools). Ask mode prompts before calls, Full access runs without those prompts, and Plan mode disables tool execution. Stop cancels pending calls. Text results are passed to the main model and subagents as context. Unsupported model output does not execute a tool. OAuth, a plugin marketplace, and plugin UI extensions are not included.

Validation includes real stdio and HTTP MCP servers, approval denial, disabled connections, project path boundaries, and a Qwen 1.5B smoke run that selected a tool and used its result in the final answer. Other models may be less reliable at selecting tools.

## Profile, memory and model details

The bottom sidebar profile opens sign-in for guests and an upward account menu for signed-in users. Sign in with Google or email/password; registration confirms email with a six-digit code. Choose an avatar or use your email initial. Presets define response language, length, tone and style across chats, without a Personal/Project selector. Edit, disable or delete presets; deletion clears their text and retains a sync tombstone. Sync is explicit; provider keys, projects, files and chat histories are not uploaded by this integration.

Presets are off for chat requests by default. Explicitly enable their use for the named selected model/provider. Switching models or accounts clears this consent. Existing legacy project notes retain their scope until edited. Presets do not authorize file changes or tools. Local presets and chat history are not encrypted; do not store secrets in presets.

Model details show reported context, image support, size, quantization and known language information, with unknown values stated explicitly. Run quick check sends one English greeting and records elapsed time and a response sample on this device; it is not a general benchmark and a paid model can charge for that request.

Release builds contain shared public Supabase client configuration; backend Google/SMTP settings remain operator-managed. See [account setup](docs/account-setup.md) and [RLS setup](docs/memory-schema.sql). Apply and verify RLS in Supabase before enabling production sync. Google uses the system browser and PKCE; sessions and provider keys use OS encryption in the main process and reject unencrypted Linux storage. Tests simulate authentication responses; a successful request does not prove email delivery.

## SambaNova

Connect a SambaNova key in Settings > Providers > SambaNova. Keys are encrypted locally; the text model list is fetched from `https://api.sambanova.ai/v1/models`. Responses stream through the OpenAI-compatible chat endpoint and can be cancelled. Reported per-model minute and daily request counters are shown separately and persisted; no remaining quota is invented before the API reports it. The limit dialog opens SambaNova billing.

The free tier is available without a payment method. As of October 8, 2026, documented free models include DeepSeek V3.1/V3.2, Llama 3.3 70B, GPT-OSS 120B and Gemma 4 31B, each subject to 20 requests/minute, 20 requests/day and 200,000 tokens/day. Access and effective pricing depend on your account; standard API model prices are not interpreted as a promise that every request is free. [Official limits](https://docs.sambanova.ai/docs/en/models/rate-limits).

## OpenRouter limits

Free model variants normally allow 20 requests per minute and 50 per UTC day. Purchasing at least $10 in credits over the account's lifetime raises the daily ceiling to 1,000; the current documentation notes a rounding allowance starting at 9 credits. The authoritative daily limit and remaining requests are returned by `GET /api/v1/key` in `free_model_daily_requests`; `is_free_tier` alone does not determine that ceiling. Limits are shared across keys/accounts rather than replenished for each model. Provider capacity restrictions may apply separately.

Paid variants have no OpenRouter platform request cap of this kind, but balance, API key spending limits, upstream provider capacity and transient in-flight spending holds still apply. Temporary holds should be retried after `Retry-After`, not mistaken for an empty balance. A negative balance can also block free requests. Unknown quota values are not estimated from token or dollar usage.

Reference checked October 7, 2026: [OpenRouter limits](https://openrouter.ai/docs/api_reference/limits). Cloud model filters offer Show all, Only free and Only paid; models with unknown pricing appear under Show all. Your selected model remains pinned and the filter is saved locally.

## Ollama Cloud connection

Settings > Ollama Cloud connects through an Ollama API key created on the official account page. Keys are encrypted with Electron safeStorage (Windows DPAPI) in a separate local credential file and never returned to the chat renderer after saving. Saving a key does not verify the account or reveal its subscription; access is checked on model requests.

The cloud catalog refreshes from `https://ollama.com/api/tags`. Models marked `cloud:` use the official hosted chat API, without a local Ollama installation. Messages, attachments and selected tool context for these models are sent to Ollama. Local models retain their existing local route. Cloud calls stream responses and support cancellation.

The pricing dialog offers Free, Pro and Max links to Ollama's official pricing page. It opens for payment/credit errors, not simply because an account lacks a subscription. Authentication, rate limits and billing errors are handled separately. Displayed monthly prices are a dated reference; final checkout prices, available models and API credit terms are controlled by Ollama. Paid inference and checkout were not exercised with a live account.

## Download brand images

[Banner, 2560 x 1280](resources/branding/aetherai-banner.png) / [GitHub image, 1280 x 640](resources/branding/aetherai-github.png) / [Transparent icon](resources/branding/aetherai-icon.png)

Regenerate the vector-based artwork with `node scripts/create-branding.cjs`.
