# Web Application Firewall
---

## WAF : 웹방화벽
`httpd -M` : httpd를 설치할 때 함께 기본으로 설치되는 modules<br>
`dnf install -y mod_security` <br>
`/etc/httpd/conf.d/mod_security.conf` : modsecurity 설정 파일<br>
	`SecRuleEngine ON/OFF` : ON(탐지), OFF(탐지X)<br>
`/etc/httpd/modsecurity.d` : modsecurity rules directory<br>
CRS : Core Rule-Set, 핵심 Rule-Set<br><br>

## Rule
`vi /etc/httpd/modsecurity.d/local_rules/modsecurity_localrules.conf`<br>
`SecDefaultAction "phase:2,deny,log,status:406"`<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`deny` : 차단<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`log` : log 생성<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`status:406` : 406 상태코드를 client에게 보여줌<br>
`SecRule REQUEST_URI "etc/passwd" "id:'500001'"` : 주소창 /etc/passwd 접속 방지<br>
`SecRule REQUEST_URI "../../" "id:'500002'"`<br>
`SecRule ARGS "<[Ss][Cc][Rr][Ii][Tt]>" "id:'500003'"` : 대소문자 구분 없이 \<script>작성 방지<br>
`dnf install -y mod_security_crs`<br>
`/usr/share/mod_modsecurity_crs/rules/` : CRS directory<br>
`tail /var/log/httpd/error_log` : 로그 확인 (RedHat, CentOS 등)<br>
`tail /var/log/apache2/error.log` : 로그 확인 (Ubuntu, Devian 등)
