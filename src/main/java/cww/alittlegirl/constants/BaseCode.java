package cww.alittlegirl.constants;

import java.util.HashMap;
import java.util.Map;

public enum BaseCode {
    SUCESS(200, "Opeartion success"),

    ACCESS_DENIED(403, "Access denied"),

    NOT_FOUND(404, "Resource not found"),

    INTERNAL_ERROR(500, "Server internal error "),

    SESSION_INVALID(1003, "session invalid"),

    OPERATION_NOT_SUPPORT(1100, "Operation does not support"),

    UNKNOWN(-1, "Unknown error"),

    INVALID_ARGUMENT(11001, "请求参数错误"),

    NO_BUSINESS_PROGRAM_PERMISSION(11002, "无任何商场权限"),

    DB_SELECT_ERROR(19996, "数据库查询错误"),

    DB_UPDATE_ERROR(19998, "数据库更新错误"),

    DB_INSERT_ERROR(19999, "数据库插入错误"),

    DB_DELETE_ERROR(19997, "数据库删除错误"),

    CREATE_MENU_ERROR_EXIST(12001, "该菜单已存在"),
    MENU_DO_NOT_EXIST(12002, "菜单不存在"),

    NO_SUCH_ROLE_NAME_PERMISSION(12001,"无法查询到相关角色"),
    ROLE_UNCHANGEABLE(12002,"该角色被设定为无法删除"),
    USER_ROLE_IS_EXIST(12003,"该用户角色已经存在"),
    ROLE_ALREADY_RELATE_USER(12004,"该角色存在关联用户"),
    USER_HAS_INCOMPATIBLE_ROLES(12005, "用户存在与当前创建角色相冲突的角色"),

    PERMISSION_IS_NOT_EXIST(13001,"权限信息不存在"),


    WORKFLOW_AUDITOR_ERROR(23001, "用户不在审核人候选列表"),
    WORKFLOW_AUDIT_STATUS_ERROR(23002, "审核状态错误"),
    WORKFLOW_AUDITOR_LIST_IS_EMPTY(23003, "审核人候选列表为空"),
    WORKFLOW_PROGRESS_NOT_EXISTS(23004, "审核流程不存在"),
    WORKFLOW_ALREADY_USED(23005, "审核流已经使用"),
    WORKFLOW_AUDIT_STRATEGY_NOT_SUPPORT(23006, "审核处理策略不支持使用"),
    WORKFLOW_AUDIT_PER_VERIFY_ERROR(23007, "回调业务校验异常"),
    WORKFLOW_AUDIT_PER_VERIFY_REFUSE(23008, "回调业务校验不通过"),

    CATALOG_EXIST_ERROR(22000, "品类已存在"),
    CATALOG_HAS_RELATED_BRAND_ERROR(22001, "品类有关联品牌"),
    CATALOG_ADD_FAILED_ERROR(22002, "品类添加失败"),
    CATALOG_DELETE_FAILED_ERROR(22003, "品类删除失败"),
    CATALOG_ADD_OVER_26_LIMIT_ERROR(22004, "品类添加失败，超过层级最大值26"),
    CATALOG_ADD_OVER_99_LIMIT_ERROR(22006, "品类添加失败，超过层级最大值99"),
    CATALOG_ADD_PARENT_MISS_ERROR(22005, "品类添加失败，父节点已不存在"),
    CATALOG_BUSINESS_CODE_EXIST_ERROR(22007, "品类编号已存在"),
    CATALOG_INVALID_ERROR(22008, "当前品类无效"),
    CATALOG_VALID_ERROR(22009, "当前品类有效"),
    CATALOG_NOT_EXIST_ERROR(22010, "品类不存在"),
    CATALOG_HAS_CHILDREN_ERROR(22011, "品类含有子节点"),
    CATALOG_NAME_EXIST_ERROR(22012, "品类名称已存在"),
    CATALOG_HAS_VALID_CHILDREN_ERROR(22013, "品类含有有效子类"),
    CATALOG_PARENT_INVALID_ERROR(22014, "父品类无效"),
    INVALID_BRAND_UID(23001, "品牌无效"),
    BRAND_STATUS_IS_DISABLED(23002, "品牌已冻结"),
    BRAND_HAS_BINDED_TO_ERP_SHOP(23003, "品牌已关联到店铺，冻结失败"),
    BRAND_HAS_BINDED_TO_ERP_CONTRACT(23003, "品牌已关联到合同，冻结失败"),

