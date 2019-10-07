package cww.redshorebase.current;


import java.util.Random;
import java.util.concurrent.BrokenBarrierException;
import java.util.concurrent.CyclicBarrier;

public class TestCyclicBarrier {
    CyclicBarrier cyclicBarrier = new CyclicBarrier(5);

    public static void main(String[] args) {
        TestCyclicBarrier testCyclicBarrier = new TestCyclicBarrier();
        testCyclicBarrier.begin();


        System.out.println(" 开吃了 ");

    }

    public void begin() {
        for (int i = 0; i < 5; i++) {
            new Thread(new Student()).start();
        }
    }

    class Student implements Runnable {
        @Override
        public void run() {

            try {
                Random random = new Random();
                int i = random.nextInt(5) * 1000;
                System.out.println("我睡" + i);
                Thread.sleep(i);
                cyclicBarrier.await();
                System.out.println("do my work i = " + i);
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (BrokenBarrierException e) {
                e.printStackTrace();
            }
        }
    }


}
