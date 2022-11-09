import {$} from "@core/dom";

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    // (Bad) when you need to add new elements it will be a problem
    // const $parent = $resizer.$el.parentNode
    // (Bad) using a selector is already bad (may change)
    // const $parent = $resizer.$el.closest()
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    let resizeCount
    const sideProp = type === 'col' ? 'bottom' : 'right'

    $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
    })

    document.onmousemove = event => {
        if (type === 'col') {
            const delta = event.pageX - coords.right
            resizeCount = coords.width + delta
            $resizer.css({right: -delta + 'px'})
        } else {
            const delta = event.pageY - coords.bottom
            resizeCount = coords.height + delta
            $resizer.css({bottom: -delta + 'px'})
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if (type === 'col') {
            $parent.css({width: resizeCount + 'px'})
            $root.findAll(`[data-col="${$parent.data.col}"]`)
                .forEach(el => el.style.width = resizeCount + "px")
        } else {
            $parent.css({height: resizeCount + 'px'})
        }

        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0
        })
    }
}