    FORMAL_CONTACTS_NOT_EXIST(41012,"未查到关于您的有效合同信息，请联系管理员"),

    EDIT_SHOP_EXTENDED_NO_ERROR(19100,"更新门店外部单号失败"),

    FAILD_UPDATE_PRODUCT(24001, "更新商品失败"),

    ROLE_CREATE_ERROR(25001, "角色创建失败"),

    ROLE_UPDATE_ERROR(25002, "角色更新失败"),

    ROLE_NAME_IS_EXIST_ERROR(25003,"角色名已存在"),

    ROLE_IS_NOT_EXIST_ERROR(25004,"角色不存在"),

    CATALOG_ADD_OVER_LIMIT_ERROR(22006, "品类编码生成超过层级最大值99"),

    ACCESS_TOKEN_IS_EMPTY_ERROR(26001, "access_token为空"),

    WECHAT_INFO_NOT_EXIST_ERROR(26002,"未找到相应的公众号信息"),

    WECHAT_MENU_CREATE_ERROR(26003,"微信菜单创建失败"),

    MALL_IS_NOT_EXIST_ERROR(26004,"商场不存在"),

    ALIAS_IS_EXIST_ERROR(26005,"alias已存在在"),

    MALL_UID_IS_EXIST_ERROR(26006,"该商场已经绑定公众号"),

    BUSINESS_COMPNAY_NAME_ALREDY_REVIEWED(26007, "该商管公司名称已经存在"),

    BUSINESS_COMPNAY_SHORT_NAME_ALREDY_REVIEWED(26008, "该商管公司简称已经存在"),

    BUSINESS_COMPNAY_DELETE_FAILED_ERROR(26009, "商管公司删除失败"),

    BUSINESS_PROGRAM_DELETE_FAILED_ERROR(26010, "商业项目删除失败"),

    BUSINESS_PROGRAM_NAME_ALREDY_REVIEWED(26011, "该商业项目名称已经存在"),

    BUSINESS_PROGRAM_CODE_ALREDY_REVIEWED(26012, "该商业项目编号已经存在"),

    BUSINESS_PROGRAM_EXIST_ERROR(26013, "商业项目下存在楼栋"),

    ERP_BUILDING_CREATE_FAIL_ERROR(26014, "楼栋创建失败"),

    ERP_BUILDING_UPDATE_FAIL_ERROR(26015, "楼栋更新失败"),

    ERP_BUILDING_DELETE_FAIL_ERROR(26016, "楼栋删除失败"),

    ERP_FLOOR_CREATE_FAIL_ERROR(26017, "楼层创建失败"),

    ERP_FLOOR_UPDATE_FAIL_ERROR(26018, "楼层更新失败"),

    ERP_FLOOR_DELETE_FAIL_ERROR(26019, "楼层删除失败"),

    EDIT_MALL_ERROR(26020, "商场信息修改失败"),

    NO_SUCH_USER_ACCOUNT(26021, "数据库中无该用户信息"),

    BUSINESS_COMPNAY_FLOORAGE_JUDEGE_ERROR(26022, "修改后的面积小于该商业项目下所有楼栋面积之和，无法修改"),

