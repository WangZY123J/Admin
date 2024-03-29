export default {
  login: {
    title: 'User Login',
    loginBtn: 'Login',
    usernamePlaceholder:'Please enter a username',
    passwordPlaceholder:'Please enter your password',
    usernameRule: 'Username is required',
    passwordRule: 'Password cannot be less than 6 digits',
    desc: `
    Test authority account:<br />
     Provide three kinds of authority accounts:<br />
     1. Super administrator account: super-admin <br />
     2. Administrator account: admin <br />
     3. Test configurable account: test <br />
     The uniform password is: 123456 <br />
     <br />
     Import user account:<br />
     You can log in with the imported username <br />
     The password is unified as: 123456 <br />
     <b>Note: Import user-discriminatory Chinese and English libraries! ! ! ! </b>
    `
  },
  route: {
    profile: 'Profile',
    chart: 'chart',
    user: 'user',
    excelImport: 'ExcelImport',
    userManage: 'EmployeeManage',
    userInfo: 'UserInfo',
    roleList: 'RoleList',
    permissionList: 'PermissionList',
    article: 'article',
    articleRanking: 'ArticleRanking',
    articleCreate: 'ArticleCreate',
    articleDetail: 'ArticleDetail',
    articleEditor: 'ArticleEditor'
  },
  toast: {
    switchLangSuccess: 'Switch Language Success'
  },
  tagsView: {
    refresh: 'Refresh',
    closeRight: 'Close Rights',
    closeOther: 'Close Others'
  },
  theme: {
    themeColorChange: 'Theme Color Change',
    themeChange: 'Theme Change'
  },
  universal: {
    confirm: 'confirm',
    cancel: 'cancel'
  },
  navBar: {
    themeChange: 'Theme Modification',
    headerSearch: 'Page Search',
    screenfull: 'Full Screen Replacement',
    lang: 'Globalization',
    guide: 'Function Guide',
    home: 'Home',
    course: 'Course homepage',
    logout: 'Log out'
  },
  guide: {
    prompt:'prompt',
    close: 'close',
    next: 'next',
    prev: 'previous',
    guideTitle: 'guidance',
    guideDesc: 'Turn on the boot function',
    hamburgerTitle: 'Hamburger button',
    hamburgerDesc: 'Open and close the left menu',
    breadcrumbTitle: 'Bread crumbs',
    breadcrumbDesc: 'Indicates the current page position',
    searchTitle: 'search',
    searchDesc: 'Page link search',
    fullTitle: 'full screen',
    fullDesc: 'Page display switching',
    themeTitle: 'theme',
    themeDesc: 'Change project theme',
    langTitle: 'globalization',
    langDesc: 'Language switch',
    tagTitle: 'Label',
    tagDesc: 'Opened page tab',
    sidebarTitle: 'menu',
    sidebarDesc: 'Project function menu'
  },
  profile: {
    muted:
      '"Vue3 rewrite vue-element-admin, realize the back-end front-end integrated solution" project demonstration',
    introduce: 'Will be a winner',
    projectIntroduction: 'Project Introduction',
    projectFunction: 'Project Function',
    feature: 'Feature',
    chapter: 'Chapter',
    author: 'Author',
    name: 'Yang JiaYi',
    job: 'Vice minister of switch machine society',
    Introduction:
      'Good at Ai, Fw, Fl, Br, Ae, Pr, Id, Ps and other software installation and uninstall, Proficient in spelling of CSS, JavaScript, PHP, ASP, C, C++, C#, Java, Ruby, Perl, Lisp, Python, Objective-C, ActionScript, Pascal, SPSS, SAS, etc. Familiar with Windows, Linux, Mac, Android, IOS, WP8 and other systems on and off. I am good at the installation and uninstallation of word, Excel, PPT, wind and other software, proficient in the spelling of PE, PS, PB, DCF, PEG and other words, familiar with Windows, Linux, Mac, Android, IOS, WP8 and other systems.'
  },
  userInfo: {
    print: 'Print',
    title: 'Employee information',
    name: 'name',
    sex: 'gender',
    nation: 'nationality',
    mobile: 'phone number',
    province: 'Place of residence',
    date: 'Entry Time',
    remark: 'Remark',
    address: 'contact address',
    experience: 'Experience',
    major: 'Professional',
    glory: 'Glory',
    foot: 'Signature:___________Date:___________'
  },
  uploadExcel: {
    upload: 'Click upload',
    drop: 'Drag files here'
  },
  excel: {
    importExcel: 'excel import',
    exportExcel: 'excel export',
    exportZip: 'zip export',
    name: 'Name',
    mobile: 'contact details',
    avatar: 'Avatar',
    role: 'Role',
    openTime: 'Opening time',
    action: 'Operate',
    show: 'Check',
    showRole: 'Role',
    defaultRole: 'Staff',
    remove: 'delete',
    removeSuccess: 'Deleted successfully',
    title: 'Export to excel',
    placeholder: 'excel file name',
    defaultName: 'Staff Management Form',
    close: 'Cancel',
    confirm: 'Export',
    importSuccess: ' Employee data imported successfully',
    dialogTitle1: 'Are you sure you want to delete the user ',
    dialogTitle2: ' Is it?',
    roleDialogTitle: 'Configure roles'
  },
  role: {
    buttonTxt: 'New Role',
    index: 'Serial number',
    name: 'name',
    desc: 'describe',
    action: 'operate',
    assignPermissions: 'assign permissions',
    removeRole: 'Delete role',
    dialogTitle: 'New role',
    dialogRole: 'Role Name',
    dialogDesc: 'Role description',
    updateRoleSuccess: 'User role updated successfully'
  },
  permission: {
    name: 'Authority name',
    mark: 'Authority ID',
    desc: 'Permission description'
  },
  article: {
    ranking: 'Ranking',
    title: 'Title',
    author: 'Author',
    publicDate: 'release time',
    desc: 'brief introduction',
    action: 'operate',
    dynamicTitle: 'Dynamic display',
    show: 'check',
    remove: 'delete',
    edit: 'editor',
    dialogTitle1: 'Are you sure you want to delete the article ',
    dialogTitle2: ' NS?',
    removeSuccess: 'Article deleted successfully',
    titlePlaceholder: 'Please enter the title of the article',
    markdown: 'Markdown',
    richText: 'Rich Text',
    commit: 'commit',
    createSuccess: 'The article was created successfully',
    editorSuccess: 'Article modified successfully',
    sortSuccess: 'Article ranking modified successfully'
  },
  chart: {
    trendDataTitle: 'Cumulative income of this month (ten thousand yuan)',
    trendDataTodayAdded: 'Income Today',
    trendDataTodayExpend: 'New expenditure today',
    trendDataTodayBalance: 'Balance Today',
    income: 'Income',
    expend: 'Expenditure',
    balance: 'Balance',
    monthIncome: 'Monthly cumulative income',
    dayIncome: 'Daily return curve',
    unit: 'w',
    pieChartTitle: 'Regional marketing diagram',
    cloudChartTitle: 'imooc Logo document Cloud',
    bmapChartTitle:
      'Revenue performance diagram（Map does not support internationalization）',
    todayReceivable: 'Receivable today',
    todayBalance: 'Balance Today',
    sheetProvince: 'Province',
    sheetCity: 'City',
    sheetCoverage: 'Coverage rate',
    sheetReceivable: 'Receivables today',
    sheetActual: 'Actual today',
    sheetBalance: 'Balance today'
  }
}
