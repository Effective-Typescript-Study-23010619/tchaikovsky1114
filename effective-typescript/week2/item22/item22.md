### 타입 좁히기

타입 넓히기의 반대는 타입 좁히기이다.

가장 보편적인 타입 좁히기는 null Check일 것이다.

```ts
const el = document.getElementById('foo'); // HTMLElement | null
  if(el) {
    el.innerHTML = 'Party Time'.blink();
  } else {
    alert('no element')
  }

```
만약 el이 null이라면 분기의 첫번째 블록은 실행하지 않게 되어 작업이 훨씬 수월해진다.
이러한 조건문에서는 타입 좁히기를 잘 실행하지만 타입 별칭이 존재한다면 어려울 수 있다.

이 외에도 `instanceof`를 사용해서 타입을 좁힐 수도 있다.

```ts
function contains(text: string, search: string | RegExp) {
  if(search instanceof RegExp) {
    return !!search.exec(text);
  }
  return text.includes(search);
}
```

속성 체크로도 타입을 좁힐 수 있다.

```ts
interface A { a: number }
interface B { b: number }

function pickAB(ab: a | b) {
  if('a' in ab) {
    // interface A
  }else {
    // interface B
  }
}
```

`Array.isArray`와 같은 일부 내장 함수로도 타입을 좁힐 수 있다.

```ts
function contains(text: string, terms: string | string[]) {
  const termList = Array.isArray(terms) ? terms : [terms];
  // termList : string[]
}
```

다음은 `null`의 `typeof`가 `object`임을 알지 못한 상태에서 타입체크를 실행하는 잘못된 방법이다
```ts
const el = document.getElementById('foo'); // HTMLElement | null
if(typeof el === 'object') {
  // el is HTMLElement | null
}
```

___

타입스크립트가 타입을 식별하지 못할 때 사용하는 커스텀 함수의 도입

```ts

function isInputElement(el: HTMLElement): el is HTMLInputElement {
  return 'value' in el;
}

function getElementContent(el: HTMLElement) {
  if (isInputElement(el)) {
    return el.value;
  }
  return el.textContent;
}

```

이러한 기법을 사용자 정의 타입 가드라고 한다.

반환 타입의 `el is HTMLInputElement`는 함수의 반환이 true인 경우,
타입 체커에게 매개변수의 타입을 좁힐 수 있다고 알려주는 역할을 한다.
nullCheck과 묶은 예제 1을 보며 이해해보자.

___

타입가드를 사용한 배열 / 객체의 타입 좁히기

예를들어 배열에서 탐색을 수행할 때 undefined가 될 수 있는 타입을 사용할 수 있다

```ts
const jackson5 = ['']
```



<T>는 TypeScript에서 제네릭 타입 매개변수를 나타내는 것입니다. 제네릭은 타입을 더 추상적으로 나타내고 재사용 가능한 컴포넌트를 만들 때 유용한 기능입니다.

<T>는 여기서 filterUndefined 함수가 어떤 타입의 값을 처리할 것인지를 일반화하여 나타냅니다. T는 사용자가 함수를 호출할 때 실제 타입으로 대체되는 타입 매개변수입니다. 제네릭을 사용하여 여러 종류의 값을 다룰 수 있는 일반적인 함수를 만들 수 있습니다.

예를 들어, filterUndefined 함수에서 <T>를 사용함으로써 이 함수는 어떤 타입의 값이든 받아들일 수 있고, 해당 값이 undefined인지 아닌지를 체크하는 타입 가드 역할을 수행할 수 있습니다. 이를 통해 여러 타입의 값에 대해 재사용 가능한 타입 검사 로직을 구현할 수 있습니다.