    FIELD_UID_IS_EMPTY(26050, "场地不能为空"),
    FIELD_SPLIT_TARGET_IS_EMPTY(26051, "目标场地列表不能为空"),
    FIELD_UID_IS_INVALID(26052, "无效的被拆分场地Uid参数"),
    FIELD_INVALID_STATUS_TO_SPLIT(26053, "所选场地不能进行拆分,状态不为空置，请重新选择"),
    FIELD_INVALID_TARGET_TOTAL_AREA(26054, "拆分场地的面积有误，请重新输入"),
    FIELD_AT_LEAST_MERGE_TWO_FIELDS(26055, "合并场地列表至少包含两块场地，请重新输入"),
    FIELD_NOT_ALL_UID_AVAILABLE(26056, "场地列表包含无效场地"),
    FIELD_ALL_STATUS_SHOULD_AVAILABLE(26057, "场地列表要求都为空置状态"),
    FIELD_ALL_LOCATION_SHOULD_SAME(26058, "场地列表要求在同一楼栋相同楼层"),
    FIELD_ALL_TYPE_SHOULD_SAME(26059, "场地列表要求相同的场地类型"),
    FIELD_CODE_EXIST(26060, "已存在该场地编号"),
    FIELD_CODE_FORMAT_INVALID(26061, "场地编号格式不正确"),
    FIELD_NOT_ALL_CODE_CORRECT(26062, "场地列表存在不合正则编号"),
    FIELD_NOT_ALL_CODE_AVAILABLE(26063, "该场地已存在，请重新输入"),
    FIELD_AREA_IS_OVERFLOW(26064, "新增场地后场地总面积超出楼层面积"),
    FIELD_AT_LEAST_SPLIT_TO_TWO(26065, "场地拆分数量不足，请重新拆分"),
    FIELD_BATCH_INSERT(26066, "场地批量插入校验失败"),
    FIELD_BATCH_SPLIT(26067, "场地批量拆分校验失败"),
    FIELD_ALREADY_USED_BY_VALID_CONTRACT(26068, "场地已被审核通过的合同使用"),
    FIELD_ALREADY_USED_BY_PENDING_CONTRACT(26069, "场地已被审核中的合同使用"),
    FIELD_IS_NOT_AVAILABLE(26070, "场地状态不在空置状态"),
    FIELD_ALREADY_USING_BY_OTHER_CONTRACT(26071, "场地正在被其他合同使用，请稍后再试"),
    FIELD_IS_NOT_EXIST(26072, "场地不存在"),
    FIELD_IS_INVALID(26073, "场地已无效，请核实后再继续操作"),

    FEE_TYPE_IS_INTERNAL(26090, "系统内置费用类型，不允许操作"),

    BRAND_ALREDY_REVIEWED(27001, "审核通过或审核列表中已存在该品牌"),
    BRAND_REVIEW_AUDITOR_IS_EMPTY(27002, "品牌审核不存在审核候选人"),
    ASSISTANT_REVIEW_AUDITOR_IS_EMPTY(27003, "人员审核不存在审核候选人"),
    FORMAL_CONTRACT_REVIEW_AUDITOR_IS_EMPTY(27004, "正式合同审核不存在审核候选人"),
    INFORMAL_FORMAL_CONTRACT_END_DATE_ERROR(27005, "此合同的结束时间已经小于当前时间，无法继续操作"),

    FAIL_TO_GET_PRICE_INFO(28001,"获取标价签信息失败"),

    VENDOR_ID_NUMBER_ALREDY_REVIEWED(29001,"该商户身份证号已经存在"),

    VENDOR_LOGIN_NAME_ALREDY_REVIEWED(29002,"该商户登录账号已经存在"),

    PERSONNEL_ALREADY_EXIST(29101, "人员已存在"),

    SHOP_ASSISTANT_ALREADY_LEAVE(29102, "人员存在并已离场"),

    SHOP_ASSISTANT_DELETER_ERROR(29103, "人员删除失败"),
    SHOP_ASSISTANT_AUDIT_ERROR(29104, "人员审核结果处理错误"),

