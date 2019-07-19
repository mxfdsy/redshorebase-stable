package cww.redshorebase.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import cww.redshorebase.constants.BaseCode;
import cww.redshorebase.constants.Constants;
import cww.redshorebase.model.BaseResponseDTO;


public class ResultBuilderUtils {
    public static String buildSuccess(String message) {
        JSONObject result = new JSONObject();
        result.put(Constants.MESSAGE_FLG, message);
        return buildSuccess(result);
    }

    public static String buildSuccess() {
        JSONObject result = new JSONObject();
        result.put(Constants.MESSAGE_FLG, Constants.SUCCESS);
        return buildSuccess(result);
    }

    public static String buildSuccess(Object data) {
        BaseResponseDTO result = new BaseResponseDTO(data);
        return JSON.toJSONString(result);
    }

    public static String buildError(String message) {
        BaseResponseDTO result = new BaseResponseDTO(message);
        return JSON.toJSONString(result);
    }

    public static String buildError(BaseCode errorCode) {
        BaseResponseDTO result = new BaseResponseDTO(errorCode.getCode(), errorCode.getMessage());
        return JSON.toJSONString(result);
    }

    public static String buildError(BaseCode errorCode, String errorMsg) {
        BaseResponseDTO result = new BaseResponseDTO(errorCode.getCode(), errorCode.getMessage(), errorMsg);
        return JSON.toJSONString(result);
    }

    public static String buildErrorWithData(BaseCode errorCode, Object data) {
        BaseResponseDTO result = new BaseResponseDTO(errorCode.getCode(), errorCode.getMessage(), errorCode.getMessage(), data);
        return JSON.toJSONString(result);
    }
}
