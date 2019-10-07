package cww.redshorebase.current;

import java.util.concurrent.locks.StampedLock;

/**
 * 优化读写锁
 */
public class TestStampedLock {
    private final StampedLock s1 = new StampedLock();

    public void mutate() {
        long l = s1.writeLock();
        try {
            // write
        } finally {
            s1.unlock(l);
        }
    }

    String access() {
        //尝试获取乐观锁
        long l = s1.tryOptimisticRead();

        String str = "";
        boolean validate = s1.validate(l);
        if (!validate) {
            long l1 = s1.readLock();
            try {
                str = "sty";
            } finally {
                s1.unlock(l);
            }
        }
        return str;

    }

}