    REQUEST_ENTITY_IS_EMPTY(41001, "请求参数为空"),

    CREATE_USER_FAIL(29201, "创建用户失败"),

    ECSALES_IS_EMPTY(29202,"电子销售单为空"),

    ECSALES_STAGE_PAY_ERROR(29203,"销售单分期支付失败"),

    ECSALES_UID_IS_DUPLICATE(29204,"电子销售单保存失败，销售单号重复"),

    ECSALES_FAIL_TO_SAVE(29205,"电子销售单保存失败"),

    SALE_PAY_INFO_NOT_EXIST_ERROR(29206,"销售单支付详情不存在！"),

    ORDER_NOT_EXIST_ERROR(29207,"线上订单不存在！"),

    ECSALES_UID_IS_EMPTY(29208,"电子销售单UID为空"),

    ECSALES_PAYAMOUNT_IS_EMPTY(29209,"应付金额为空"),

    SUSPEND_FORMAL_CONTRACT_ERROR(29301,"中止正式合同出错"),

    NO_PERMISSION(41002,"您暂无权限，请联系管理员"),

    ERP_VENDOR_FAILlURE(41003,"您的店铺已失效，请联系管理员"),

    ERP_VENDOR_SHOP_NOT_EXIST(41004,"未查到关于您的店铺信息，请联系管理员"),

    ERP_SHOP_ASSISTANT_FAILlURE(41005,"您的账号处于不在场状态, 请联系管理员"),

    ERP_SHOP_MANAGER_FAILlURE(41006,"您无权限登陆系统，请联系管理员"),

    SHOP_NOT_EXIST(41008,"未查到关于您的店铺信息，请联系管理员"),

    STATUS_IS_NOT_OK(41009, "您的账号处于不在场状态, 请联系管理员"),

    NOT_AVAILABLE_TIME(41010, "你的账号未到可用时间， 请联系管理员"),

    OUT_AVAILABLE_TIME(41011, "你的账号已过期， 请联系管理员"),

    CONTACTS_NOT_EXIST(41012,"未查到关于您的有效合同信息，请联系管理员"),

    FORMAL_CONTACTS_NOT_AVAILABLE(41013,"您的合同均已失效或未生效无法登陆，请联系管理员"),

    AUDIT_REVIEW_AUDITOR_IS_EMPTY(51000, "审核不存在审核候选人"),

    PRODUCT_USING_BY_OTHER_AUDIT(51001, "商品已被其他审核流程占用，请稍后再试"),
    PRODUCT_ALREADY_RETURNED(51002, "该退货单中存在已退货的商品，审核通过失败"),

    COUPONRULEPO__NOT_CONTINUITY_INTERVAL(61001,"销售区间不是连续的"),
    CREATE_COUPON_STOCK_NOT_MORE_LIMITRECEIVECOUNT(61002,"创建优惠券失败，库存数没有大于每人领取总数"),
    CREATE_COUPON_COUPON_PRICE_INCORRECT(61003,"创建优惠券失败，优惠券价值不等于 优惠券面值*增值比率"),
    CREATE_COUPON_VERIFCATIONDATE_ERROR(61004,"创建优惠券失败，核销结束时间必须晚于核销开始时间")

    ;

    private int code;
    private String message;

    BaseCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public static BaseCode valueOf(int code) {
        BaseCode ec = values.get(code);
        if (ec != null) {
            return ec;
        }
        return UNKNOWN;
    }

    public static BaseCode valueOfCodeStr(String codeStr) {
        try {
            int code = Integer.valueOf(codeStr);
            BaseCode ec = values.get(code);
            if (ec != null) {
                return ec;
            }
            return UNKNOWN;
        } catch (Exception e) {
            return UNKNOWN;
        }

    }

    private static final Map<Integer, BaseCode> values = new HashMap<Integer, BaseCode>();

    static {
        for (BaseCode ec : BaseCode.values()) {
            values.put(ec.code, ec);
        }
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

}
