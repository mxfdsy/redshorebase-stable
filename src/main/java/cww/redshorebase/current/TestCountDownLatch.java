package cww.redshorebase.current;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.CountDownLatch;

public class TestCountDownLatch {
    private CountDownLatch countDownLatch = new CountDownLatch(4);

    public static void main(String[] args) {
        TestCountDownLatch testCountDownLatch = new TestCountDownLatch();
        testCountDownLatch.begin();

    }

    //运动员类
    private class Runner implements Runnable {
        private int result;

        public Runner(int result) {
            this.result = result;
        }


        @Override
        public void run() {
            try {
                Thread.sleep(result * 1000);
                System.out.println("等待的时间" + result * 1000);
                countDownLatch.countDown();
                System.out.println("do work" + result * 1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void begin() {
        System.out.println(" 比赛开始");
        Date date = new Date();
        Random random = new Random(System.currentTimeMillis());
        for (int i = 0; i < 4; i++) {
            int result = random.nextInt(5) + 1;

            new Thread(new Runner(result)).start();
        }

        try {
            System.out.println("正在等待");
            countDownLatch.await();

            Date date1 = new Date();
            System.out.println("我在验证等待的时间");
            System.out.println(date1.getTime() - date.getTime());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(" 开始计算成绩 ");
    }

}
