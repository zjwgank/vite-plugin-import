/*
 * @Author: zhujinwang
 * @Date: 2022-09-29 10:43:40
 * @LastEditTime: 2022-09-29 15:00:08
 * @LastEditors: zhujinwang
 * @Description: 插件入口
 * 可以输入预定的版权声明、个性签名、空行等
 */
import type { PluginOption } from 'vite'
import { parse as parseImports } from "es-module-lexer";
import MagicString from "magic-string";
import path from 'path'
import fs from 'fs'
import { isRegExp } from 'lodash'

import { TPluginArgs } from "@model"


export default function (args?: TPluginArgs): PluginOption {
    return {
        // 插件名称
        name: "vite-plugin-import",
        // 插件执行时机
        enforce: "pre",
        // 指定插件的运行场景
        // apply:"build",
        // 解析vite配置前调用，获取用户配置和环境变量
        // config(usrConfig, env) {
        //     console.log(usrConfig, '----config')
        //     console.log(env, '----config')
        // },
        // 读取解析后的vite配置
        // configResolved(config) {
        //     console.log(config, '-----------configResolved')
        // },
        // 代码转化
        transform(code: string, file: string) {
            if (args && args.length) {
                for (let { name, exts } of args) {
                    const reg = isRegExp(name) || new RegExp(name, "g")
                    // 匹配成功
                    if (reg.test(file)) {
                        const imports = parseImports(code)[0];
                        let s;
                        const str = () => s || (s = new MagicString(code));
                        for (let i = 0; i < imports.length; i++) {
                            const { se, n = '' } = imports[i];
                            const dirname = path.dirname(file)
                            const importPath = path.resolve(dirname, n)
                            if (fs.existsSync(importPath)) {
                                continue
                            } else {
                                for (let ext of exts) {
                                    const curPath = path.resolve(dirname, n + ext)
                                    if (fs.existsSync(curPath)) {
                                        str().prependRight(se - 1, ext)
                                        break
                                    }
                                }
                            }
                        }
                        if (s) {
                            return str().toString()
                        } else {
                            return code
                        }
                    }

                }
            }
        }
    }
}