import { LitElement, html, customElement } from 'lit-element';
@customElement('wasm-header')
class WasmHeaderComponent extends LitElement {
    render() {
        return html`
        <style>
        .blur {
            width: 100%;
            height: 100%;
        }
        
        </style>
        <div class="blur"></div>`;
    }
}
