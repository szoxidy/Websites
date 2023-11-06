setInterval(() => {

    // 指定起始时间
    const startTime = new Date('1/1/00 00:00:00');

    // 获取当前时间
    const currentTime = new Date();

    // month 储存固定月份天数, time 储存 年月日 时分秒
    let month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let time = [0, 0, 0, 0, 0, 0];

    // 计算时间差，单位为毫秒，然后将毫秒转秒
    let second = Math.floor((currentTime - startTime) / 1000);

    // 格式规范化，个位数前面加 0
    const format = function (time) {
        return time > 9 ? time : '0' + time;
    }

    // 计算年份
    if (second >= 365 * 24 * 60 * 60) {
        // 获取当前年份 因为起始时间默认为 2000 年开始，需要加上 2000 才为当前年份
        // startTime 默认为 Sat Jan 01 2000 00:00:00 GMT+0800 (中国标准时间)
        time[0] = Math.floor(second / (365 * 24 * 60 * 60)) + 2000;

        // 判断是否是闰年
        if ((time[0] % 4 === 0 && time[0] % 100 !== 0) || (time[0] % 400 === 0))
            month[2] += 1;

        // Object.is() 方法用于比较两个值是否严格相等
        // 判断二月天数是否是闰年，再将平年和闰年分开计算
        second %= Object.is(month[2], 28) ? (365 * 24 * 60 * 60) : (366 * 24 * 60 * 60);
    }

    // 计算月份和日份
    if (second >= 24 * 60 * 60) {
        // 过去天数
        let lastDay = Math.floor(second / (24 * 60 * 60));

        for (let i = 0; i < month.length - 1;) {
            // 通过减少每月天数来判断月份和剩余天数
            if (lastDay - month[i] >= 0) {
                lastDay -= month[i];
                i++;

            } else {
                // i 为当前月份
                time[1] = i;

                // 当前剩余天数小于或等于 5 天 则加上上一个月天数再减去 5 天, 否则剩余天数直接减去 5 天
                if (lastDay <= 5) {
                    time[1] = i - 1;
                    time[2] = lastDay + month[i - 1] - 5;
                } else {
                    time[2] = lastDay - 5;
                }

                // 提前退出循环 减少不必要的循环次数
                break;
            }
        }

        second %= 24 * 60 * 60;
    }

    // 计算小时
    if (second >= 60 * 60) {
        time[3] = format(Math.floor(second / (60 * 60)));
        second %= 60 * 60;
    }

    // 计算分钟
    if (second >= 60) {
        time[4] = format(Math.floor(second / 60));
        second %= 60;
    }

    // 计算秒数
    if (second >= 0) {
        time[5] = format(second);
    }

    // 统一格式化时间
    const formattedTime = `${time[0]} 年 ${time[1]} 月 ${time[2]} 日 ${time[3]} : ${time[4]} : ${time[5]}`;

    // 覆写挂载标签的内容
    document.getElementById("workBoard").innerHTML = `<span id='currentTime'>${formattedTime}</span>`;
}, 1000);
