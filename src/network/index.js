import Axios from "axios"

Axios.defaults.baseURL = 'http://127.0.0.1:5000'

/**
 * 预测数据
 * @param {number[]} datas 是预测数据数组
 * @returns 返回预测y_predict
 */
export async function predictData (datas) {
    const data = await Axios({
        url: '/predict',
        method: 'post',
        data: {
            datas
        }
    })
    return data.data
}

/**
 * 返回训练数据结果
 * @param {number} train 主动学习标注次数
 * @returns 返回训练结果(是一个json对象)
 */
export async function trainData (train) {
    const data = await Axios({
        url: '/train',
        method: 'get',
        params: {
            train
        }
    })
    return data.data
}

/**
 * 添加训练数据
 * @param {number[]} datas 是x数据
 * @param {number[]} datas 是y数据
 * @returns 返回ok
 */
export async function addData (datas, y) {
    const data = await Axios({
        url: '/add',
        method: 'post',
        data: {
            x: datas,
            y
        }
    })
    return data.data
}

// 0.2852	0.2223	0.1549	0.1699	0.1121	0.0256	0.0175	3
// 0.7416	0.0300	0.0140	0.0120	0.0146	0.0130	0.0109	1