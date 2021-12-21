import { buildFile } from './buildFile';
import { copyFile } from './copyFile';

/**
 * rollupPluginCopeFiles 插件逻辑
 * @param {Object} params
 * @param {Array} params.build 处理 vite 构建后，需要先打包，再复制的文件 src: 文件路径，target: 复制的目标路径，name: 生成的文件名
 * @param {Array} params.copy 【目前只支持单文件】处理 vite 构建后，再复制的文件 src: 文件路径，target: 复制的目标路径，name: 生成的文件名
 * TODO：增加目录拷贝，创建深层文件
 * @returns 
 */
export default function rollupPluginCopeFiles(params: any) {
    return {
        name: 'rollup-plugin-copy-files',
        // 所有钩子，查看文档  https://rollupjs.org/guide/en/#output-generation-hooks
        closeBundle() {
            const { build = [], copy = [] } = params
            if (build.length > 0) {
                buildFile(build);
            }
            if (copy.length > 0) {
                copyFile(copy);
            }
        }
    }
}
