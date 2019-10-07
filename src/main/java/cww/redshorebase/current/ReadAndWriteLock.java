package cww.redshorebase.current;

import java.util.TreeMap;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 *读写锁
 */
public class ReadAndWriteLock {
    private final TreeMap<String, String> m = new TreeMap<>();

    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    private final Lock r = rwl.readLock();

    private final Lock w = rwl.writeLock();


    public String get(String key) {
        r.lock();
        System.out.println(" 读写锁定 ");

        try {
            return m.get(key);
        } finally {
            r.unlock();
        }
    }


    public void put(String key, String value) {
        w.lock();
        System.out.println(" 写锁锁定 ");

        try {
            m.put(key, value);
        } finally {
            w.unlock();
        }
    }

}
