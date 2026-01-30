// vite.sdk.config.ts
import { defineConfig } from "file:///C:/Users/User/Desktop/END/Patra/Source%20Code/patra-vaw-76658/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/User/Desktop/END/Patra/Source%20Code/patra-vaw-76658/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import cssInjectedByJsPlugin from "file:///C:/Users/User/Desktop/END/Patra/Source%20Code/patra-vaw-76658/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var __vite_injected_original_dirname = "C:\\Users\\User\\Desktop\\END\\Patra\\Source Code\\patra-vaw-76658";
var vite_sdk_config_default = defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    emptyOutDir: false,
    // Don't clear dist, as main build does that
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/sdk/main.tsx"),
      name: "PatraSDK",
      fileName: (format) => {
        if (format === "es") return "patra-sdk.js";
        return `patra-sdk.${format}.js`;
      },
      formats: ["umd", "es"]
    },
    rollupOptions: {
      // We bundle React and ReactDOM because the host site likely doesn't have them
      // If we wanted a smaller bundle, we'd externalize them, but for a drop-in SDK, bundling is safer.
      external: [],
      output: {
        globals: {}
      }
    },
    // Minify for production
    minify: "esbuild"
  },
  define: {
    "process.env": {}
    // Polyfill for some libs
  }
});
export {
  vite_sdk_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5zZGsuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxEZXNrdG9wXFxcXEVORFxcXFxQYXRyYVxcXFxTb3VyY2UgQ29kZVxcXFxwYXRyYS12YXctNzY2NThcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRGVza3RvcFxcXFxFTkRcXFxcUGF0cmFcXFxcU291cmNlIENvZGVcXFxccGF0cmEtdmF3LTc2NjU4XFxcXHZpdGUuc2RrLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9EZXNrdG9wL0VORC9QYXRyYS9Tb3VyY2UlMjBDb2RlL3BhdHJhLXZhdy03NjY1OC92aXRlLnNkay5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6ICdkaXN0JyxcclxuICAgICAgICBlbXB0eU91dERpcjogZmFsc2UsIC8vIERvbid0IGNsZWFyIGRpc3QsIGFzIG1haW4gYnVpbGQgZG9lcyB0aGF0XHJcbiAgICAgICAgbGliOiB7XHJcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3Nkay9tYWluLnRzeCcpLFxyXG4gICAgICAgICAgICBuYW1lOiAnUGF0cmFTREsnLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2VzJykgcmV0dXJuICdwYXRyYS1zZGsuanMnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBwYXRyYS1zZGsuJHtmb3JtYXR9LmpzYDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZm9ybWF0czogWyd1bWQnLCAnZXMnXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICAvLyBXZSBidW5kbGUgUmVhY3QgYW5kIFJlYWN0RE9NIGJlY2F1c2UgdGhlIGhvc3Qgc2l0ZSBsaWtlbHkgZG9lc24ndCBoYXZlIHRoZW1cclxuICAgICAgICAgICAgLy8gSWYgd2Ugd2FudGVkIGEgc21hbGxlciBidW5kbGUsIHdlJ2QgZXh0ZXJuYWxpemUgdGhlbSwgYnV0IGZvciBhIGRyb3AtaW4gU0RLLCBidW5kbGluZyBpcyBzYWZlci5cclxuICAgICAgICAgICAgZXh0ZXJuYWw6IFtdLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICAgIGdsb2JhbHM6IHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIE1pbmlmeSBmb3IgcHJvZHVjdGlvblxyXG4gICAgICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxyXG4gICAgfSxcclxuICAgIGRlZmluZToge1xyXG4gICAgICAgICdwcm9jZXNzLmVudic6IHt9IC8vIFBvbHlmaWxsIGZvciBzb21lIGxpYnNcclxuICAgIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlgsU0FBUyxvQkFBb0I7QUFDMVosT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLDJCQUEyQjtBQUhsQyxJQUFNLG1DQUFtQztBQUt6QyxJQUFPLDBCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixzQkFBc0I7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsYUFBYTtBQUFBO0FBQUEsSUFDYixLQUFLO0FBQUEsTUFDRCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUNqRCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVztBQUNsQixZQUFJLFdBQVcsS0FBTSxRQUFPO0FBQzVCLGVBQU8sYUFBYSxNQUFNO0FBQUEsTUFDOUI7QUFBQSxNQUNBLFNBQVMsQ0FBQyxPQUFPLElBQUk7QUFBQSxJQUN6QjtBQUFBLElBQ0EsZUFBZTtBQUFBO0FBQUE7QUFBQSxNQUdYLFVBQVUsQ0FBQztBQUFBLE1BQ1gsUUFBUTtBQUFBLFFBQ0osU0FBUyxDQUFDO0FBQUEsTUFDZDtBQUFBLElBQ0o7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNKLGVBQWUsQ0FBQztBQUFBO0FBQUEsRUFDcEI7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
