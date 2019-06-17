import { LitElement, html, customElement, css} from 'lit-element';
import bryceCanyon from './images/Bryce-Canyon.jpg';

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

@customElement('wasm-sidebar')
class WasmFilterSidebarComponent extends LitElement {
    render() {
        return html`<div></div>`;
    }
}

@customElement('wasm-content')
class WasmContentComponent extends LitElement {
    render() {
        return html`
            <style>
                .background {
                    height: 100%;
                    width: 100%;
                    background-image: url(${bryceCanyon});
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
                    background-image: url(${bryceCanyon});
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
export class Ioc {}