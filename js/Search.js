
/**
 *
 * 函数介绍: 能根据用户输入内容自动匹配 IP 地址或域名的智能搜索框
 * @author SZOXIDY
 * @returns {boolean}
 */
function search() {

    // 获取输入元素 同时获取元素值
    const searchInput = document.getElementById("search_input");
    let URL = searchInput.value;

    // 输入内容为非空字符
    if (URL.trim() !== '')
        // 匹配用户输入了协议头
        if (/^(https?:\/\/|www\.).*/.test(URL)) {

            // 如果为http://开头 则删除
            if (/^(http:\/\/)/.test(URL))
                URL = URL.replace(new RegExp('http://', 'g'), '');

            // 如果为https://开头 则删除
            if (/^(https:\/\/)/.test(URL))
                URL = URL.replace(new RegExp('https://', 'g'), '');

            // 统一加载 https://
            window.location.href = "https://" + URL;
            searchInput.value = "";
        }

        // 匹配几种常见的域名
        else if (/\.(com|org|net|gov|edu|top|tv)$/.test(URL)) {
            // 判断用户输入是否包含二级域名 如果不包含则添加www, 包含则不添加

            // 不包含二级域名, 协议头后添加 "www"，然后跳转
            if (!/\.[a-zA-Z]{2,}$/.test(URL)) {
                window.location.href = "https://www." + URL;
                searchInput.value = ""
            } else {
                // 包含二级域名, 添加默认的 "https://", 然后跳转
                window.location.href = "https://" + URL;
                searchInput.value = "";
            }

        }

        // 匹配用户输入了非 www. 开头
        else if (/^(?!www\.)[a-zA-Z0-9-] + \.[a/-zA-Z]{2,}$/.test(URL)) {
            window.location.href = "https://" + URL;
            searchInput.value = "";
        }

        // 匹配用户输入IPV4地址 还需匹配端口号
        else if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:[0-9]+)?$/.test(URL)) {
            window.location.href = "http://" + URL;
            searchInput.value = "";
        }

        // 匹配用户输入IPV6地址 还需匹配端口号
        else if (/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(:[0-9]+)?$/.test(URL)) {
            window.location.href = "http://" + URL;
            searchInput.value = "";
        }

        // 匹配用户输入文件路径
        else if (/^[A-Za-z]:[\\\/].*/.test(URL)) {
            window.location.href = "file:///" + URL;
            searchInput.value = "";

        } else {
            // 跳转到 Google 搜索引擎
            window.location.href = "https://cn.bing.com/search?q=" + URL;
            searchInput.value = "";
        }

    return false;
}


window.onload = () => {

    // 获取当前主题媒体查询
    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");

    // 获取当前文本框光标
    const inputElements = document.querySelectorAll('input[type = "text"], textarea');

    // 获取 box 下 文本颜色
    const textColor = document.getElementsByClassName('url');

    // 获取输入框样式
    const searchInput = document.getElementById('search_input');

    // 获取 bar 样式
    const searchBar = document.getElementsByClassName('search_bar');

    // 获取 Start 按钮样式
    const searchSubmit = document.getElementById('search_submit');

    // 设置主题切换函数
    function toggleTheme(theme) {
        if (Object.is(theme, 'light')) {
            // 切换到白色主题
            document.body.style.backgroundColor = 'white';

            // 设置光标颜色为黑色
            inputElements.forEach(input => {
                input.style.color = 'black';
                input.style.caretColor = 'black';
            })

            // 设置文本文字颜色为白色
            document.body.style.color = 'black';

            // 批量修改 url 文字颜色
            for (let i = 0; i < textColor.length; i++) {
                textColor[i].style.color = 'rgb(0, 0, 0)';
            }

            // 修改 bar 背景颜色和阴影
            for (let j = 0; j < searchBar.length; j++) {
                searchBar[j].style.backgroundColor = 'rgba(255, 255, 255, 100)';
                searchBar[j].style.boxShadow = '0 0 18px rgba(70, 70, 40, .255)'
            }

            // 修改 start 字体颜色和背景颜色
            searchSubmit.style.color = 'rgb(0, 0, 0)';


        } else {
            // 切换到黑色主题
            document.body.style.backgroundColor = 'black';

            // 设置光标颜色为白色
            inputElements.forEach(input => {
                input.style.color = 'white';
                input.style.caretColor = 'white';
            })

            // 设置文本文字颜色为白色
            document.body.style.color = 'white';

            // 批量修改 url 字体颜色
            for (let i = 0; i < textColor.length; i++) {
                textColor[i].style.color = 'rgb(190, 190, 190)';
            }

            // 修改 bar 背景颜色和阴影
            for (let j = 0; j < searchBar.length; j++) {
                searchBar[j].style.backgroundColor = 'rgba(26, 26, 26, 100)';
                searchBar[j].style.boxShadow = '0 0 18px rgba(255, 255, 255, .30)'
            }

            // 修改 start 字体颜色
            searchSubmit.style.color = 'rgb(197, 197, 210)';
        }
    }

    // 初始加载时根据首选颜色模式设置主题
    toggleTheme(themeMedia.matches ? 'light' : 'dark');

    // 监听首选颜色模式的变化
    themeMedia.addEventListener('change', (event) => {
        toggleTheme(event.matches ? 'light' : 'dark');
    });

}
