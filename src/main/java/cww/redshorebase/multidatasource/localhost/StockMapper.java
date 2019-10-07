package cww.redshorebase.multidatasource.localhost;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StockMapper {
    Integer updateStock(@Param("id") int id, @Param("count") int count);
}
