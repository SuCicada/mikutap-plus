$(function () {
    // 延迟音符的随机数范围
    randomTime = {
        max: 200,
        min: 100
    }
    MIKU_CONFIG.AUTO_PLAY = false
    console.log(MIKU)
    MIKU.customUpdate = function () {
        // mikumiku()
    }

    function mikumiku() {
        n = Math.floor(Math.random() * 32)
        // console.log(n)
        // 模拟按下操作
        MIKU.k.r(n)
        // 模拟抬起操作, 只有完整的按下和抬起操作进行之后, 才能继续发音
        MIKU.k.r(-1)
    }

    time = 1000

    function nextTime() {
        let {max, min} = randomTime
        time = Math.floor(Math.random() * (max + min) - min)
    }

    function wait(ms) {
        return new Promise(resolve =>
            setTimeout(resolve,
                ms)
        )
    }

    // 异步调用开始
    const initMiku = async () => {
        console.log("始まりましょう。")
        while (1) {
            await wait(time)
            nextTime()
            if (MIKU_CONFIG.AUTO_PLAY && MIKU_CONFIG.BACK_PLAY) {
                mikumiku()
            }
            MIKU_CONFIG.BACK_PLAY = false;
        }
    }

    $("#bt_start a").each(function () {
        // https://stackoverflow.com/questions/7752512/jquery-get-reference-to-click-event-and-trigger-it-later/14150317
        // get all our click events and store them
        var x = $._data($(this)[0], "events");
        var y = {}
        for (i in x.click) {
            if (x.click[i].handler) {
                y[i] = x.click[i].handler;
            }
        }
        console.log(y)

        // stop our click event from running
        $(this).off("click")

        // re-add our click event with a confirmation
        $(this).click(function (a) {
            // if they click yes, run click events!
            for (i in y) {
                y[i](a)
            }
            initMiku()
            return true;
            // if they click cancel, return false
        })
    })

    $(window).on("keydown", (k) => {
        if (k.keyCode === 32) {
            MIKU.bt_autoplay()
            console.log("auto play stop")
        }
    })
});
