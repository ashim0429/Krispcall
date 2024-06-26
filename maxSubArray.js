function maxSubArray(nums) {

    //checking if the array is empty
    if (nums.length === 0) return 0;
    
    let currentMax = nums[0];
    let globalMax = nums[0];
    let start = 0;
    let end = 0;
    let temp = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > currentMax + nums[i]) {
            currentMax = nums[i];
            temp = i;
        } else {
            currentMax = currentMax + nums[i];
        }
        
        if (currentMax > globalMax) {
            globalMax = currentMax;
            start = temp;
            end = i;
        }
    }
    
    console.log(`${globalMax} (subarray [${nums.slice(start, end + 1)}] has the largest sum)`);
}

maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);