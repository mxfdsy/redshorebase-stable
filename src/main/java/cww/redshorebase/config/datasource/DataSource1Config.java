package cww.redshorebase.config.datasource;

import com.mysql.cj.jdbc.MysqlXADataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jta.atomikos.AtomikosDataSourceBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;


@Configuration
@MapperScan(basePackages = "cww.redshorebase.multidatasource.localhost", sqlSessionFactoryRef = "localhostSqlSessionFactory")
public class DataSource1Config {
//    @Bean(name = "localhostDataSource")
//    @ConfigurationProperties(prefix = "spring.datasource.spring")
//    @Primary
//    public DataSource testDataSource() {
//        return DataSourceBuilder.create().build();
//    }

    @Bean(name = "localhostSqlSessionFactory")
    @Primary
    public SqlSessionFactory testSqlSessionFactory(@Qualifier("localhostDataSource") DataSource dataSource)
            throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
         bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapping/localhost/*.xml"));
        return bean.getObject();
    }

    @Bean(name = "localhostDataSource")
    @Primary
    public DataSource testDataSource(DBConfig1 config1) {
        MysqlXADataSource mysqlXADataSource=new MysqlXADataSource();
        mysqlXADataSource.setUrl(config1.getJdbcUrl());
        mysqlXADataSource.setPassword(config1.getPassword());
        mysqlXADataSource.setUser(config1.getUsername());

        AtomikosDataSourceBean atomikosDataSourceBean=new AtomikosDataSourceBean();
        atomikosDataSourceBean.setXaDataSource(mysqlXADataSource);
        atomikosDataSourceBean.setUniqueResourceName("localhostDatasource");
        return atomikosDataSourceBean;

    }


//    @Bean(name = "localhostTransactionManager")
//    @Primary
//    public DataSourceTransactionManager testTransactionManager(@Qualifier("localhostDataSource") DataSource dataSource) {
//        return new DataSourceTransactionManager(dataSource);
//    }

    @Bean(name = "localhostSqlSessionTemplate")
    @Primary
    public SqlSessionTemplate testSqlSessionTemplate(
            @Qualifier("localhostSqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}