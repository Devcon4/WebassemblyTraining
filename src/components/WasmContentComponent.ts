import { LitElement, html, customElement } from 'lit-element';

@customElement('wasm-content')
class WasmContentComponent extends LitElement {
    render() {
        return html`
            <style>
                .background {
                    height: 100%;
                    width: 100%;
                    background-repeat: no-repeat;
                    background-size: cover;
                    transform: scale(1.2);

                    filter: brightness(.7) blur(6px);
                }

                .main {
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                }

                .content {
                    height: 100%;
                    width: calc(100% - 100px);
                    position: absolute;
                    top: 0;
                    left: 100px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .main-image {
                    width: 50%;
                    height: 50%;
                    filter: drop-shadow(0px 4px 20px black);
                    background-repeat: no-repeat;
                    background-size: contain;
                    background-position: center;
                }
            </style>
            <div class="main">
                <div class="background"></div>
                <div class="content">
                    <div class="main-image"></div>
                </div>
            </div>
        `;
    }
}
