/* 首字母大写 */
export const capitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase())

/**
 * 生成下拉数据
 * @param labelProp String
 * @param valueProp String
 * @returns Object 下拉数据
 */
export const generatedOptions = (
  labelProp = 'label',
  valueProp = 'value'
) => originSource => {
  return Object.keys(originSource).map(key => ({
    [labelProp]: key,
    [valueProp]: originSource[key]
  }))
}

/**
 * 魔法值，神仙数字 映射成 人类能识别的字符串：）
 * @param key 需要映射的魔法值
 */
export const mappingValue = key => (source, mappingProp = 'label') => {
  const map = source.reduce((map, sourceTarget) => {
    map[sourceTarget.value] = sourceTarget[mappingProp]
    return map
  }, {})
  return map[key]
}

// 去除前后空格
export const trim = str => {
  if (Object.prototype.toString.call(str) === '[object String]') {
    return str.trim()
  }
  return str
}

// 是否为对象
export const isObject = value => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

// 是否为数组
export const isArray = value => {
  const _isArray =
    Array.isArray ||
    (_arg => Object.prototype.toString.call(_arg) === '[object Array]')
  return _isArray(value)
}

// 是否为空
export const isEmpty = value => {
  if (value === null || value === undefined || value === '') return true
  if (isObject(value)) return Object.keys(value).length === 0
  if (isArray(value)) return value.length === 0

  return false
}

// 是否为字符串
export const isString = value => {
  return Object.prototype.toString.call(value) === '[object String]'
}

// 下载指定文件
export const downloadFilesUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// 字符串省略号处理
export const textFlow = (value, len) => {
  len = len || 8
  value = value || ''
  let str = value + ''
  if (str.length > len) str = str.substr(0, len) + '...'
  return str
}

export default {
  capitalizeEveryWord,
  generatedOptions,
  mappingValue,
  trim,
  isObject,
  isArray,
  isEmpty,
  isString,
  downloadFilesUrl,
  textFlow
}
