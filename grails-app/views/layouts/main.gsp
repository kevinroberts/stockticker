<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title><g:layoutTitle default="Grails"/></title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="${resource(dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
		<link rel="apple-touch-icon" href="${resource(dir: 'images', file: 'apple-touch-icon.png')}">
		<link rel="apple-touch-icon" sizes="114x114" href="${resource(dir: 'images', file: 'apple-touch-icon-retina.png')}">
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
        <script type="text/javascript">
            // namespacing utilities
            (function(ns, window, undefined){
                var base = (function(window) {
                    var _use = function(){var a=arguments,o=null,i,j,d;for(i=0;i<a.length;i=i+1){d=a[i].split(".");o=window;for(j=0;j<d.length;j=j+1){o[d[j]]=o[d[j]]||{};o=o[d[j]];}}return o;};
                    var _exists = function(v){var a=window,b,c,d,e;b=d=e=0;if(v){c=v.split(".");d=c.length;while(a&&e<d){a=a[c[e++]];}b=(a?1:0);}return !!b;};
                    return {
                        use:_use,
                        exists:_exists
                    };
                })(window);
                if (!base.exists(ns)) {
                    var target = base.use(ns);
                    for (var item in base) {
                        target[item] = base[item];
                    }
                }
            })('my.common.namespace', window);
            (function(ns){
                ns.isDevelopmentEnvironment = ${grails.util.Environment.current == grails.util.Environment.DEVELOPMENT ? true : false };
            })(my.common.namespace.use('my.corp.ticker'));
        </script>
        <g:if test="${grails.util.Environment.current == grails.util.Environment.PRODUCTION}">
            <link href="${resource(dir: 'css', file: 'custom-bootstrap.generated.min.css')}" type="text/css" rel="stylesheet" media="screen, projection">
            <link href="${resource(dir: 'css', file: 'theme.generated.min.css')}" type="text/css" rel="stylesheet" media="screen, projection">
			<link href="${resource(dir: 'css', file: 'bootstrap-switch.min.css')}" type="text/css" rel="stylesheet" media="screen, projection">
            <script src="${resource(dir: 'js', file: 'app-optimized.js')}?v=<%=grailsApplication.metadata['app.version']%>"></script>
        </g:if>
        <g:else>
            <link href="${resource(dir: 'css', file: 'custom-bootstrap.generated.css')}" type="text/css" rel="stylesheet" media="screen, projection">
            <link href="${resource(dir: 'css', file: 'theme.generated.css')}" type="text/css" rel="stylesheet" media="screen, projection">
			<link href="${resource(dir: 'css', file: 'bootstrap-switch.min.css')}" type="text/css" rel="stylesheet" media="screen, projection">
            <script data-main="js/app" src="${resource(dir: 'js/lib', file: 'require.js')}"></script>
        </g:else>
		<g:layoutHead/>

	</head>
	<body>
		<g:layoutBody/>
	</body>
</html>
