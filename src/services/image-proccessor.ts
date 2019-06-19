import { IocService } from './ioc';
import { Filter } from './state';

export class ImageProccessor {
    module;

    constructor() {
        this.setupWasm();
    }

    wasmLoaded() {
        console.log('loaded!');
        console.log(this.module);
    }

    async setupWasm(){
        console.log('setup!');
        const imports = {};
        //@ts-ignore
        const module = await WebAssembly.instantiateStreaming(fetch('./a.out.wasm'), imports);
        console.log(module);
        // this.wasmLoaded();
    }

    setMap() {
        for(let f of IocService.State.filters) {
        }
    }

    genFilterForImage(imageUrl: string) {
        const img = new Image();
        img.addEventListener('load', ev => {
            
        });
        img.src = imageUrl;
    }

    async passToWebassembly() {
    }
}