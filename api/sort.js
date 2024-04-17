/* const data=[{name:"John"},{ name:"Emma"},{ name:"Michael"},{ name:"Sophia"},{ name:"William"},{ name:"Olivia"},{ name:"James"},{ name:"Ava"},{ name:"Alexander"},{ name:"Isabella"}]

  
  const Order=(array,getter,order="Asc")=>{
    array.sort((a,b)=>{
      const first=getter(a);
      const second=getter(b);
      const compare=first.localeCompare(second)
      return order=== "Asc"?compare:-compare

    })
  }
  console.log(data);
 const arrayOrdenado= Order(data,person=>person.name)
 console.log(data);
 */
 function bubbleSort(arr) {
  let len = arr.length;
  let swapped;
  do {
      swapped = false;
      for (let i = 0; i < len - 1; i++) {
          if (arr[i].name.toLowerCase() > arr[i + 1].name.toLowerCase()) {
              let temp = arr[i];
              arr[i] = arr[i + 1];
              arr[i + 1] = temp;
              swapped = true;
          }
      }
  } while (swapped);
  return arr;
}

const data = [
  {name: "John"}, {name: "Emma"}, {name: "Michael"}, {name: "Sophia"}, {name: "William"},
  {name: "Olivia"}, {name: "James"}, {name: "Ava"}, {name: "Alexander"}, {name: "Isabella"}
];
console.log(data);
const sortedData = bubbleSort(data);
console.log(sortedData);
function removeDuplicates(arr) {
  const seen = new Set();
  const result = [];

  for (const item of arr) {
      const identifier = item.id || item.uuid;
      if (!seen.has(identifier)) {
          seen.add(identifier);
          result.push(item);
      }
  }

  return result;
}