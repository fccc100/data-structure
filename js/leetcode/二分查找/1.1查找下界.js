function binarySearch(nums, target) {
  let l = 0;
  let r = nums.length;
  while(l < r) {
    let mid = l + (r - l >> 1);
    if (nums[mid] === target) {
      r = mid;
    } else if (nums[mid] < target) {
      l = mid + 1;
    }  else if (nums[mid] > target) {
      r = mid;
    }
  }
  return l;
}