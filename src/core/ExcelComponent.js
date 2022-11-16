import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners);
        this.name = options.name || ''
        this.emitter = options.emitter
        this.unsubscribers = []
        this.prepare()
    }

    prepare() {
    }

    //  returns the template of the components
    toHTML() {
        return ''
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListener()
        this.unsubscribers.forEach(unsub => unsub())
    }
}