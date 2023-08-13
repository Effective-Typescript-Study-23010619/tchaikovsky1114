
// 예시 2. 구조적 타이핑의 문제점

enum Days { Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday }

interface User {
  name: string;
  age: number;
}

interface Volunteer extends User {
  gender: string;
  availableDay: Partial<Days>[];
}

interface Expert extends User {
  occupation: string;
}

type Part = Volunteer | Expert;

type VolunteerTeam<T extends User> = T[];

// User 타입을 만족하는 것을 기본 전제로 제네릭 타입까지 만족해야 한다.
const GoodNeighbor: VolunteerTeam<Part> = [
  // 한가지 조건에 만족하면 되는 구조적 타이핑의 문제로 인해 허용된다.
  { 
    name: '김명성',
    age: 34,
    gender: '남자',
    availableDay: [Days.Friday, Days.Saturday, Days.Sunday],
    occupation: '구호활동가',
  },
  // 한가지 조건에 만족하면 되는 구조적 타이핑의 문제로 인해 허용된다.
  {
    name: '최경민',
    age: 28,
    gender: '남자',
    occupation: '의사',
  },
  {
    name: '이경택',
    age: 27,
    gender: '남자', 
    availableDay: [Days.Monday],
  },
  {
    name: '장경찬',
    age: 27,
    occupation: '과학자',
  },
]

GoodNeighbor.forEach((volunteer) => {
  // Type Error => 'Volunteer | Expert' 형식에 'occupation' 속성이 없습니다. 'Volunteer' 형식에 'occupation' 속성이 없습니다.
  console.log(volunteer.occupation); 
})

// 누락된 속성은 실제 사용되지 않을 경우에는 에러가 발생하지 않지만, 사용하려 할 때 에러가 발생한다.
// 구조적 타이핑이 갖는 문제를 해결하기 위한 방법

// 1. 객체 내부에 type 속성을 추가하여 타입을 구분하는 방법

interface Volunteer2 extends User {
  type: 'volunteer';  
  gender: string;
  availableDay: Partial<Days>[];
}
interface Expert2 extends User {
  type: 'expert';
  occupation: string;
}

type Part2 = Volunteer2 | Expert2;
type PartType = Part2['type'];

const GoodNeighbor2: VolunteerTeam<Part2> = [
  
  // 'type' 속성이 '{...아래 객체}' 형식에 없지만 'Volunteer2' 형식에서 필수입니다.ts(2322)
  { 
    
    name: '김명성',
    age: 34,
    gender: '남자',
    availableDay: [Days.Friday, Days.Saturday, Days.Sunday],
    occupation: '구호활동가',
  },
  //'type' 속성이 '{ ...아래 객체 }' 형식에 없지만 'Expert2' 형식에서 필수입니다.ts(2322)
  {
    name: '최경민',
    age: 28,
    gender: '남자',
    occupation: '의사',
  },
  {
    name: '이경택',
    age: 27,
    gender: '남자', 
    availableDay: [Days.Monday],
  },
  {
    name: '장경찬',
    age: 27,
    occupation: '과학자',
  },
]

// 2. 타입 가드 옵셔널과 never 사용하기
// 타입 가드는 타입을 좁히는 역할을 한다.

interface Volunteer3 extends User {
  
  gender: string;
  availableDay: Partial<Days>[];
  occupation?: never; // Prevent Expert type
}

interface Expert3 extends User {
  
  occupation: string;
  gender?: never;  // Prevent Volunteer type
  availableDay?: never; // Prevent Volunteer type
}

type Part3 = Volunteer3 | Expert3;
const GoodNeighbor3: VolunteerTeam<Part3> = [
  
  // 'string' 형식은 'undefined' 형식에 할당할 수 없습니다.ts(2322)
  { 
    
    name: '김명성',
    age: 34,
    gender: '남자',
    availableDay: [Days.Friday, Days.Saturday, Days.Sunday],
    occupation: '구호활동가',
  },
  // 'string' 형식은 'undefined' 형식에 할당할 수 없습니다.ts(2322)
  {
    name: '최경민',
    age: 28,
    gender: '남자',
    occupation: '의사',
  },
  {
    name: '이경택',
    age: 27,
    gender: '남자', 
    availableDay: [Days.Monday],
  },
  {
    name: '장경찬',
    age: 27,
    occupation: '과학자',
  },
]

// Omit은 문제를 해결하지 못한다



interface Volunteer4 extends User {
  gender: string;
  availableDay: Partial<Days>[];
}

interface Expert4 extends User {
  occupation: string;
}

type Volunteer5 = Omit<Volunteer4, "occupation">;
type Expert5 = Omit<Expert4, "gender" | "availableDay">;
type Part4 = Volunteer5 | Expert5;

const whatismytype4: Part4 = {
  name: '김명성',
  age: 34,
  gender: '남자',
  availableDay: [Days.Friday, Days.Saturday, Days.Sunday],
  occupation: '의사'
}
// 'Volunteer5' 형식에 'occupation' 속성이 없습니다.
console.log(whatismytype4.occupation)





// VolunteerTeam에 extends User를 사용하지 않는다면?;

interface Villain {
  what: string;
}

type VolunteerTeam6<T> = T[];

const GoodNeighbor4: VolunteerTeam6<Volunteer | Expert | Villain> = [
  { 
    name: '김명성',
    age: 34,
    gender: '남자',
    availableDay: [Days.Friday, Days.Saturday, Days.Sunday],
    occupation: '구호활동가',
  },
  {
    name: '최경민',
    what: 'so what?'
  },
  {
    name: '이경택',
    age: 27,
    gender: '남자', 
    availableDay: [Days.Monday],
  },
  {
    name: '장경찬',
    age: 27,
    gender: '남자',
    availableDay: [Days.Friday],
  },
]

// extends User를 사용할 때에는 VolunteerTeam에는 User 타입을 만족하지 않은 객체가 들어올 수 없었지만 제약이 무너지면서 타입 에러가 발생하지 않는다.
// 만약 VolunteerTeam2가 extends User를 사용하였다면 기존에는 
// 'Volunteer | Expert | Villain' 형식이 'User' 제약 조건을 만족하지 않습니다. 'Villain' 형식에 'User' 형식의 name, age 속성이 없습니다.ts(2344)
// 라는 에러를 발생시켰지만 extends User를 사용하지 않는다면 에러가 발생하지 않는다.
