(function () {
    let verticalSpotCount = 2,
        horizontalSpotCount = 2,
        followDistance = 100,
        lastMousePageX = null,
        lastMousePageY = null

    /**
     * 生成点阵随机排列数组
     */
    let genSpotDistanceArr = () => {
        let clientWidth = document.body.clientWidth,
            clientHeight = document.body.clientHeight,
            horizontalRndFactor = Math.random(),
            verticalRndFactor = Math.random()

        let distanceArr = []

        for (let i = 0; i < horizontalSpotCount; i++) {
            distanceArr[i] = []
            for (let j = 0; j < verticalSpotCount; j++) {
                let left = (clientWidth / horizontalSpotCount) * (horizontalRndFactor / 5 + i),
                    top = (clientHeight / verticalSpotCount) * (horizontalRndFactor / 5 + j)

                distanceArr[i][j] = { left, top }
            }
        }

        return distanceArr
    }

    /**
     * 绑定load事件
     */
    window.onload = function () {
        const spotCircle = 2
        window.spotArr = []
        let distanceArr = genSpotDistanceArr(),
            theRoot = document.getElementById('root')

        theRoot.onmousemove = onMouseOver

        for (let i = 0; i < horizontalSpotCount; i++) {
            window.spotArr[i] = []
            for (let j = 0; j < verticalSpotCount; j++) {
                let span = document.createElement('span')
                window.spotArr[i][j] = span

                span.style.position = 'absolute'
                span.style.left = distanceArr[i][j].left
                span.style.top = distanceArr[i][j].top

                span.className = 'spot'

                theRoot.appendChild(span)
            }
        }
    }

    let count = 0
    function onMouseOver(ev) {
        if (!window.spotArr) {
            return
        }

        let { pageX, pageY } = ev
        if (lastMousePageX && lastMousePageY && (Math.abs(pageX - lastMousePageX) < 3 || Math.abs(pageY - lastMousePageY) < 3)) {
            return
        }

        console.log(`count:${count++}`)

        let now = new Date().getMilliseconds() % 16

        for (let i = 0; i < horizontalSpotCount; i++) {
            for (let j = 0; j < verticalSpotCount; j++) {
                let spot = window.spotArr[i][j],
                    spotLeft = +spot.style.left.replace(/px/, ''),
                    spotTop = +spot.style.top.replace(/px/, ''),
                    distanceLeft = pageX - spotLeft,
                    distnaceTop = pageY - spotTop,
                    spotToCursorAngle = Math.tan(distnaceTop / distanceLeft)

                if (Math.abs(distanceLeft) < followDistance && Math.abs(distnaceTop) < followDistance) {
                    spot.style.backgroundColor = `${(i % 16).toString(16)}${now.toString(16)}${(j % 16).toString(16)}`
                    spot.style.left = Math.max(0, spotLeft - 50 / Math.sqrt(distnaceTop))
                    spot.style.top = Math.max(0, spotTop - 50 / Math.sqrt(distanceLeft))
                }
            }
        }
    }
})()