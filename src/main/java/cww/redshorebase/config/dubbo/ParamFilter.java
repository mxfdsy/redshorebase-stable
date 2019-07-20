package cww.redshorebase.config.dubbo;

import com.alibaba.dubbo.rpc.*;

public class ParamFilter implements Filter {

    @Override
    public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
        String ip = RpcContext.getContext().getAttachment("rpc_ip");
        System.out.println("get rpc_ip:"+ip);
        return invoker.invoke(invocation);
    }
}
