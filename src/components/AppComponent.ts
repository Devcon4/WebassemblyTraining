
import './WasmHeaderComponent';
import './WasmContentComponent';
import { customElement, LitElement, css } from 'lit-element';
import { html } from 'lit-html';

@customElement('wasm-app')
class AppComponent extends LitElement {
    static styles = css`
        
    `;
    render() {
        return html`
            <style>
            .wrapper {
                display: grid;
                grid-template-columns: 1fr;
                grid-template-rows: 75px 1fr;
                height: 100%;

            }

            .header {

                grid-row: 1;
                grid-column: 1 / 3;
                z-index: 1000;
                filter: drop-shadow(3px 0px 6px gray);

                opacity: 0.3;
                background-color: black;
            }

            .content {
                z-index: 100;
                grid-row: 1 / 3;
                grid-column: 1;

            }
            </style>
            <div class="wrapper">
                <wasm-header class="header"></wasm-header>
                <wasm-content class="content"></wasm-content>
            </div>`;
    }
}
