// import { buildSync } from 'esbuild';
import rollup from 'rollup';
import rollupTypescript from '@rollup/plugin-typescript';

/**
 * 使用 rollup 打包文件
 * 数据格式：
 * {src: './src/script/background.ts', target: './dist/', name: 'background.js'},
 * @param {Object} source 源文件
 * @param {String} source.src 源文件路径
 * @param {String} source.target 构建后保存的目标路径
 * @param {String} source.name 构建后保存的文件名
 */
export const buildFile = async (source = []) => {
    source.map(async file => {
        const { src, name, target = './dist/' } = file;
        const bundle = await rollup.rollup({
          input: src,
          plugins: [rollupTypescript()]
        });
      
        await bundle.write({
          file:  target + name,
          format: 'umd',
          name: 'library',
          sourcemap: true
        });
        // const res = await buildSync({
        //     entryPoints: [src],
        //     // 启动sourcemap
        //     sourcemap: false,
        //     // 打包
        //     bundle: true,
        //     // 输出的目录
        //     outfile: target + name,
        // })
    })
}