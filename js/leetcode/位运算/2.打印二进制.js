// 打印一个数的二进制形式
// 从这个数的第31位开始，每一位都与上 1 往左移相同的位数，如果是0，则n的二进制该位置是0，如果不是0，则是1
// 如 ：11
// 11的二进制是：
// 00000000000000000000000000001011
// 第31位就用11与上1 << 31 ,变成
// 00000000000000000000000000001011
// 10000000000000000000000000000000
// 这个时候如果n的第31为0，那 & 之和的结果必定也是0，这就可以得出第31位的值
// 依次求30位、29位、28位...等
function printBinary(n) {
  let res = '';
  for (let i = 31; i >= 0; i--) {
    res += (n & (1 << i)) == 0 ? '0' : '1'
  }
  return res;
}