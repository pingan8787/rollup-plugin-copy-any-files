import fs from 'fs';
import path from 'path';
import { isExist } from './utils';

/**
 * 复制文件操作
 * @param {String} source.src 源文件路径
 * @param {String} source.target 保存的目标路径
 * @param {String} source.name 保存的文件名
 */
export const copyFile = async (source = []) => {
    source.forEach(async file => {
        const { src, name, target = './dist/' } = file;
        const fileStat = await fs.statSync(src);
        const isFile = await fileStat.isFile();
        const isDir = await fileStat.isDirectory();
        await isExist(target);
        if (isFile) {
            // 如果是文件，直接执行拷贝操作
            await fs.copyFileSync(src, target + name);
        } else if (isDir) {
            // 如果是文件夹，直接执行拷贝操作
            const sourceFile = await fs.readdirSync(src, { withFileTypes: true });

            sourceFile.forEach(async item => {
                const newSourcePath = path.resolve(src, item.name);
                const newTargetPath = path.resolve(target, item.name);
                if (item.isDirectory()) {
                    isExist(newTargetPath);
                }
                await fs.copyFileSync(newSourcePath, newTargetPath);
            })
        }
    })
}