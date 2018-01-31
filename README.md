# sonophage [<img src="https://github.com/chevalvert.png?size=100" align="right">](http://chevalvert.fr/)

<br>

## Installation

<pre>
$ git clone https://github.com/chevalvert/sonophage.git sonophage
$ cd sonophage
$ <a href="https://yarnpkg.com/en/docs/install">yarn</a> install
$ yarn link
</pre>

## Usage

```
sonophage

Usage:
  sonophage
  sonophage --log-level=debug
  sonophage --log=<path>
  sonophage --help
  sonophage --version

Options:
  -h, --help              Show this screen.
  -v, --version           Print the current version.
  --log=<path>            Pipe stdout to the specified log file.
  --log-level=<level>     Set the log level (default is 'info').

Log level:
  0, emergency            System is unusable.
  1, alert                Action must be taken immediately.
  2, critical             The system is in critical condition.
  3, error                Error condition.
  4, warning              Warning condition.
  5, notice               A normal but significant condition.
  6, info                 A purely informational message.
  7, debug                Messages to debug an application.

```

## Configuration 
See [docs/configuration.md](docs/configuration.md)

## License
[MIT.](https://tldrlegal.com/license/mit-license)
