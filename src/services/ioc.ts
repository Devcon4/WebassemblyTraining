import { ImageProccessor } from './image-proccessor';
import { State } from './state';

export class IocService {
    static State = new State();
    static ImageProccessor = new ImageProccessor();

    constructor() {
        IocService.State.init();
    }
}
