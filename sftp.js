const { deploy } = require('sftp-sync-deploy');
const core = require('@actions/core');
const github = require('@actions/github');

console.log(core.getInput('dryRun'));

let config = {
  host: core.getInput('host'), // Required.
  port: core.getInput('port'), // Optional, Default to 22.
  username: core.getInput('username'), // Required.
  password: core.getInput('password'), // Optional.
  localDir: core.getInput('localDir'), // Required, Absolute or relative to cwd.
  remoteDir: core.getInput('remoteDir') // Required, Absolute path only.
};

let options = {
  dryRun: JSON.parse(core.getInput('dryRun')), // Enable dry-run mode. Default to false
  excludeMode: core.getInput('excludeMode'), // Behavior for excluded files ('remove' or 'ignore'), Default to 'remove'.
  exclude: [                      // exclude patterns (glob)
    'node_modules',
    '.env.*',
    '.git',
    '.git',
    'src'
  ],
  forceUpload: false // Force uploading all files, Default to false(upload only newer files).
};

deploy(config, options)
  .then(() => {
    console.log('sftp upload success!');
  })
  .catch(err => {
    console.error('sftp upload error! ', err);
    core.setFailed(err.message)
  });
