package cww.redshorebase.controller;

import java.util.*;
import java.util.stream.Collectors;

public class Test {
    public static void main(String[] args) {

        int[] x = {5, 6, 6, 7, 7, 7, 8, 8, 8, 8};
        topKFrequent(x, 2);
    }

    public Test() {

    }

    private static void topKFrequent(int[] nums, int k) {

        HashMap<Integer, Integer> map = new HashMap<>();
        for (int num : nums) {
            Integer integer = map.putIfAbsent(num, 1);
            if (null != integer) {
                map.put(num, map.get(num) + 1);
            }
        }

        LinkedHashMap<Integer, Integer> sortMap = map.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        ArrayList<Integer> results = new ArrayList<>();
        sortMap.forEach((key, v) -> {
            if (v > k) {
                results.add(key);
            }
        });

        System.out.println(results);
    }
}
