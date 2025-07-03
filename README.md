# Formatly

**Formatly** is a lightweight, fully customizable, and embeddable rich text formatting toolbar and modal editor built for modern web applications. Designed to integrate seamlessly with `<input>`, `<textarea>`, and `contenteditable` elements, Formatly transforms any plain text field into a powerful writing experience — with zero dependencies, automatic dark mode, and one-line CDN installation.

---

## 🚀 Why Formatly?

Whether you're building a note-taking app, comment system, CMS, or feedback form — Formatly offers a minimal yet powerful solution for inline text formatting. Unlike bloated WYSIWYG editors, Formatly is small in size, unobtrusive in design, and built with flexibility in mind.

---

## ✨ Features

- 🖊️ **Supports all input types** — `<input>`, `<textarea>`, and `contenteditable` elements
- 🎨 **Rich formatting tools** — bold, italic, underline, color, headings, lists, quotes, code blocks, and more
- 💡 **Inline and modal modes** — floating toolbar + fullscreen editor on demand
- 🌙 **Automatic theme detection** — light/dark mode based on your app's theme
- ⚡ **Single-file CDN** — no stylesheets or dependencies needed
- 📱 **Mobile-friendly** — responsive, touch-compatible interface
- 💻 **Framework agnostic** — works with plain HTML, React, Vue, etc.

---

## 📦 Installation (1 Line CDN Setup)

Add this single script tag to your HTML to get started:

```html
<script src="https://cdn.jsdelivr.net/gh/kenyoste/formatly@main/formatly.js"></script>
✅ No need to import any CSS — all styles are included dynamically.

🧪 Usage
Simply add the id="formatly" attribute to any input element you want to enhance:

html
Kopyala
Düzenle
<!-- Textarea example -->
<textarea id="formatly" placeholder="Start typing..."></textarea>

<!-- Input example -->
<input id="formatly" type="text" placeholder="Short text input" />

<!-- contenteditable div example -->
<div id="formatly" contenteditable="true" style="min-height: 120px;">
  Editable content block with Formatly
</div>
Formatly will auto-detect and enhance these elements when the DOM loads.

🖼️ Demo
Try Formatly live in your browser:
🔗 Live Demo (Replace with your actual demo URL)

You can also open demo.html inside the GitHub repository for a local preview.

🌒 Dark Mode Support
Formatly automatically detects your app’s theme and adjusts its UI accordingly.

To enable dark mode, add one of the following to your root HTML element:

html
Kopyala
Düzenle
<html class="dark">
<!-- OR -->
<body data-theme="dark">
Formatly UI elements will automatically switch to a darker palette.

⚙️ Customization
Want to tailor the editor to your app’s needs?

CSS: All styles are injected dynamically, but you can override them with your own CSS rules after Formatly loads.

JS: Extend Formatly by forking the GitHub repo and modifying the logic. All code is clean, modular, and well-commented.

Multiple editors: You can place Formatly on multiple fields in the same page by giving each a unique id.

🔧 Advanced Usage (Programmatic Init)
If you want to initialize Formatly manually (instead of auto-loading via id="formatly"), you can use:

js
Kopyala
Düzenle
// Example (if your field doesn't have id="formatly")
Formatly.attach(document.querySelector('#myField'));
🧩 Roadmap Ideas
Planned or suggested future features:

Plugin system (custom buttons, callbacks)

Markdown output toggle

Toolbar position customization

Save/restore local content

Collaborative editing support

Have ideas? Open an issue or start a discussion!

📄 License
This project is licensed under the MIT License.
Feel free to use, modify, and distribute it freely.

© kenyoste

🤝 Contributing
We welcome all contributions — whether it's bug fixes, feature suggestions, or documentation improvements!

To contribute:
Fork this repository

Create a new branch (git checkout -b my-feature)

Make your changes and commit (git commit -m 'Add awesome feature')

Push to the branch (git push origin my-feature)

Create a Pull Request

💬 Contact
Questions, feedback, or want to collaborate?

📫 Open an issue or reach out on GitHub!

Made with care by @kenyoste
Lightweight. Fast. Elegant. That’s Formatly.

yaml
Kopyala
Düzenle

---

## ✅ Summary

This `README.md` now:

- Clearly communicates what Formatly is and who it's for  
- Explains how to use it with **just one line**  
- Covers dark mode, demo, customization, advanced usage  
- Is styled like a real-world open-source project README  
- Is fully professional and ready to be public-facing

---

If you'd like:
- A Turkish version of this `README.md`
- A live documentation website (`formatly.dev`)
- A minimal "Get Started" UI landing page
- Formatly as an NPM package

Let me know — I'd be happy to assist you in building Formatly into a polished, production-grade open-source tool.
