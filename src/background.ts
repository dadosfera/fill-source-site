/// <reference types="chrome"/>

try {
  importScripts('runtime.js');
} catch (e) {
  console.log(e);
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.webNavigation.onCompleted.addListener(
    () => {
      chrome.tabs.query({ active: true, currentWindow: true }, ([{ id }]) => {
        if (id) {
          chrome.pageAction.show(id);
        }
      });
    },
    {
      url: [
        { urlContains: 'dadosfera.ai' },
        { urlContains: 'dadosfera.ml' },
        { urlContains: 'localhost:4200' },
      ],
    }
  );
});
