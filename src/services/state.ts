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

        this.filters.push(new Filter({
            name: 'default',
            vertexSource: `
            attribute vec4 position;   \n
            attribute vec2 texCoord;   \n
            varying vec2 v_texCoord;     \n
            void main()                  \n
            {                            \n
                gl_Position = position; \n
                v_texCoord = texCoord;  \n
            }                            \n
            `,
            fragmentSource: `
                precision mediump float;                            \n
                varying vec2 v_texCoord;                            \n
                uniform sampler2D texture;                        \n
                void main()                                         \n
                {                                                   \n
                gl_FragColor = texture2D( texture, v_texCoord );   \n
                }                                                   \n
            `
        }))

        IocService.ImageProccessor.setMap();

        this.currentImage = new Image();
        // this.currentImage.addEventListener("load", () => IocService.ImageProccessor.updateImage());
        // this.currentImage.src = bryce;
    }
}