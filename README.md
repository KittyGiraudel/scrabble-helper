# Scrabble Helper

A CLI helper for Scrabble. Available in English, French and German.

## Installation

```sh
npm install scrabble-helper -g
```

## Usage

```sh
# Standard
scrabble-helper --language en  --letters rtnceao

# With fixed length
scrabble-helper --language en  --letters rtnceao  --length 6

# With prefix
scrabble-helper --language en  --letters rtnceao  --prefix po

# With suffix
scrabble-helper --language en  --letters rtnceao  --suffix s

# All in one
scrabble-helper --language en  --letters rtnceao  --length 6  --prefix po  --suffix s
```
