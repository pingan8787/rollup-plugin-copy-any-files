import rollupPluginCopyFiles from '../src/index';

const targets = {
    copy: [
        { src: './test/source/', target: './test/target/' },
    ]
}

const plugin = rollupPluginCopyFiles(targets);

plugin.closeBundle();