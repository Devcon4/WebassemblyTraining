import * as Comlink from 'comlink';
import { IocService } from './ioc';
import { Filter } from './state';

export class ImageProccessor {

    offscreenMap: Map<OffscreenCanvas, Filter> = new Map();

    constructor() {}

    setMap() {
        console.log('set map!');
        console.log(IocService.State.filters[0]);
        for(let f of IocService.State.filters) {
            this.createOffscreenCanvas(f);
        }
    }

    createOffscreenCanvas(filter: Filter) {
        const offscreen = new OffscreenCanvas(1080, 1080);
        this.offscreenMap.set(offscreen, filter);
    }

    updateImage() {
        console.log('proccess!');
        console.log(IocService.State);
        for(let [k, v] of this.offscreenMap.entries()) {
            let gl = k.getContext('2d') as unknown as CanvasRenderingContext2D;
            gl.drawImage(IocService.State.currentImage, 0, 0);
            
        }
    }
}