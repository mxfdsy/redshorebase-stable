package cww.redshorebase.multidatasource.localhost;

import cww.redshorebase.model.Users;

public interface UsersMapper {
    int deleteByPrimaryKey(Long id);

    int insert(Users record);

    int insertSelective(Users record);

    Users selectByPrimaryKey(int id);

    int updateByPrimaryKeySelective(Users record);

    int updateByPrimaryKey(Users record);
}