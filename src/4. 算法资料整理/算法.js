
    // 一、动态规划
    // 1.买卖股票的最佳时机
    ;(() => {
        // 1.买卖股票的最佳时机
        function maxProfit(prices) {
            let max = 0, minPrice = prices[0]
            for (let i = 1; i < prices.length; i ++) {
                minPrice = Math.min(minPrice, prices[i])
                max = Math.max(max, prices[i] - minPrice)
            }
            return max
        }

        // 时间复杂度：O(n)
        // 空间复杂度：O(1)
        // 参考：
        // https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
        // https://mp.weixin.qq.com/s/EE15xi542PfM-WNJayReHQ
    })()
    

    // 2.最大子序和
    ;(() => {
        // 输入: [-2,1,-3,4,-1,2,1,-5,4]
        // 输出: 6
        // 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

        function maxSubArray(nums) {
            let max = nums[i],  pre = 0

            for (let i = 1; i < nums.length; i++ ) {
                if (pre > 0) {
                    pre = pre + nums[i]
                } else {
                    pre = nums[i]
                }
                max = math.max(max, pre + num[i])
            }

            return max
        }

        // 时间复杂度：O(n)
        // 空间复杂度：O(1)
        // 参考：
        // https://mp.weixin.qq.com/s/AlXFITVbBZVDiljVd_eDjw
        // https://leetcode-cn.com/problems/maximum-subarray/solution/zi-jie-leetcode53zui-da-zi-xu-he-by-user7746o/
    })()



    // 3. 使用最小花费爬楼梯
    ;(() => {
        // 3. 使用最小花费爬楼梯
        // 输入: cost = [10, 15, 20]
        // 输出: 15
        // 解释: 最低花费是从cost[1]开始，然后走两步即可到阶梯顶，一共花费15。

        // 输入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
        // 输出: 6
        // 解释: 最低花费方式是从cost[0]开始，逐个经过那些1，跳过cost[3]，一共花费6。

        function minCostClimbingStairs(cost) {
            

        }

        // 参考：
        // https://mp.weixin.qq.com/s/3sHEueEYYdhSIy_NOoYd-w
    })()

    // 4. 爬楼梯问题
    ;(() => {
        // https://mp.weixin.qq.com/s/W9-JRtMehbb0zy_QpJUZbw
    })


    // 5. 爱吃香蕉的珂珂
    ;(() => {   
        // https://mp.weixin.qq.com/s/6IMMidwOhTNWJSSLmCWR7g
    })


    // 6. 在排序数组中查找元素的第一个和最后一个位置

    ;(() => {
        // 方法一： findIndex、lastIndexOf

        // 方法二：
        // https://mp.weixin.qq.com/s/YOMvXPt3ODSAqNdJlV90lA
    })()

    // 7. 简述二分查找算法与时间复杂度，并实现一个二分查找算法
    ;(() => {
        function binarySearch(items, item) {
            let low = 0
            let high = items.length - 1

            while(low <= high) {
                let mid = Math.floor((low + high) / 2)
                if (item < items[mid]) {
                    high = mid - 1
                } else if (item > item[mid]) {
                    low = mid + 1
                } else {
                    return mid
                }
            }

            return -1
        }

        // 时间复杂度：O(logn)
        // 空间复杂度：O(1)

        // 二分查找易错点：
        // 循环退出条件是low <= high ，注意是 <=
        // mid 的取值是 Math.floor((low+high)/2)
        // low high 每次更新的时候，low = mid + 1 high = mid - 1

        // https://mp.weixin.qq.com/s/MeabNl-4iS2tpQm5UtXtiw

        // 判断是否是循环链表
    })()

    // 分发饼干
