import * as Comlink from 'comlink';

import './services/ioc';
import './services/image-proccessor';
import './services/state';
import './components/AppComponent';
import { IocService } from './services/ioc';



const ioc = new IocService();