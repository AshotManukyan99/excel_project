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

            const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)

            document.onmousemove = event => {
                const delta = event.pageX - coords.right
                const resizeCount = coords.width + delta
                $parent.$el.style.width = resizeCount + 'px'
                cells.forEach(el => el.style.width = resizeCount + "px")
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }

        }
    }
}

