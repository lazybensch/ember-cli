/*jshint multistr: true */

'use strict';

var path    = require('path');
var tmp     = require('tmp-sync');
var expect  = require('chai').expect;
var EOL     = require('os').EOL;
var ember   = require('../../helpers/ember');
var Promise = require('../../../lib/ext/promise');
var remove  = Promise.denodeify(require('fs-extra').remove);
var root    = process.cwd();
var tmproot = path.join(root, 'tmp');
var tmpdir;

describe('Acceptance: ember help destroy', function() {
  beforeEach(function() {
    tmpdir = tmp.in(tmproot);
    process.chdir(tmpdir);
  });

  afterEach(function() {
    process.chdir(root);
    return remove(tmproot);
  });

  it('works', function() {
    return ember([
      'help',
      'destroy'
    ])
    .then(function(result) {
      var output = result.ui.output;

      expect(output).to.include(EOL + '\
ember destroy \u001b[33m<blueprint>\u001b[39m\u001b[36m <options...>\u001b[39m' + EOL + '\
  Destroys code generated by `generate` command.' + EOL + '\
\u001b[90m  aliases: d' + EOL + '\
\u001b[39m\u001b[36m  --dry-run\u001b[39m\u001b[36m (Boolean)\u001b[39m\u001b[36m (Default: false)\u001b[39m\u001b[90m' + EOL + '\
    aliases: -d\u001b[39m' + EOL + '\
\u001b[36m  --verbose\u001b[39m\u001b[36m (Boolean)\u001b[39m\u001b[36m (Default: false)\u001b[39m\u001b[90m' + EOL + '\
    aliases: -v\u001b[39m' + EOL + '\
\u001b[36m  --pod\u001b[39m\u001b[36m (Boolean)\u001b[39m\u001b[36m (Default: false)\u001b[39m\u001b[90m' + EOL + '\
    aliases: -p\u001b[39m' + EOL + '\
\u001b[36m  --in-repo-addon\u001b[39m\u001b[36m (String)\u001b[39m\u001b[36m (Default: null)\u001b[39m\u001b[90m' + EOL + '\
    aliases: -in-repo <value>, -ir <value>\u001b[39m' + EOL + '\
' + EOL + '\
' + EOL + '\
  Run `ember help generate` to view a list of available blueprints.' + EOL);
    });
  });

  it('works with alias d', function() {
    return ember([
      'help',
      'd'
    ])
    .then(function(result) {
      var output = result.ui.output;

      expect(output).to.include('ember destroy \u001b[33m<blueprint>\u001b[39m\u001b[36m <options...>\u001b[39m');
    });
  });
});
