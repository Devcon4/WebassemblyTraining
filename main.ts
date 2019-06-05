import { LitElement, html, customElement, css} from 'lit-element';

@customElement('wasm-header')
class WasmHeaderComponent extends LitElement {
    render() {
        return html`<div></div>`;
    }
}

@customElement('wasm-sidebar')
class WasmFilterSidebarComponent extends LitElement {
    render() {
        return html`<div></div>`;
    }
}

@customElement('wasm-app')
class AppComponent extends LitElement {

    static styles = css`
        .wrapper {
            display: grid;
            grid-template-columns: 100px 1fr;
            grid-template-rows: 50px 1fr;
            height: 100%;
            grid-template-areas: 'sidebar header' 'sidebar content';
        }

        .header {
            grid-area: header;
        }

        .sidebar {
            grid-area: sidebar;
        }

        .content {
            grid-area: content;
        }
    `;

    render() {
        return html`
            <div class="wrapper">
                <wasm-header class="header"></wasm-header>
                <wasm-sidebar class="sidebar"></wasm-sidebar>
                <div class="content"></div>
            </div>`;
    }
}
export class Ioc {}