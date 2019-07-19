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
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import javax.sql.DataSource;


@Configuration
@MapperScan(basePackages = "cww.redshorebase.multidatasource.aliyun", sqlSessionFactoryRef = "aliyunSqlSessionFactory")
public class DataSource2Config {
//    @Bean(name = "aliyunDataSource")
//    @ConfigurationProperties(prefix = "spring.datasource.spring2")
//    public DataSource testDataSource() {
//        return DataSourceBuilder.create().build();
//    }

    @Bean(name = "aliyunSqlSessionFactory")
    public SqlSessionFactory testSqlSessionFactory(@Qualifier("aliyunDataSource") DataSource dataSource)
            throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);
        bean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:mapping/aliyun/*.xml"));
        return bean.getObject();
    }

    @Bean(name = "aliyunDataSource")
    public DataSource testDataSource(DBConfig2 config2) {
        MysqlXADataSource mysqlXADataSource = new MysqlXADataSource();
        mysqlXADataSource.setUrl(config2.getJdbcUrl());
        mysqlXADataSource.setPassword(config2.getPassword());
        mysqlXADataSource.setUser(config2.getUsername());

        AtomikosDataSourceBean atomikosDataSourceBean = new AtomikosDataSourceBean();
        atomikosDataSourceBean.setXaDataSource(mysqlXADataSource);
        atomikosDataSourceBean.setUniqueResourceName("aliyunDatasource");
        return atomikosDataSourceBean;

    }

//    @Bean(name = "aliyunTransactionManager")
//    public DataSourceTransactionManager testTransactionManager(@Qualifier("aliyunDataSource") DataSource dataSource) {
//        return new DataSourceTransactionManager(dataSource);
//    }

    @Bean(name = "aliyunSqlSessionTemplate")
    public SqlSessionTemplate testSqlSessionTemplate(
            @Qualifier("aliyunSqlSessionFactory") SqlSessionFactory sqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

}