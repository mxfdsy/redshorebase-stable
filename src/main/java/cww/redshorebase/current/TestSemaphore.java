package cww.redshorebase.current;

import java.util.concurrent.Semaphore;

public class TestSemaphore {
    public static void main(String[] args) {
        Semaphore semaphore = new Semaphore(5);

        for (int i = 0; i < 8; i++) {
            new Worker(i, semaphore).start();
        }
    }


    static class Worker extends Thread {
        private int num;
        private Semaphore semaphore;

        public Worker(int num, Semaphore semaphore) {
            this.num = num;
            this.semaphore = semaphore;
        }

        @Override
        public void run() {
            try {
                semaphore.acquire();
                System.out.println("我抢到了" + num);
                Thread.sleep(10000);
                semaphore.release();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
