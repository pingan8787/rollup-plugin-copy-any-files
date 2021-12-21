import rollupPluginCopyFiles from '../src/index';

const targets = {
    copy: [
        { src: './test/source/', target: './test/target/' },
    ]
}

rollupPluginCopyFiles(targets);