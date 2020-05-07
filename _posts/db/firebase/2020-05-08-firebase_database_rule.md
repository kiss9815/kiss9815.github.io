
# firebase database rule

firebase 를 쓰면 realtime database 에서 rules 의 권한을 지정해야 한다.

``` json
// No Security

{
  "rules": {
    ".read": true,
    ".write": true
  }
}

// Full security

{
  "rules": {
    ".read": false,
    ".write": false
  }
}

// Only authenticated users can access/write data

{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

```

참고문헌
> https://gist.github.com/codediodeio/6dbce1305b9556c2136492522e2100f6 [rules 샘플]