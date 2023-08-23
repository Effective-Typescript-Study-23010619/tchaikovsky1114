

// 예제 1.
const mixed = ['x', 1]; // type: (string | number)[]

// 예제 2.
const v = {
  x: 1,
}
v.x = 3;
v.x = '3'; // 'string' 형식은 'number' 형식에 할당할 수 없습니다.
v.y = 4; // { x: number} 형식에 'y' 속성이 없습니다.
v.name = 'Pythagoras'; // { x: number} 형식에 'name' 속성이 없습니다.


// 예제 3.
let k = 1; // type: number


// 예제 4.

const v1 = {
  x: 1,
  y: 2,
} // 타입은 {x: number, y: number}

const v2 = {
  x: 1 as const,
  y: 2,
} // 타입은 {x: 1, y: number}

const v3 = {
  x: 1,
  y: 2
} as const; // 타입은 {readonly x: 1, readonly y: 2}

___

const [toggle, setToggle] = useState(false as const);

const onToggle = () => {
  setToggle(prev => !prev); // 'true' 형식은 'false' 형식에 할당할 수 없습니다.
}
