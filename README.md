[![Build Status](https://travis-ci.org/rsolomo/hpipe.svg?branch=master)](https://travis-ci.org/rsolomo/hpipe)

# hpipe

hpipe is a utility to pipe stdin to a web interface.

## Installation

`npm install -g hpipe`

## Usage

The simplest way to try it out is to do this:

- run the `hpipe` command
- browse to http://localhost:8000
- type some text at the prompt, and watch it show up on your browser

You can also pipe streams to it.  
Example: `tail -f example.log | hpipe`
