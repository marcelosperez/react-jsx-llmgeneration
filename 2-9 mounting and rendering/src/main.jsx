import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Create MutationObserver to watch for DOM changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.group('🔧 React DOM Mutation Detected');
    
    // Log the type of mutation
    console.log('Type:', mutation.type);
    console.log('Target:', mutation.target);
    
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length > 0) {
        console.log('Added nodes:', Array.from(mutation.addedNodes));
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            console.log(`  → Added element: <${node.tagName?.toLowerCase()}>`);
          } else if (node.nodeType === Node.TEXT_NODE) {
            console.log(`  → Added text: "${node.textContent}"`);
          }
        });
      }
      
      if (mutation.removedNodes.length > 0) {
        console.log('Removed nodes:', Array.from(mutation.removedNodes));
        mutation.removedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            console.log(`  → Removed element: <${node.tagName?.toLowerCase()}>`);
          } else if (node.nodeType === Node.TEXT_NODE) {
            console.log(`  → Removed text: "${node.textContent}"`);
          }
        });
      }
    }
    
    if (mutation.type === 'attributes') {
      console.log(`Attribute changed: ${mutation.attributeName}`);
      console.log(`New value: ${mutation.target.getAttribute(mutation.attributeName)}`);
    }
    
    if (mutation.type === 'characterData') {
      console.log(`Text content changed to: "${mutation.target.textContent}"`);
    }
    
    console.groupEnd();
  });
});

// Start observing the root element and its descendants
const rootElement = document.getElementById('root');

// Configure the observer to watch for all types of changes
observer.observe(rootElement, {
  childList: true,        // Watch for added/removed child nodes
  subtree: true,          // Watch all descendants, not just direct children
  attributes: true,       // Watch for attribute changes
  attributeOldValue: true, // Include old attribute values
  characterData: true,    // Watch for text content changes
  characterDataOldValue: true // Include old text content
});

console.log('🎯 DOM Mutation Observer started - React\'s imperative DOM updates will be logged below:');
console.log('────────');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)