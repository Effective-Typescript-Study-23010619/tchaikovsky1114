
// 예제 1번
const CSV = `
Id,Univercity,Emmet,Country
1,Aust Univ,AU,Australia
2,Beijing Univ,CN,China
3,ChungAng Univ,AU,South Korea
4,Thai Univ,TH,Thailand
`

function parseCSV(input: string): {[columnName: string]: string}[] {
  
  const lines = input.split('\n'); // ["Id,Univercity,Emmet,Country","1,Aust Univ.,AU,Australia","2,Beijing Univ,CN,China","3,ChungAng Univ,AU,South Korea"...]
  const [header, ...rows] = lines;
  const headerColumns = header.split(','); // ["Id","Univercity","Emmet","Country"]
  //rows: ["1,Aust Univ,AU,Australia","2,Beijing Univ,CN,China","3,ChungAng Univ,AU,South Korea","4,Thai Univ,TH,Thailand"]
  return rows.map(rowStr => {
    // rowStr = "1,Aust Univ,AU,Australia", "2,Beijing Univ,CN,China", "3,ChungAng Univ,AU,South Korea", "4,Thai Univ,TH,Thailand"
    const row: {[columnName: string]: string} = {};
    //rowStr: ["1","Aust Univ","AU","Australia"], ["2","Beijing Univ","CN","China"], ["3","ChungAng Univ","AU","South Korea"], ["4","Thai Univ","TH","Thailand"]
    rowStr.split(',').forEach((cell, i) => { 
      // cell: "1", "Aust Univ", "AU", "Australia"
      // i: 0, 1, 2, 3
      // headerColumns[i]: "Id", "Univercity", "Emmet", "Country"
      row[headerColumns[i]] = cell;
    });
    //row: {"Id":"1","Univercity":"Aust Univ","Emmet":"AU","Country":"Australia"}
    //row: {"Id":"2","Univercity":"Beijing Univ","Emmet":"CN","Country":"China"}
    //row: {"Id":"3","Univercity":"ChungAng Univ","Emmet":"AU","Country":"South Korea"}
    //row: {"Id":"4","Univercity":"Thai Univ","Emmet":"TH","Country":"Thailand"}
    return row;
  })
}

const data = parseCSV(CSV);
// data: [{"Id":"1","Univercity":"Aust Univ","Emmet":"AU","Country":"Australia"},{"Id":"2","Univercity":"Beijing Univ","Emmet":"CN","Country":"China"},{"Id":"3","Univercity":"ChungAng Univ","Emmet":"AU","Country":"South Korea"},{"Id":"4","Univercity":"Thai Univ","Emmet":"TH","Country":"Thailand"}]


// 예제 2번
type Vec3D = Record<'x' | 'y' | 'z', number>;
// type Vec3D = {
//   x: number;
//   y: number;
//   z: number;
// }

// 예제 3번
type ABC = {[k in 'a' | 'b' | 'c']: k extends 'a' ? string : number};
// type ABC = {
//   a: string;
//   b: number;
//   c: number;
// }

