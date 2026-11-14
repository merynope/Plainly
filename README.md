# Plainly — Explain this page

A Chrome Manifest V3 extension that turns a webpage or selected passage into a short explanation for one of three audiences:

- **Like I’m 5** — familiar words, short sentences, and a simple analogy
- **Business exec** — bottom line, impact, risks, and decisions
- **Developer** — technical details, assumptions, and trade-offs

## Load the extension

1. In Chrome, open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Choose **Load unpacked** and select this folder.
4. Open the extension’s side panel from the toolbar, then choose **Settings** and add an OpenAI API key.
5. Right-click a page and choose **Explain this page**, or select text and choose **Explain selected text**. You can also use **Load page** in the side panel.

The extension requires Chrome 116 or newer. It uses the OpenAI Responses API with `gpt-4.1-mini`; API usage is billed to the account associated with the API key.

## Privacy

The API key is stored in this browser’s `chrome.storage.local` and is sent to OpenAI to make explanation requests. Page text is sent to OpenAI only when you request an explanation; the extension does not send it to a separate backend. Avoid using it on pages containing sensitive or private information. The extension sends at most the first 18,000 characters of page text per request.

AI-generated explanations can be incomplete or incorrect. They are not legal, medical, or financial advice.
