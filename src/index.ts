import { Plugin } from 'rollup'
import { copyFileHandle } from './copyFile';

export interface CopyOptions {
    src: string,
    target: string,
    name?: string
}

export interface BuildOptions {
    src: string,
    target: string,
    name?: string,
}

export interface Options {
    copy?: CopyOptions[],
    build?: BuildOptions[],
}

/**
 * rollupPluginCopeFiles 插件逻辑
 * @param {Object} params
 * @param {Array} params.build 处理 vite 构建后，需要先打包，再复制的文件 src: 文件路径，target: 复制的目标路径，name: 生成的文件名
 * @param {Array} params.copy 【目前只支持单文件】处理 vite 构建后，再复制的文件 src: 文件路径，target: 复制的目标路径，name: 生成的文件名
 * TODO：增加构建处理
 * @returns 
 */
export default function rollupPluginCopeAnyFiles(params: Options): Plugin {
    return {
        name: 'rollup-plugin-copy-any-files',
        // 所有钩子，查看文档  https://rollupjs.org/guide/en/#output-generation-hooks
        buildEnd() {
            const { copy = [] } = params
            if (copy.length > 0) {
                copyFileHandle(copy);
            }
        }
    }
}

module.exports = rollupPluginCopeAnyFiles;