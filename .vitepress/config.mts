import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Kawaii Networks",
    description: "AS27523",
    srcDir: "./src",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "About", link: "/about" },
            { text: "Peering", link: "/peering" },
            { text: "Algorithm", link: "/algorithm" },
        ],

        sidebar: [
            {
                text: "About",
                items: [{ text: "Kawaii Networks", link: "/about" }],
            },
            {
                text: "Peering",
                items: [{ text: "Peering", link: "/peering" }],
            },
            {
                text: "Algorithm",
                items: [{ text: "algorithm", link: "/algorithm" }],
            },
            {
                text: "Router info",
                items: [{ text: "Router info", link: "/router" }],
            },
        ],

        socialLinks: [
            {
                icon: {
                    svg: `<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1512" data-spm-anchor-id="a313x.7781069.0.i0" width="200" height="200"><path d="M491.477333 981.333333c-133.290667 0-261.76-32.896-380.757333-95.573333A45.098667 45.098667 0 0 1 85.333333 845.013333V178.986667c0-17.237333 9.514667-32.896 25.386667-40.746667C229.717333 75.562667 358.186667 42.666667 491.477333 42.666667c133.248 0 261.76 32.896 380.714667 95.573333 15.872 7.850667 25.386667 23.509333 25.386667 40.746667v664.448c0 17.237333-9.514667 32.896-25.386667 40.746666C753.237333 948.437333 624.725333 981.333333 491.52 981.333333zM180.48 815.232c98.346667 47.018667 201.472 72.106667 310.954667 72.106667 109.44 0 212.565333-23.552 310.912-72.106667V208.768a695.68 695.68 0 0 0-310.912-72.106667c-107.904 0-212.608 23.552-310.954667 72.106667v606.464z" fill="#707070" p-id="1513" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path><path d="M491.477333 379.562667c-133.290667 0-261.76-32.853333-380.757333-95.573334-23.808-12.544-31.744-40.746667-19.029333-64.256 12.672-23.466667 41.216-31.317333 65.024-18.773333a698.282667 698.282667 0 0 0 334.762666 84.608c117.376 0 230.016-28.202667 334.72-84.608a48.981333 48.981333 0 0 1 65.024 18.773333 47.786667 47.786667 0 0 1-19.029333 64.256c-118.954667 62.72-247.466667 95.573333-380.714667 95.573334zM491.477333 680.448c-133.290667 0-261.76-32.896-380.757333-95.573333-23.808-12.544-31.744-40.746667-19.029333-64.256 12.672-23.466667 41.216-31.36 65.024-18.773334a698.282667 698.282667 0 0 0 334.762666 84.608c117.376 0 230.016-28.202667 334.72-84.650666a48.981333 48.981333 0 0 1 65.024 18.816 47.786667 47.786667 0 0 1-19.029333 64.256c-118.954667 62.677333-247.466667 95.573333-380.714667 95.573333z" fill="#707070" p-id="1514" data-spm-anchor-id="a313x.7781069.0.i1" class="selected"></path></svg>`,
                },
                link: "https://www.peeringdb.com/net/35648",
            },
            { icon: "github", link: "https://github.com/KawaiiNetworks/website" },
        ],

        footer: {
            message: "Released under the CC BY-NC-SA 4.0",
            copyright: "Copyright © 2024 Kawaii Networks LLC",
        },
    },
});
