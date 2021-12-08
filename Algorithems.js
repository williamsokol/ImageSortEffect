var delay = parent.speed;

async function swap(arr, a, b) {
    await sleep(delay);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
    if(parent.context != null){
      //console.log(parent.context);

      playfreq(a)
      playfreq(b)
    }

}

//the first sort so far
async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);
    //states[index] = -1;
  
    await Promise.all([
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end)
    ]);
}

async function partition(arr, start, end) {
    // for (let i = start; i < end; i++) {
    //   states[i] = 1;
    // }
  
    let pivotValue = arr[end].colNum;
    let pivotIndex = start;
    //states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i].colNum < pivotValue) {
        await swap(arr, i, pivotIndex);
        //states[pivotIndex] = -1;
        pivotIndex++;
        //states[pivotIndex] = 0;
      }
    }
    await swap(arr, pivotIndex, end);
  
    // for (let i = start; i < end; i++) {
    //   if (i != pivotIndex) {
    //     states[i] = -1;
    //   }
    // }
    return pivotIndex;
}

// second sort 
async function bubbleSort( arr, n)
{
  var i, j;
  for (i = 0; i < n-1; i++)
  {
      for (j = 0; j < n-i-1; j++)
      {
          if (arr[j].colNum > arr[j+1].colNum)
          {
            await swap(arr,j,j+1);
          
          }
      }
  
  }
}

// radix sort

// merge sort

// 
 
