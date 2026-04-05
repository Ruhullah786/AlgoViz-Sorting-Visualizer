let array=[];
let delay=50;

function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}

function generateArray(){
  const size=document.getElementById("size").value;
  array=[];
  for(let i=0;i<size;i++){
    array.push(Math.floor(Math.random()*300)+20);
  }
  renderArray();
}

function renderArray(){
  const container=document.getElementById("array");
  container.innerHTML="";
  for(let i=0;i<array.length;i++){
    const bar=document.createElement("div");
    bar.style.height=array[i]+"px";
    bar.classList.add("bar");
    container.appendChild(bar);
  }
}

async function bubbleSort(){
  const bars=document.getElementsByClassName("bar");
  delay=101-document.getElementById("speed").value;

  for(let i=0;i<array.length;i++){
    for(let j=0;j<array.length-i-1;j++){

      bars[j].style.background="red";
      bars[j+1].style.background="red";

      if(array[j]>array[j+1]){
        await sleep(delay);
        [array[j],array[j+1]]=[array[j+1],array[j]];
        renderArray();
      }

      bars[j].style.background="#38bdf8";
      bars[j+1].style.background="#38bdf8";
    }
  }
}

async function selectionSort(){
  const bars=document.getElementsByClassName("bar");
  delay=101-document.getElementById("speed").value;

  for(let i=0;i<array.length;i++){
    let min=i;

    for(let j=i+1;j<array.length;j++){
      bars[j].style.background="red";
      await sleep(delay);

      if(array[j]<array[min]){
        min=j;
      }

      bars[j].style.background="#38bdf8";
    }

    [array[i],array[min]]=[array[min],array[i]];
    renderArray();
  }
}

async function mergeSortStart(){
  await mergeSort(0,array.length-1);
}

async function mergeSort(l,r){
  if(l>=r) return;

  const m=Math.floor((l+r)/2);

  await mergeSort(l,m);
  await mergeSort(m+1,r);
  await merge(l,m,r);
}

async function merge(l,m,r){

  let left=array.slice(l,m+1);
  let right=array.slice(m+1,r+1);

  let i=0,j=0,k=l;

  delay=101-document.getElementById("speed").value;

  while(i<left.length && j<right.length){
    await sleep(delay);

    if(left[i]<=right[j]){
      array[k]=left[i];
      i++;
    }else{
      array[k]=right[j];
      j++;
    }

    k++;
    renderArray();
  }

  while(i<left.length){
    await sleep(delay);
    array[k]=left[i];
    i++;
    k++;
    renderArray();
  }

  while(j<right.length){
    await sleep(delay);
    array[k]=right[j];
    j++;
    k++;
    renderArray();
  }
}

generateArray();
