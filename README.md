# Formatly

Formatly is a modern, lightweight, and highly customizable rich text formatting toolbar and modal editor for input, textarea, and contenteditable div elements.  
It provides users with an intuitive and beautiful interface to format their text, supporting both light and dark themes, and can be easily integrated into any web project.

## Features

- 🖊️ Supports `<input>`, `<textarea>`, and `contenteditable` `<div>` elements
- 🎨 Rich formatting: bold, italic, underline, color, headings, lists, code, and more
- 🌗 Automatic light/dark mode support
- 🖥️ Inline toolbar and fullscreen modal editor
- ⚡️ Super lightweight, no dependencies
- 📦 Easy CDN integration

## Demo

[Live Demo](https://your-demo-link.com)  
*(Replace with your actual demo link)*

## Installation

You can use Formatly via CDN:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/your-github-username/formatly/formatly.css">
<!-- JS -->
<script src="https://cdn.jsdelivr.net/gh/your-github-username/formatly/formatly.js"></script>
```

> **Note:** Replace `your-github-username` and repo name with your actual GitHub details.

## Usage

Add the `id="formatly"` attribute to any `<input>`, `<textarea>`, or `contenteditable` `<div>` you want to enhance:

```html
<input id="formatly" type="text" placeholder="Formatly input example">
<textarea id="formatly" placeholder="Formatly textarea example"></textarea>
<div id="formatly" contenteditable="true" style="width:400px;">Formatly contenteditable div example</div>
```

**How it works:**
- A small logo appears at the top-right of the element.
- Clicking the logo opens an inline toolbar with formatting options.
- If the toolbar is expanded, all formatting buttons are shown.
- Clicking the fullscreen icon opens the advanced modal editor.

## Dark Mode

Formatly automatically detects dark mode if your `<html>` or `<body>` has the `dark` class or `data-theme=\"dark\"` attribute.

## Customization

You can further customize Formatly by editing the CSS or extending the JS as needed.

## License

MIT

---

**Enjoy using Formatly!**  
Feel free to contribute or open issues on [GitHub](https://github.com/your-github-username/formatly).