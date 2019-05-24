package cww.redshorebase.service.impl;

import cww.redshorebase.model.Orders;
import cww.redshorebase.multidatasource.aliyun.OrdersMapper;
import cww.redshorebase.service.DemoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

@Service
public class DemoServiceImpl implements DemoService {

    private static final Logger logger = LoggerFactory.getLogger(DemoServiceImpl.class);

    @Autowired
    private OrdersMapper ordersMapper;


    @Override
    @Cacheable(value = "xiaowu", key = "#id")
    public Orders getOrderFromAliYun(int id) {
        Orders orders = ordersMapper.selectByPrimaryKey(id);
        logger.info("getOrderFromAliYun 查询了数据库");
        return orders;
    }
}
