const clickQueue = []
let isClicking = false

const liveChange = () => {
    let targetNode = document.querySelector('.results')
    let observer = new MutationObserver((mutations, observer) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.className === 'row') {
                    let WhisperBtn = node.querySelector('.direct-btn')
                    if (WhisperBtn.disabled === false) {
                        clickQueue.push(WhisperBtn);
                        if (!isClicking) {
                            processClickQueue()
                        }
                    }
                }
            })
        })
    })
    observer.observe(targetNode, { childList: true, subtree: true })
}

function processClickQueue() {
    if (clickQueue.length > 0) {
        isClicking = true
        const btn = clickQueue.shift()
        simulateButtonClickWithDelay(btn, 1000, () => {
            processClickQueue()
        })
    } else {
        isClicking = false
    }
}

function simulateButtonClickWithDelay(element, delay, callback) {
    setTimeout(() => {
        element.click()
        if (callback) {
            callback()
        }
    }, delay)
}

document.querySelector('.menu-about span').textContent = 'Auto Mode'

liveChange()
