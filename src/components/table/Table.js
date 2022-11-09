import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, shouldResize} from "@/components/table/table.function";
import {TableSelection} from "@/components/table/TableSelection";

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

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init();
        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }

        if (isCell(event)) {
            this.selection.select($(event.target))
        }
    }
}

