# Node.sh

Launch a nodejs process (downloading node if needed) on most systems which support bash-like shell.

This shell script will download nodejs if it is needed and then launch a nodejs script from the
shell. It is excellent for situations where you need to script a build or similar system but you
want to be cross-platform and so you want to avoid disasters such as make or raw shell scripting.

This script does the work of getting nodejs on the system (whatever it may be) and then launches
your javascript code.

## To use

Just embed the file node.sh into your own project and call it from a minimal shell script then
you can implement all of your business logic in nodejs.

### Examples:

No restrictions on version, in this case it is using the nodejs on the system:
```bash-like
$ MAINJS=./main.js ./node.sh
hello world this version of nodejs is v6.5.0
```

Require version 7.0 or greater, if a version needs to be downloaded then download v7.1.0
```bash-like
$ DLVER=v7.1.0 MINVER=7.0.0 MAINJS=./main.js ./node.sh
You have a version of node [node] but it is too old [v6.5.0]
### Installing node.js (you can bypass this step by manually installing node.js 7.0.0 or newer)


==> Downloading http://nodejs.org/dist/v7.1.0/node-v7.1.0-darwin-x64.tar.gz with wget... DONE!
==> Verifying the checksum of the downloaded archive... DONE!
==> Extracting the downloaded archive... DONE!

hello world this version of nodejs is v7.1.0
```

All of the possible options:

```bash-like
$ ./node.sh
node.sh Run a particular script using nodejs which is downloaded if needed
Usage: MAINJS='./main.js' ./node.sh

Arguments will be passed on to the nodejs script like this:
MAINJS='./script_which_takes_one_argument.js' ./node.sh arg1

All parameters are passed to the script via env variables

Required parameters:
MAINJS      The path to the javascript file to execute using nodejs

Optional parameters:
MINVER      Minimum nodejs version to accept if on system (default: v4.6.2)
DLVER       Version of nodejs to download if no good version is present (default: v6.9.1)
NODEDIR     The directory to use for installing nodejs if needed (default: node_darwin, created if nonexistant)

Overrides: (for overriding default detection)PLATFORM    The name of the system in lowercase (e.g. linux darwin freebsd)
MARCH       The architecture of the processor (e.g. x86 x86_64 armv7l)
SED_PATH    The path to a working sed sed implementation
TR_PATH     The path to a working tr implementation
UNAME_PATH  The path to a working uname implementation
```
