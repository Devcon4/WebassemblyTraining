import * as Comlink from 'comlink';
import bryce from '../assets/images/Bryce-Canyon.jpg';
import { IocService } from './ioc';

export class Filter {

    name = '';
    fragmentSource = '';
    vertexSource = '';

    constructor(args) {
        Object.assign(this, args);
    }

    
}

export class State {
    filters = [];
    currentImage;

    public init() {

        this.filters.push(new Filter({
            name: 'Test',
            fragmentSource: 'test',
            vertexSource: 'test-2'
        }));

        IocService.ImageProccessor.setMap();

        this.currentImage = new Image();
        this.currentImage.addEventListener("load", () => IocService.ImageProccessor.updateImage());
        this.currentImage.src = bryce;
    }
}