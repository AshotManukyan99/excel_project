import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.prepare()
    }

    prepare() {
    }

    //  returns the template of the components
    toHTML() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListener()
    }
}