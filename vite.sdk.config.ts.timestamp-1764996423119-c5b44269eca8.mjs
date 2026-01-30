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
    outDir: "dist-sdk",
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "src/sdk/main.tsx"),
      name: "PatraSDK",
      fileName: (format) => `patra-sdk.${format}.js`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5zZGsuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxEZXNrdG9wXFxcXEVORFxcXFxQYXRyYVxcXFxTb3VyY2UgQ29kZVxcXFxwYXRyYS12YXctNzY2NThcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRGVza3RvcFxcXFxFTkRcXFxcUGF0cmFcXFxcU291cmNlIENvZGVcXFxccGF0cmEtdmF3LTc2NjU4XFxcXHZpdGUuc2RrLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVXNlci9EZXNrdG9wL0VORC9QYXRyYS9Tb3VyY2UlMjBDb2RlL3BhdHJhLXZhdy03NjY1OC92aXRlLnNkay5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luKCksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgICBvdXREaXI6ICdkaXN0LXNkaycsXHJcbiAgICAgICAgbGliOiB7XHJcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3Nkay9tYWluLnRzeCcpLFxyXG4gICAgICAgICAgICBuYW1lOiAnUGF0cmFTREsnLFxyXG4gICAgICAgICAgICBmaWxlTmFtZTogKGZvcm1hdCkgPT4gYHBhdHJhLXNkay4ke2Zvcm1hdH0uanNgLFxyXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ3VtZCcsICdlcyddXHJcbiAgICAgICAgfSxcclxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIC8vIFdlIGJ1bmRsZSBSZWFjdCBhbmQgUmVhY3RET00gYmVjYXVzZSB0aGUgaG9zdCBzaXRlIGxpa2VseSBkb2Vzbid0IGhhdmUgdGhlbVxyXG4gICAgICAgICAgICAvLyBJZiB3ZSB3YW50ZWQgYSBzbWFsbGVyIGJ1bmRsZSwgd2UnZCBleHRlcm5hbGl6ZSB0aGVtLCBidXQgZm9yIGEgZHJvcC1pbiBTREssIGJ1bmRsaW5nIGlzIHNhZmVyLlxyXG4gICAgICAgICAgICBleHRlcm5hbDogW10sXHJcbiAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsczoge31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gTWluaWZ5IGZvciBwcm9kdWN0aW9uXHJcbiAgICAgICAgbWluaWZ5OiAnZXNidWlsZCcsXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICAgJ3Byb2Nlc3MuZW52Jzoge30gLy8gUG9seWZpbGwgZm9yIHNvbWUgbGlic1xyXG4gICAgfVxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2WCxTQUFTLG9CQUFvQjtBQUMxWixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sMkJBQTJCO0FBSGxDLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sMEJBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVM7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLHNCQUFzQjtBQUFBLEVBQzFCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDeEM7QUFBQSxFQUNKO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixLQUFLO0FBQUEsTUFDRCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxrQkFBa0I7QUFBQSxNQUNqRCxNQUFNO0FBQUEsTUFDTixVQUFVLENBQUMsV0FBVyxhQUFhLE1BQU07QUFBQSxNQUN6QyxTQUFTLENBQUMsT0FBTyxJQUFJO0FBQUEsSUFDekI7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBO0FBQUEsTUFHWCxVQUFVLENBQUM7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNKLFNBQVMsQ0FBQztBQUFBLE1BQ2Q7QUFBQSxJQUNKO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQSxFQUNaO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixlQUFlLENBQUM7QUFBQTtBQUFBLEVBQ3BCO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
