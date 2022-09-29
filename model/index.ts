/*
 * @Author: zhujinwang
 * @Date: 2022-09-29 11:23:16
 * @LastEditTime: 2022-09-29 14:54:25
 * @LastEditors: zhujinwang
 * @Description: 类型声明
 * 可以输入预定的版权声明、个性签名、空行等
 */
// 插件参数
export interface IPluginArg{
    // 识别匹配的ID
    name:string
    // 在此追加的文件后缀
    exts:string[]
}
// 插件参数列表
export type TPluginArgs = IPluginArg[]
