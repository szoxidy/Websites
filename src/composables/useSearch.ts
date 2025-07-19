// 清空搜索输入框
function clearSearchInput(): void {
    const searchInput = document.getElementById("search_input") as HTMLInputElement;
    if (searchInput) {
        searchInput.value = "";
    }
}

// 导航到指定URL并清空输入框
function navigateAndClear(url: string): boolean {
    window.location.href = url;
    clearSearchInput();
    return false;
}

// 主要的搜索功能
export function useSearch(): boolean {
    // 获取输入元素并进行运行时类型检查
    const elementById = document.getElementById("search_input");
    if (!elementById || !(elementById instanceof HTMLInputElement)) {
        return false;
    }

    // 读取并去除首尾空白
    let URL = elementById.value.trim();
    if (!URL) return false;

    // 1. 本地文件路径（Windows 本地文件，如 "C:\path" 或 "C:/path"）
    if (/^[A-Za-z]:[\\\/].*/.test(URL)) {
        return navigateAndClear(`file:///${URL}`);
    }

    // 2. 以协议头或 www. 开头，统一跳到 https
    if (/^(https?:\/\/|www\.)/.test(URL)) {
        URL = URL.replace(/^https?:\/\//, "");
        return navigateAndClear(`https://${URL}`);
    }

    // 3. 带路径的域名（必须包含 "/" 才算路径型 URL）
    if (/^((https?:\/\/)?([\w.-]+))(\/[^"]+)$/.test(URL)) {
        // 如果缺少协议，则加上 https://
        if (!/^https?:\/\//.test(URL)) {
            return navigateAndClear(`https://${URL}`);
        }
    }

    // 4. IPv4 地址（可带端口）
    if (/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)(:\d+)?$/.test(URL)) {
        return navigateAndClear(`https://${URL}`);
    }

    // 5. IPv6 地址（可带端口）
    if (/^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}(:\d+)?$/.test(URL)) {
        return navigateAndClear(`https://${URL}`);
    }

    // 6. 常见顶级域名结尾（.com/.org/.net/.gov/.edu/.top/.tv）
    if (/\.(com|org|net|gov|edu|top|tv)$/.test(URL)) {
        const prefix = /\.[a-zA-Z]{2,}$/.test(URL) ? "" : "www.";
        return navigateAndClear(`https://${prefix}${URL}`);
    }

    // 7. 非 www. 的简单域名（如 example.co）
    if (/^(?!www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(URL)) {
        return navigateAndClear(`https://www.${URL}`);
    }

    // 8. 其它输入，一律交给搜索引擎
    return navigateAndClear(`https://www.bing.com/search?q=${encodeURIComponent(URL)}`);
}