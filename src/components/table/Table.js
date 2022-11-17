import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "@/components/table/table.function";
import {TableSelection} from "@/components/table/TableSelection";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
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
        this.selectCell($cell)

        this.$on('formulaChangeText', text => {
            this.selection.current.text(text)
        })

        this.$on('formulaDone', () => {
            this.selection.current.focus()
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }


    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
            return null
        }

        if (isCell(event)) {
            const $target = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectedGroup($cells)
            } else {
                this.selection.select($target)
                return null
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowRight',
            'ArrowLeft',
            'ArrowDown',
            'ArrowUp',
        ]

        if (keys.includes(event.key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(event.key, id))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}


