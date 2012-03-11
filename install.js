var spawn = require('child_process').spawn,
  exec = require('child_process').exec;

process.stdout.write("================================================================================\n");
process.stdout.write("=                                                                              =\n");
process.stdout.write("=  To install with C++ bson parser do <npm install mongodb --mongodb:native>   =\n");
process.stdout.write("=                                                                              =\n");
process.stdout.write("================================================================================\n");

// Check if we want to build the native code
var build_native = process.env['npm_package_config_native'] != null ? process.env['npm_package_config_native'] : 'false';
build_native = build_native == 'true' ? true : false;

console.log("=====================================================")
console.dir(process.env)

console.log("==================== build_native :: " + build_native)

// If we are building the native bson extension ensure we use gmake if available
if(build_native) {
  // Check if we need to use gmake
  exec('which gmake', function(err, stdout, stderr) {
    // Set up spawn command
    var make = null;
    // No gmake build using make
    if(err != null) {
      console.log("==================== make :: ")
      make = spawn('make', ['-C', process.env['PWD'], 'total'], {cwd:process.env['PWD']});
      console.dir(make)
    } else {
      console.log("==================== gmake :: ")
      make = spawn('gmake', ['-C', process.env['PWD'], 'total'], {cwd:process.env['PWD']});
      console.dir(gmake)
    }

    // Execute spawn
    make.stdout.on('data', function(data) {
      process.stdout.write(data);
    })

    make.stderr.on('data', function(data) {
      process.stdout.write(data);
    })

    make.on('exit', function(code) {
      process.stdout.write('child process exited with code ' + code + "\n");
    })
  });  
}

