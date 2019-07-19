package cww.redshorebase.constants;

public class Constants {
    /*************************** MESSAGE ****************************/
    public static final String CODE_FLAG = "code";
    public static final String DATA_FLAG = "data";
    public static final String ERROR_MSG_FLAG = "error_msg";
    public static final String SUCCESS = "success";
    public static final String MESSAGE_FLG = "message";
    public static final String TOTAL = "total";
    public static final String CONTENT = "content";
    public static final int SUCCESS_CODE = 200;
    public static final String REDIRECT_URL = "redirect_url";
    public static final String LAST_REDIRECT_URL = "last_redirect_url";

    /************************** Basic ***********************/
    public static final String SYSTEM = "SYSTEM";
    public static final String YES = "YES";
    public static final String NO = "NO";
    public static final String DESC = "DESC";
    public static final String ASC = "ASC";
    public static final String TRUE = "TRUE";
    public static final String FALSE = "FALSE";
    public static final String ONE = "1";
    public static final String TK = "TK";

    /************************** Session keys ***********************/
    public static final String LOGIN_USER = "login_user_info";
    public static final String USER_UID = "login_user_uid";
    public static final String MALL_USER_UID = "login_mall_user_uid";
    public static final String MALL_VENDOR_UID = "login_mall_vendor_uid";
    public static final String ERP_VENDOR_UID = "login_erp_vendor_uid";
    public static final String LOGIN_NAME = "login_name";
    public static final String USER_NAME = "user_name";
    public static final String PHONE = "login_user_phone";
    public static final String MENU = "login_user_menu";
    public static final String CHILDREN_MENU_MAP = "children_menu_map";
    public static final String PARENT_MENU_MAP = "father_menu_map";
    public static final String USER_MALL = "login_user_mall";
    public static final String USER_ROLE_MALL = "user_role_mall";
    public static final String USER_SHOP = "login_user_shop";
    public static final String CURRENT_USER_SELECTED_MALL = "current_user_selected_mall";
    public static final String BELONGED_MALL_VENDOR_UID = "belonged_mall_vendor_uid";
    public static final String BELONGED_MALL_VENDOR_SHOP_UID = "belonged_mall_vendor_shop_uid";

    public static final String VALIDATE_CODE = "validateCode";

    public static final String MALL_LIST = "mall_list";

    public static final String CURRENT_USER_SELECTED_SHOP = "current_user_selected_shop";

    /************************** Catalog management ***********************/
    public static final String ROOT_CATALOG = "root";

    /************************** Organization management ***********************/
    public static final String ROOT_ORGANIZATION = "root";

    public static final String TREE_ROOT_CODE = "root";

    /************************** Role ***********************/
    public static final String SYSTEM_ADMIN_KEY = "role01";
    public static final String GUIDE_ROLE_KEY = "role02";
    public static final String VENDOR_ROLE_KEY = "role03";
    public static final String SHOP_MANAGER_ROLE_KEY = "role04";

    /************************** WECHAT MENU ***********************/
    /**
     * 菜单查询（GET）
     */
    public static final String MENU_GET = "https://api.weixin.qq.com/cgi-bin/menu/get?access_token=ACCESS_TOKEN";
    /**
     * 菜单创建（POST） 限100（次/天）
     */
    public static final String MENU_CREATE = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN";

    public final static String ACCESS_TOKEN = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

    //FIXME Hook
    public static final String YXMF_MALL_UID = "50686049042111111";

    public static final String DEFAULT_MALL_UID = "11111111111111111";

    public static final String SYSTEM_UID = "10000000000000001";

    //    WORKFLOWSTEP_CONFIG 审核流默认配置 | MANUAL_SELECTION 手动选择 | WORKFLOW_SYNC 审核流同步）
    public static final String AUDUTOR_LIST_SOUCE_WORKFLOWSTEP = "WORKFLOWSTEP_CONFIG";
    public static final String AUDUTOR_LIST_SOUCE_MANUAL = "MANUAL_SELECTION";
    public static final String AUDUTOR_LIST_SOUCE_SYNC = "WORKFLOW_SYNC";

}
