import {ExcelComponent} from "@core/ExcelComponent";

export class Table  extends ExcelComponent   {
    static className = 'excel__table'

    toHTML() {
        return `
                 <div class="row">
        <div class="row-info">

        </div>

        <div class="row-data">
          <div class="columns">
            A
          </div>
          <div class="columns">
            B
          </div>
          <div class="columns">
            C
          </div>
        </div>

      </div>
       <div class="row">
        <div class="row-info">
          1
        </div>

        <div class="row-data">
          <div class="cell  selected" contenteditable>
            A1
          </div>
          <div class="cell" contenteditable>
            B2
          </div>
          <div class="cell" contenteditable>
            C3
          </div>
        </div>

      </div>
        <div class="row">
        <div class="row-info">
          2
        </div>

        <div class="row-data">
          <div class="cell  selected" contenteditable>
            A1
          </div>
          <div class="cell" contenteditable>
            B2
          </div>
          <div class="cell" contenteditable>
            C3
          </div>
        </div>

      </div>
        `
    }

}