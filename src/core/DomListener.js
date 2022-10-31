export class DomListener {
    constructor($root, listeners = []) {
        if ($root) {
            throw new Error('No $root provided for DomListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDomListeners() {
        console.log('listeners', this.listeners)
    }

    removeDomListener() {

    }
}