package cww.redshorebase.constants;

public class Basic {
    public static int threadCount = 20;
    public static String hongBaoPoolKey = "hongBaoPoolKey"; //LIST类型来模拟红包池子
    public static String hongBaoDetailListKey = "hongBaoDetailListKey";//LIST类型，记录所有用户抢红包的详情
    public static String userIdRecordKey = "userIdRecordKey";//记录已经抢过红包的用户ID,防止重复抢
    public static int honBaoCount = 1000;
}
