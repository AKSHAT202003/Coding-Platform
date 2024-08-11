#include <iostream>
#include <unordered_map>
#include <vector>

using namespace std;

vector<int> findTwoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numToIndex;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (numToIndex.find(complement) != numToIndex.end()) {
            return {numToIndex[complement], i};
        }
        numToIndex[nums[i]] = i;
    }
    return {};
}

int main() {
    int n, target;
    cout << "Enter the number of elements in the array: ";
    cin >> n;
    
    vector<int> nums(n);
    cout << "Enter the array of integers separated by spaces: ";
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    cout << "Enter the target value: ";
    cin >> target;

    vector<int> result = findTwoSum(nums, target);

    if (!result.empty()) {
        cout << "The indices of the two numbers that add up to the target are: ";
        cout << result[0] << " and " << result[1] << endl;
    } else {
        cout << "No two numbers add up to the target." << endl;
    }

    return 0;
}
