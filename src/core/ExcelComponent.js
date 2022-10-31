import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
    }

    //  returns the template of the components
    toHTML() {
        return ''
    }

    init() {
        this.initDomListeners()
    }

}