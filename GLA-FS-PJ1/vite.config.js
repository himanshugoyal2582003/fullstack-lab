import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite React JSX ko samajhne aur development server chalane mein help karta hai.
export default defineConfig({ plugins: [react()] });
