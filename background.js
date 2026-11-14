const PAGE_MENU_ID = "plainly-explain-page";
const SELECTION_MENU_ID = "plainly-explain-selection";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: PAGE_MENU_ID,
      title: "Explain this page",
      contexts: ["page"]
    });
    chrome.contextMenus.create({
      id: SELECTION_MENU_ID,
      title: "Explain selected text",
      contexts: ["selection"]
    });
  });

  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!tab?.id || !tab.windowId) {
    return;
  }

  const panelPromise = chrome.sidePanel.open({ tabId: tab.id });

  try {
    let page;
    if (info.menuItemId === SELECTION_MENU_ID && info.selectionText) {
      page = {
        title: tab.title || "Selected text",
        url: tab.url || "",
        text: info.selectionText
      };
    } else if (info.menuItemId === PAGE_MENU_ID) {
      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => ({
          title: document.title,
          url: location.href,
          text: document.body?.innerText || ""
        })
      });
      page = result?.result;
    }

    if (!page?.text?.trim()) {
      throw new Error("No readable page text was found.");
    }

    await chrome.storage.session.set({ pendingPage: page });
  } catch (error) {
    await chrome.storage.session.set({
      pendingPageError: error instanceof Error ? error.message : "Could not read this page."
    });
  }

  await panelPromise;
});
