import {notification} from 'antd';
import {getCurrentLocal} from '@/i18n';
import {getLoginUser, toLogin} from './index';

/**
 * 尝试获取错误信息 errorTio > resData.message > error.message > '未知系统错误'
 *
 * @param error
 * @param errorTip
 * @returns {*}
 */
function getErrorTip({error, errorTip}) {
    const ajaxTip = getCurrentLocal()?.ajaxTip || {};

    if (errorTip && errorTip !== true) return errorTip;

    if (error && error.response) {
        // const {status, message} = error.response;
        const {status, data} = error.response;

        if (status === 401 || status===470) { // 需要登录,假定token过期，也需重新登录
            return toLogin();
        }

        // 后端自定义信息
        if (data) return data;

        if (status === 403) {
            return ajaxTip.noAccess;
        }

        if (status === 404) {
            return ajaxTip.notFound;
        }

        if (status === 504) {
            return ajaxTip.serverBusy;
        }

        if (status === 500) {
            return ajaxTip.serverBusy;
        }

    }

    if (error && error.message && error.message.startsWith('timeout of')) return ajaxTip.timeOut;

    if (error) return error.message;

    return ajaxTip.serverBusy;
}

export default function handleError({error, errorTip}) {
    const ajaxTip = getCurrentLocal()?.ajaxTip || {};

    if (errorTip === false) return;
    const description = getErrorTip({error, errorTip});

    notification.error({
        message: ajaxTip.error,
        description:JSON.stringify(description),
    });
}
