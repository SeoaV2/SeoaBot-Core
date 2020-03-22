# 개발자 및 기여자 참고사항
이 문서는 효율적인 기여 활동을 위해 지켜야 하는 문법적인 사항을 설명하고 있습니다
> 본 문서는 개발자의 편의를 위해 한국어로 작성되어 있습니다

## 목차
- [개발자 및 기여자 참고사항](#%ea%b0%9c%eb%b0%9c%ec%9e%90-%eb%b0%8f-%ea%b8%b0%ec%97%ac%ec%9e%90-%ec%b0%b8%ea%b3%a0%ec%82%ac%ed%95%ad)
  - [목차](#%eb%aa%a9%ec%b0%a8)
  - [코드 스타일](#%ec%bd%94%eb%93%9c-%ec%8a%a4%ed%83%80%ec%9d%bc)
    - [예외](#%ec%98%88%ec%99%b8)
    - [템플릿 문자열](#%ed%85%9c%ed%94%8c%eb%a6%bf-%eb%ac%b8%ec%9e%90%ec%97%b4)
    - [함수 인수](#%ed%95%a8%ec%88%98-%ec%9d%b8%ec%88%98)
    - [사용되지 않은 함수 인수](#%ec%82%ac%ec%9a%a9%eb%90%98%ec%a7%80-%ec%95%8a%ec%9d%80-%ed%95%a8%ec%88%98-%ec%9d%b8%ec%88%98)

## 코드 스타일
본 레포지트리 및 SeoaBot의 모든 서브 레포지트리들은 기본적으로
[Standard.js](https://standardjs.com/)를 준수해야 합니다

### 예외
부득이 Standard.js를 어겨야 하는 상황이 발생할 경우 주석을 통해 이유를 표시하고
eslint의 감지를 피하기 위해 `eslint-disable-next-line`등을 사용해야 합니다

### 템플릿 문자열
가독성을 위한 이유로 템플릿 문자열은 최대한 사용하지 말아야합니다
```js
`${ping}ms` // Not Good
ping + 'ms' // Good!
```

### 함수 인수
함수를 실행하는 곳의 인수와 함수가 선언된 인수의 이름들은 동일해야 합니다

```js
// CommandHandler.js:34
command.run(seoa, msg, args)

// botinfo.js:12
run (seoa, msg, _arg) { // Fine

// ping.js:11
run (seoa, msg) { // Good!
```

### 사용되지 않은 함수 인수
VSCode의 코드 하이라이팅에 따라 사용되지 않은 인수는 인수 앞에 `_`를 표시합니다
단, 적절한 인수 이름이 없거나 별로 신경 쓰지 않아도 되는 경우에는 `_`만을 씁니다

```js
run (seoa, msg, args) { // Not Good
  msg.channel.send('hi')
}

run (_seoa, msg, _args) { // Good!
  msg.channel.send('hi')
}

arr.forEach((_, i) => { // Good!
  console.log(i)
})
```

> 추가중...
