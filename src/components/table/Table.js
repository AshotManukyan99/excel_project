import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(100)
    }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            const $resizer = $(event.target)
            // (Bad) when you need to add new elements it will be a problem
            // const $parent = $resizer.$el.parentNode
            // (Bad) using a selector is already bad (may change)
            // const $parent = $resizer.$el.closest()
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()

            document.onmousemove = event => {
                const delta = event.pageX - coords.right
                $parent.$el.style.width = (coords.width + delta) + 'px'
            }

            document.onmouseup =() => {
                document.onmousemove = null
            }

        }
    }
}

