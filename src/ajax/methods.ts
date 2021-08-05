
export function getParamByName(name, url) {
    const match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' ').replace('#', ''));
}

export function getCookie(name) {
    let value = undefined;
    let arr, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
       value = unescape(arr[2]);
    }
    return value;
}

export function getAttributeFromCookie(name, attribute) {
    let value = undefined;
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        value = unescape(arr[2]);
    }

    return value ? [function () {
        try {
            JSON.parse(value)[attribute];
            return true;
        } catch (e) {
            return false;
        }
    }()] ? JSON.parse(value)[attribute] : "" : "";
}

